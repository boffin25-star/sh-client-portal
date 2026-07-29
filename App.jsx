import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Self-contained constants — no App.jsx import, avoids circular deps
const SUPABASE_URL = "https://bhofebvgpsozpubefzvx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJob2ZlYnZncHNvenB1YmVmenZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjE2MzgsImV4cCI6MjA5NzM5NzYzOH0.1pLDZUpEFoOBQDbwEcX1sFTVXZ80e2NLM6cSKGjYmk4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PHONE = "(509) 903-5744";

const BRAND = {
  navy: "#1B3A6B",
  accent: "#BFD1EC",
  offWhite: "#F4F6FA",
  border: "#D1D9E8",
  muted: "#5A7099",
  green: "#2D7D46",
  red: "#B3423A",
  white: "#FFFFFF",
};
const DISPLAY = "'Bebas Neue', sans-serif";

const S = {
  label: { fontSize: 11.5, fontWeight: 700, letterSpacing: 0.6, color: BRAND.navy, marginBottom: 6, display: "block" },
  input: { width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${BRAND.border}`, fontSize: 14.5, fontFamily: "inherit", boxSizing: "border-box" },
  cardBold: { background: "#fff", borderRadius: 14, padding: 22, borderTop: `4px solid ${BRAND.navy}`, boxShadow: "0 2px 14px rgba(27,58,107,0.08)" },
  card: { background: "#fff", borderRadius: 14, padding: 20, border: `1px solid ${BRAND.border}` },
  btn: (kind = "primary") => ({
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
    padding: "11px 16px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer",
    border: kind === "primary" ? "none" : `1px solid ${BRAND.border}`,
    background: kind === "primary" ? BRAND.navy : kind === "ghost" ? "transparent" : "#fff",
    color: kind === "primary" ? "#fff" : kind === "ghost" ? BRAND.muted : BRAND.navy,
  }),
};

function genTempPassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

// ─── Invite / reset a client's portal login ────────────────────────────────
export function AdminInvitePanel() {
  const [email, setEmail] = useState("");
  const [tempPw, setTempPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  async function invite() {
    if (!email.trim()) {
      setToast({ type: "error", text: "Enter a client email first." });
      return;
    }
    setBusy(true);
    const pw = tempPw.trim() || genTempPassword();
    try {
      const { error: authErr } = await supabase.auth.signUp({
        email: email.trim(),
        password: pw,
      });
      if (authErr && !/already registered/i.test(authErr.message || "")) {
        throw authErr;
      }
      const { error: metaErr } = await supabase.from("client_portal_meta").upsert(
        {
          email: email.trim(),
          must_reset: true,
          invited_by: "staff",
          invited_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );
      if (metaErr) throw metaErr;
      setToast({ type: "ok", text: `Login created. Temp password: ${pw} — text this to the client yourself.` });
      setTempPw(pw);
    } catch (e) {
      setToast({ type: "error", text: e.message || "Something went wrong." });
    }
    setBusy(false);
  }

  return (
    <div style={S.cardBold}>
      <h3 style={{ fontFamily: DISPLAY, fontSize: 20, color: BRAND.navy, margin: "0 0 4px", letterSpacing: 0.5 }}>
        INVITE CLIENT
      </h3>
      <p style={{ fontSize: 13, color: BRAND.muted, margin: "0 0 16px" }}>
        Creates or resets a client's portal login. Nothing is auto-emailed — text or tell them the temp password yourself.
      </p>
      <label style={S.label}>Client email</label>
      <input style={{ ...S.input, marginBottom: 12 }} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@email.com" type="email" />
      <label style={S.label}>Temp password (optional — leave blank to auto-generate)</label>
      <input style={{ ...S.input, marginBottom: 14 }} value={tempPw} onChange={(e) => setTempPw(e.target.value)} placeholder="Auto-generate" />
      <button onClick={invite} disabled={busy} style={S.btn("primary")}>
        {busy ? "Working…" : "Create / Reset Login"}
      </button>
      {toast && (
        <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: toast.type === "error" ? "#FDEAEA" : "#E8F5ED", color: toast.type === "error" ? BRAND.red : BRAND.green }}>
          {toast.text}
        </div>
      )}
    </div>
  );
}

// ─── Generate a Work Authorization link for a client ───────────────────────
export function AdminAuthorizationPanel() {
  const [jobId, setJobId] = useState("");
  const [jobs, setJobs] = useState([]);
  const [wizardMode, setWizardMode] = useState("detailed");
  const [busy, setBusy] = useState(false);
  const [link, setLink] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("jobs")
        .select("id, customer_name, customer_email")
        .order("created_at", { ascending: false })
        .limit(100);
      setJobs(data || []);
    })();
  }, []);

  async function generate() {
    if (!jobId) {
      setToast({ type: "error", text: "Pick a job first." });
      return;
    }
    setBusy(true);
    const authCode = Math.random().toString(36).slice(2, 10).toUpperCase();
    const job = jobs.find((j) => String(j.id) === String(jobId));
    try {
      const { error } = await supabase.from("work_authorizations").upsert(
        {
          job_id: jobId,
          auth_code: authCode,
          wizard_mode: wizardMode,
          status: "pending",
          created_at: new Date().toISOString(),
        },
        { onConflict: "job_id" }
      );
      if (error) throw error;
      const url = `${window.location.origin}/#auth/${authCode}`;
      setLink(url);
      const body = `Hi ${job?.customer_name || ""}, please review and sign your work authorization here: ${url}`;
      setToast({
        type: "ok",
        text: "Link created.",
        mailto: `mailto:${job?.customer_email || ""}?subject=${encodeURIComponent("S&H Services — Work Authorization")}&body=${encodeURIComponent(body)}`,
        sms: `sms:?&body=${encodeURIComponent(body)}`,
      });
    } catch (e) {
      setToast({ type: "error", text: e.message || "Couldn't generate link." });
    }
    setBusy(false);
  }

  return (
    <div style={S.cardBold}>
      <h3 style={{ fontFamily: DISPLAY, fontSize: 20, color: BRAND.navy, margin: "0 0 4px", letterSpacing: 0.5 }}>
        WORK AUTHORIZATION LINK
      </h3>
      <p style={{ fontSize: 12.5, color: BRAND.red, margin: "0 0 16px", fontWeight: 600 }}>
        ⚠ Authorization language is drawn from the SOP document. A WA construction attorney should review it before use with real clients.
      </p>

      <label style={S.label}>Job</label>
      <select style={{ ...S.input, marginBottom: 12 }} value={jobId} onChange={(e) => setJobId(e.target.value)}>
        <option value="">Select a job…</option>
        {jobs.map((j) => (
          <option key={j.id} value={j.id}>
            {j.customer_name} — {j.customer_email}
          </option>
        ))}
      </select>

      <label style={S.label}>Flow</label>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["detailed", "simple"].map((m) => (
          <button
            key={m}
            onClick={() => setWizardMode(m)}
            style={{
              flex: 1, padding: "9px 0", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer",
              border: `1px solid ${wizardMode === m ? BRAND.navy : BRAND.border}`,
              background: wizardMode === m ? BRAND.navy : "#fff",
              color: wizardMode === m ? "#fff" : BRAND.muted,
            }}
          >
            {m === "detailed" ? "Detailed (12-step)" : "Simple (4-step)"}
          </button>
        ))}
      </div>

      <button onClick={generate} disabled={busy} style={S.btn("primary")}>
        {busy ? "Working…" : "Generate Link"}
      </button>

      {link && (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: BRAND.offWhite, fontSize: 13, wordBreak: "break-all" }}>
          {link}
        </div>
      )}
      {toast && (
        <div style={{ marginTop: 12 }}>
          <div style={{ padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: toast.type === "error" ? "#FDEAEA" : "#E8F5ED", color: toast.type === "error" ? BRAND.red : BRAND.green }}>
            {toast.text}
          </div>
          {toast.mailto && (
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <a href={toast.mailto} style={{ ...S.btn("secondary"), textDecoration: "none", flex: 1 }}>✉️ Email it</a>
              <a href={toast.sms} style={{ ...S.btn("secondary"), textDecoration: "none", flex: 1 }}>💬 Text it</a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { supabase as adminSupabase, BRAND as ADMIN_BRAND };
