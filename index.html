import { useState, useEffect, useMemo } from "react";
import { createClient } from "@supabase/supabase-js";
import { AdminInvitePanel, AdminAuthorizationPanel } from "./adminTools.jsx";
import { AdminTabVisibilityPanel } from "./adminTabVisibility.jsx";
import { AuthorizationRouteScreen } from "./authWizard.jsx";

// ─────────────────────────────────────────────────────────────────────────────
// Supabase + brand constants
// ─────────────────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://bhofebvgpsozpubefzvx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJob2ZlYnZncHNvenB1YmVmenZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjE2MzgsImV4cCI6MjA5NzM5NzYzOH0.1pLDZUpEFoOBQDbwEcX1sFTVXZ80e2NLM6cSKGjYmk4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PHONE = "(509) 903-5744";
const PHONE_TEL = "+15099035744";

const BRAND = {
  navy: "#1B3A6B",
  navyDark: "#122850",
  accent: "#BFD1EC",
  offWhite: "#F4F6FA",
  white: "#FFFFFF",
  border: "#D1D9E8",
  muted: "#5A7099",
  green: "#2D7D46",
  greenLight: "#E8F5ED",
  amber: "#B45309",
  amberLight: "#FEF3E2",
  red: "#B83232",
  redLight: "#FDEAEA",
};
const DISPLAY = "'Bebas Neue', sans-serif";
const SCRIPT = "'Caveat', cursive";

const JOB_TYPE_LABELS = {
  water: "Water Damage", fire: "Fire Damage", smoke: "Smoke / Soot Damage",
  mold: "Mold Remediation", storm: "Storm Damage", wind: "Wind Damage",
  roof: "Roof Damage", sewage: "Sewage / Contaminated Water", other: "Restoration Services",
};

// 19-stage forward workflow. Declined / Expired / Voided are terminal exceptions, not part of the count.
const WORKFLOW_STAGES = [
  "Lead", "Inspection Scheduled", "Inspection Complete", "Estimate Sent",
  "Awaiting Authorization", "Authorization Signed", "Mitigation In Progress",
  "Drying In Progress", "Drying Complete", "Demo In Progress", "Demo Complete",
  "Reconstruction Scheduled", "Reconstruction In Progress", "Final Walkthrough Scheduled",
  "Final Walkthrough Complete", "Invoice Sent", "Payment Pending", "Complete", "Closed",
];
const TERMINAL_STAGES = new Set(["Declined", "Expired", "Voided"]);

const PORTAL_TABS = [
  { key: "jobs", label: "My Jobs", icon: "🏠" },
  { key: "messages", label: "Messages", icon: "💬" },
  { key: "billing", label: "My Bill", icon: "💳" },
  { key: "settings", label: "Settings", icon: "⚙️" },
];

const ADMIN_PASSPHRASE = "SHTeam2026";

const S = {
  label: { fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5, color: BRAND.navy, marginBottom: 6, display: "block" },
  input: { width: "100%", padding: "11px 12px", borderRadius: 10, border: `1px solid ${BRAND.border}`, fontSize: 15, fontFamily: "inherit", boxSizing: "border-box" },
  cardBold: { background: "#fff", borderRadius: 14, padding: 20, borderTop: `4px solid ${BRAND.navy}`, boxShadow: "0 2px 14px rgba(27,58,107,0.08)", marginBottom: 14 },
  card: { background: "#fff", borderRadius: 14, padding: 18, border: `1px solid ${BRAND.border}`, marginBottom: 12 },
  btnPrimary: { padding: "12px 18px", borderRadius: 10, border: "none", background: BRAND.navy, color: "#fff", fontWeight: 700, fontSize: 14.5, cursor: "pointer" },
  btnGhost: { padding: "12px 18px", borderRadius: 10, border: `1px solid ${BRAND.border}`, background: "#fff", color: BRAND.muted, fontWeight: 700, fontSize: 14.5, cursor: "pointer" },
  badge: (bg, fg) => ({ display: "inline-block", padding: "3px 10px", borderRadius: 999, fontSize: 11.5, fontWeight: 700, background: bg, color: fg }),
};

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

function Logo({ size = 40 }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div style={{ width: size, height: size, borderRadius: 10, background: BRAND.navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: DISPLAY, fontSize: size * 0.42 }}>
        S&H
      </div>
    );
  }
  return (
    <img
      src="/logo.png"
      alt="S&H Services Spokane"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      style={{ width: size, height: size, borderRadius: 10, objectFit: "cover", opacity: loaded ? 1 : 0, transition: "opacity 0.35s" }}
    />
  );
}

function StageProgress({ stage }) {
  if (TERMINAL_STAGES.has(stage)) {
    const colors = { Declined: BRAND.red, Expired: BRAND.muted, Voided: BRAND.muted };
    return <span style={S.badge(BRAND.redLight, colors[stage] || BRAND.red)}>{stage}</span>;
  }
  const idx = Math.max(0, WORKFLOW_STAGES.indexOf(stage));
  const pct = Math.round(((idx + 1) / WORKFLOW_STAGES.length) * 100);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: BRAND.muted, marginBottom: 5 }}>
        <span style={{ fontWeight: 700, color: BRAND.navy }}>{stage || "Lead"}</span>
        <span>{pct}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: BRAND.border, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: BRAND.navy, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Login screen — email + password, "must reset" flow, OTP fallback
// ─────────────────────────────────────────────────────────────────────────────
function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("password"); // password | otp | reset
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  async function signIn() {
    setBusy(true);
    setError(null);
    const { data, error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (err) {
      setError(err.message);
      setBusy(false);
      return;
    }
    const { data: meta } = await supabase.from("client_portal_meta").select("must_reset").eq("email", email.trim()).maybeSingle();
    if (meta?.must_reset) {
      setMode("reset");
    }
    setBusy(false);
  }

  async function sendOtp() {
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithOtp({ email: email.trim() });
    if (err) setError(err.message);
    else setError({ ok: true, text: "Check your email for a one-time sign-in link." });
    setBusy(false);
  }

  async function completeReset() {
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setBusy(true);
    const { error: err } = await supabase.auth.updateUser({ password: newPassword });
    if (err) {
      setError(err.message);
      setBusy(false);
      return;
    }
    await supabase.from("client_portal_meta").update({ must_reset: false, password_set_at: new Date().toISOString() }).eq("email", email.trim());
    setBusy(false);
    window.location.reload();
  }

  return (
    <div style={{ minHeight: "100vh", background: BRAND.offWhite, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Logo size={64} />
      <h1 style={{ fontFamily: DISPLAY, fontSize: 28, color: BRAND.navy, margin: "14px 0 2px", letterSpacing: 0.5 }}>
        S&H CLIENT PORTAL
      </h1>
      <p style={{ fontFamily: SCRIPT, fontSize: 18, color: BRAND.muted, margin: "0 0 24px" }}>Restoration Done Right!</p>

      <div style={{ ...S.cardBold, width: "100%", maxWidth: 380 }}>
        {mode === "reset" ? (
          <>
            <label style={S.label}>Set a new password</label>
            <input style={{ ...S.input, marginBottom: 12 }} type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password" />
            <button style={{ ...S.btnPrimary, width: "100%" }} onClick={completeReset} disabled={busy}>
              {busy ? "Saving…" : "Set Password & Continue"}
            </button>
          </>
        ) : (
          <>
            <label style={S.label}>Email</label>
            <input style={{ ...S.input, marginBottom: 12 }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
            {mode === "password" && (
              <>
                <label style={S.label}>Password</label>
                <input style={{ ...S.input, marginBottom: 16 }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button style={{ ...S.btnPrimary, width: "100%", marginBottom: 10 }} onClick={signIn} disabled={busy}>
                  {busy ? "Signing in…" : "Sign In"}
                </button>
                <button style={{ background: "none", border: "none", color: BRAND.muted, fontSize: 13, textDecoration: "underline", cursor: "pointer", width: "100%" }} onClick={() => setMode("otp")}>
                  Send me a one-time code instead
                </button>
              </>
            )}
            {mode === "otp" && (
              <>
                <button style={{ ...S.btnPrimary, width: "100%", marginBottom: 10 }} onClick={sendOtp} disabled={busy}>
                  {busy ? "Sending…" : "Email Me a Sign-In Link"}
                </button>
                <button style={{ background: "none", border: "none", color: BRAND.muted, fontSize: 13, textDecoration: "underline", cursor: "pointer", width: "100%" }} onClick={() => setMode("password")}>
                  Back to password sign-in
                </button>
              </>
            )}
          </>
        )}
        {error && (
          <div style={{ marginTop: 14, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: error.ok ? BRAND.greenLight : BRAND.redLight, color: error.ok ? BRAND.green : BRAND.red }}>
            {error.ok ? error.text : error}
          </div>
        )}
      </div>
      <p style={{ fontSize: 12.5, color: BRAND.muted, marginTop: 20 }}>
        Need help signing in? Call {PHONE}.
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// My Jobs
// ─────────────────────────────────────────────────────────────────────────────
function JobsView({ jobs, onOpen }) {
  if (!jobs.length) {
    return <div style={{ padding: 30, textAlign: "center", color: BRAND.muted }}>No projects on file yet.</div>;
  }
  return (
    <div>
      {jobs.map((j) => (
        <div key={j.id} style={S.card} onClick={() => onOpen(j.id)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15.5, color: BRAND.navy }}>{j.address || j.customer_name}</div>
              <div style={{ fontSize: 12.5, color: BRAND.muted }}>{JOB_TYPE_LABELS[j.job_type] || j.job_type || "Restoration Services"}</div>
            </div>
          </div>
          <StageProgress stage={j.workflow_stage} />
        </div>
      ))}
    </div>
  );
}

function JobDetail({ job, onBack, onGoMessages }) {
  const [pendingAuth, setPendingAuth] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("work_authorizations").select("auth_code, status").eq("job_id", job.id).neq("status", "signed").maybeSingle();
      setPendingAuth(data || null);
    })();
  }, [job.id]);

  return (
    <div>
      <button onClick={onBack} style={{ ...S.btnGhost, marginBottom: 14 }}>← Back to My Jobs</button>

      <div style={S.cardBold}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 22, color: BRAND.navy, margin: "0 0 4px" }}>{job.address || job.customer_name}</h2>
        <div style={{ fontSize: 13, color: BRAND.muted, marginBottom: 14 }}>{JOB_TYPE_LABELS[job.job_type] || job.job_type}</div>
        <StageProgress stage={job.workflow_stage} />
      </div>

      {pendingAuth && (
        <div style={{ ...S.card, background: BRAND.amberLight, borderColor: BRAND.amber }}>
          <div style={{ fontWeight: 700, color: BRAND.amber, marginBottom: 6 }}>Signature Needed</div>
          <p style={{ fontSize: 13.5, marginBottom: 10 }}>A work authorization is waiting for your signature.</p>
          <a href={`#auth/${pendingAuth.auth_code}`} style={{ ...S.btnPrimary, textDecoration: "none", display: "inline-block" }}>Review & Sign</a>
        </div>
      )}

      {job.claim_number && (
        <div style={S.card}>
          <div style={{ fontWeight: 700, color: BRAND.navy, marginBottom: 8 }}>Insurance</div>
          <div style={{ fontSize: 13.5, lineHeight: 1.8 }}>
            <div>Claim #: {job.claim_number}</div>
            {job.adjuster_name && <div>Adjuster: {job.adjuster_name}</div>}
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {job.adjuster_phone && <a href={`tel:${job.adjuster_phone}`} style={{ color: BRAND.navy, fontWeight: 700, textDecoration: "none" }}>📞 Call Adjuster</a>}
              {job.adjuster_email && <a href={`mailto:${job.adjuster_email}`} style={{ color: BRAND.navy, fontWeight: 700, textDecoration: "none" }}>✉️ Email Adjuster</a>}
            </div>
          </div>
        </div>
      )}

      <button style={{ ...S.btnPrimary, width: "100%" }} onClick={() => onGoMessages(job.id)}>
        View Messages & Change Orders
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Messages / Change Orders
// ─────────────────────────────────────────────────────────────────────────────
function MessagesView({ jobs, clientName }) {
  const [activeJobId, setActiveJobId] = useState(jobs[0]?.id || null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const activeJob = jobs.find((j) => j.id === activeJobId);
  const changeOrders = useMemo(() => {
    if (!activeJob?.change_orders) return [];
    try {
      const parsed = JSON.parse(activeJob.change_orders);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [activeJob]);

  useEffect(() => {
    if (!activeJobId) return;
    (async () => {
      const { data } = await supabase.from("job_messages").select("*").eq("job_id", activeJobId).order("created_at", { ascending: true });
      setMessages(data || []);
    })();
  }, [activeJobId]);

  async function send() {
    if (!draft.trim()) return;
    setBusy(true);
    const { error } = await supabase.from("job_messages").insert({
      job_id: activeJobId,
      sender_name: clientName || "Client",
      sender_role: "client",
      message: draft.trim(),
    });
    if (!error) {
      setDraft("");
      const { data } = await supabase.from("job_messages").select("*").eq("job_id", activeJobId).order("created_at", { ascending: true });
      setMessages(data || []);
    }
    setBusy(false);
  }

  async function respondToChangeOrder(co, decision) {
    setBusy(true);
    let reason = "";
    if (decision === "rejected") reason = window.prompt("Optional: let us know why") || "";
    const { error } = await supabase.rpc("client_respond_to_change_order", {
      p_job_id: activeJobId,
      p_co_id: co.id,
      p_decision: decision,
      p_client_name: clientName || "Client",
      p_reject_reason: reason,
    });
    if (!error) {
      window.location.reload();
    }
    setBusy(false);
  }

  if (!jobs.length) return <div style={{ padding: 30, textAlign: "center", color: BRAND.muted }}>No projects yet.</div>;

  return (
    <div>
      {jobs.length > 1 && (
        <select style={{ ...S.input, marginBottom: 14 }} value={activeJobId || ""} onChange={(e) => setActiveJobId(e.target.value)}>
          {jobs.map((j) => (
            <option key={j.id} value={j.id}>{j.address || j.customer_name}</option>
          ))}
        </select>
      )}

      {changeOrders.filter((o) => (o.clientStatus || "pending") === "pending").map((o) => (
        <div key={o.id} style={{ ...S.card, background: BRAND.amberLight }}>
          <div style={{ fontWeight: 700, color: BRAND.navy, marginBottom: 4 }}>Change Order — {o.title || `#${o.id}`}</div>
          <div style={{ fontSize: 13, marginBottom: 4 }}>{o.description}</div>
          {o.amount && <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>${o.amount}</div>}
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ ...S.btnPrimary, flex: 1, background: BRAND.green }} disabled={busy} onClick={() => respondToChangeOrder(o, "approved")}>✓ Approve</button>
            <button style={{ ...S.btnGhost, flex: 1 }} disabled={busy} onClick={() => respondToChangeOrder(o, "rejected")}>Decline</button>
          </div>
        </div>
      ))}

      <div style={{ ...S.card, maxHeight: 380, overflowY: "auto" }}>
        {messages.length === 0 && <div style={{ color: BRAND.muted, fontSize: 13.5 }}>No messages yet.</div>}
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 12, textAlign: m.sender_role === "client" ? "right" : "left" }}>
            <div style={{
              display: "inline-block", maxWidth: "80%", padding: "9px 12px", borderRadius: 12, fontSize: 13.5,
              background: m.sender_role === "client" ? BRAND.navy : BRAND.offWhite,
              color: m.sender_role === "client" ? "#fff" : BRAND.text,
            }}>
              {m.message}
            </div>
            <div style={{ fontSize: 10.5, color: BRAND.muted, marginTop: 2 }}>{m.sender_name}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <input style={S.input} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Type a message…" onKeyDown={(e) => e.key === "Enter" && send()} />
        <button style={S.btnPrimary} onClick={send} disabled={busy}>Send</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Billing
// ─────────────────────────────────────────────────────────────────────────────
function PaymentSummary({ job }) {
  return (
    <div style={S.card}>
      <div style={{ fontWeight: 700, color: BRAND.navy, marginBottom: 10 }}>{job.address || job.customer_name}</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13.5 }}>Deposit {job.deposit_amount ? `— $${job.deposit_amount}` : ""}</span>
        <span style={S.badge(job.deposit_paid ? BRAND.greenLight : BRAND.amberLight, job.deposit_paid ? BRAND.green : BRAND.amber)}>
          {job.deposit_paid ? "Paid" : "Pending"}
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13.5 }}>Final {job.final_amount ? `— $${job.final_amount}` : ""}</span>
        <span style={S.badge(job.final_paid ? BRAND.greenLight : BRAND.amberLight, job.final_paid ? BRAND.green : BRAND.amber)}>
          {job.final_paid ? "Paid" : "Pending"}
        </span>
      </div>
    </div>
  );
}

function BillingView({ jobs }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    (async () => {
      const jobIds = jobs.map((j) => j.id);
      if (!jobIds.length) return;
      const { data } = await supabase.from("documents").select("*").eq("doc_type", "invoice").in("linked_job_id", jobIds);
      setInvoices(data || []);
    })();
  }, [jobs]);

  if (!jobs.length) return <div style={{ padding: 30, textAlign: "center", color: BRAND.muted }}>No billing information yet.</div>;

  return (
    <div>
      {jobs.map((j) => <PaymentSummary key={j.id} job={j} />)}

      {invoices.length > 0 && (
        <div style={S.card}>
          <div style={{ fontWeight: 700, color: BRAND.navy, marginBottom: 10 }}>Invoices</div>
          {invoices.map((inv) => (
            <a key={inv.id} href={inv.url} target="_blank" rel="noreferrer" style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${BRAND.border}`, textDecoration: "none", color: BRAND.text, fontSize: 13.5 }}>
              <span>{inv.name || inv.description || "Invoice"}</span>
              <span style={{ fontWeight: 700, color: BRAND.navy }}>{inv.amount ? `$${inv.amount}` : ""}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Settings / Contact
// ─────────────────────────────────────────────────────────────────────────────
function SettingsView({ email }) {
  const [phone, setPhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [homePhone, setHomePhone] = useState("");
  const [company, setCompany] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  async function save() {
    setBusy(true);
    const { error } = await supabase.rpc("client_update_contact_info", {
      p_phone: phone,
      p_cell_phone: cellPhone,
      p_home_phone: homePhone,
      p_company: company,
    });
    setToast(error ? { type: "error", text: error.message } : { type: "ok", text: "Contact info updated." });
    setBusy(false);
  }

  return (
    <div>
      <div style={S.cardBold}>
        <h3 style={{ fontFamily: DISPLAY, fontSize: 19, color: BRAND.navy, margin: "0 0 14px" }}>EDIT CONTACT INFO</h3>
        <label style={S.label}>Phone</label>
        <input style={{ ...S.input, marginBottom: 10 }} value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label style={S.label}>Cell Phone</label>
        <input style={{ ...S.input, marginBottom: 10 }} value={cellPhone} onChange={(e) => setCellPhone(e.target.value)} />
        <label style={S.label}>Home Phone</label>
        <input style={{ ...S.input, marginBottom: 10 }} value={homePhone} onChange={(e) => setHomePhone(e.target.value)} />
        <label style={S.label}>Company</label>
        <input style={{ ...S.input, marginBottom: 14 }} value={company} onChange={(e) => setCompany(e.target.value)} />
        <button style={{ ...S.btnPrimary, width: "100%" }} onClick={save} disabled={busy}>{busy ? "Saving…" : "Save Changes"}</button>
        {toast && (
          <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, background: toast.type === "error" ? BRAND.redLight : BRAND.greenLight, color: toast.type === "error" ? BRAND.red : BRAND.green }}>
            {toast.text}
          </div>
        )}
      </div>

      <div style={S.card}>
        <div style={{ fontWeight: 700, color: BRAND.navy, marginBottom: 8 }}>Contact S&H Services</div>
        <a href={`tel:${PHONE_TEL}`} style={{ ...S.btnPrimary, textDecoration: "none", display: "block", textAlign: "center" }}>📞 Call {PHONE}</a>
        <p style={{ fontFamily: SCRIPT, fontSize: 16, color: BRAND.muted, textAlign: "center", marginTop: 10 }}>Restoration Done Right!</p>
      </div>

      <button
        style={{ ...S.btnGhost, width: "100%" }}
        onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }}
      >
        Sign Out
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Admin shell (staff only) — /#admin
// ─────────────────────────────────────────────────────────────────────────────
function AdminShell() {
  const [unlocked, setUnlocked] = useState(false);
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("invite");

  if (!unlocked) {
    return (
      <div style={{ minHeight: "100vh", background: BRAND.offWhite, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ ...S.cardBold, width: "100%", maxWidth: 360 }}>
          <h3 style={{ fontFamily: DISPLAY, color: BRAND.navy, marginBottom: 12 }}>STAFF ACCESS</h3>
          <input style={{ ...S.input, marginBottom: 12 }} type="password" placeholder="Passphrase" value={pass} onChange={(e) => setPass(e.target.value)} />
          <button style={{ ...S.btnPrimary, width: "100%" }} onClick={() => setUnlocked(pass === ADMIN_PASSPHRASE)}>Enter</button>
        </div>
      </div>
    );
  }

  const TABS = [
    { key: "invite", label: "Invite Client" },
    { key: "auth", label: "Work Authorization" },
    { key: "visibility", label: "Portal Visibility" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: BRAND.offWhite, padding: 20 }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontFamily: DISPLAY, color: BRAND.navy, fontSize: 24, marginBottom: 16 }}>STAFF ADMIN TOOLS</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "9px 14px", borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
                border: `1px solid ${tab === t.key ? BRAND.navy : BRAND.border}`,
                background: tab === t.key ? BRAND.navy : "#fff",
                color: tab === t.key ? "#fff" : BRAND.muted,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "invite" && <AdminInvitePanel />}
        {tab === "auth" && <AdminAuthorizationPanel />}
        {tab === "visibility" && <AdminTabVisibilityPanel />}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main client app shell
// ─────────────────────────────────────────────────────────────────────────────
function ClientApp({ session }) {
  const [jobs, setJobs] = useState([]);
  const [visibleTabs, setVisibleTabs] = useState(null);
  const [view, setView] = useState(null);
  const [openJobId, setOpenJobId] = useState(null);
  const [loading, setLoading] = useState(true);
  const email = session.user.email;

  useEffect(() => {
    (async () => {
      const [{ data: jobRows }, { data: metaRow }] = await Promise.all([
        supabase.from("jobs").select("*").eq("customer_email", email).order("created_at", { ascending: false }),
        supabase.from("client_portal_meta").select("visible_tabs").eq("email", email).maybeSingle(),
      ]);
      setJobs(jobRows || []);
      const vt = metaRow?.visible_tabs && metaRow.visible_tabs.length ? metaRow.visible_tabs : null;
      setVisibleTabs(vt);
      const allowed = PORTAL_TABS.filter((t) => !vt || vt.includes(t.key));
      setView(allowed[0]?.key || "jobs");
      setLoading(false);
    })();
  }, [email]);

  const allowedTabs = PORTAL_TABS.filter((t) => !visibleTabs || visibleTabs.includes(t.key));
  const clientName = jobs[0]?.customer_name || "";
  const openJob = jobs.find((j) => j.id === openJobId);

  if (loading) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: BRAND.muted }}>Loading your projects…</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: BRAND.offWhite, display: "flex", flexDirection: "column" }}>
      <div style={{ background: BRAND.navy, color: "#fff", padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
        <Logo size={36} />
        <div>
          <div style={{ fontFamily: DISPLAY, fontSize: 18, letterSpacing: 0.5 }}>S&H CLIENT PORTAL</div>
          <div style={{ fontSize: 11.5, opacity: 0.8 }}>{email}</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: 16, maxWidth: 560, margin: "0 auto", width: "100%", boxSizing: "border-box", paddingBottom: 90 }}>
        {view === "jobs" && !openJob && <JobsView jobs={jobs} onOpen={setOpenJobId} />}
        {view === "jobs" && openJob && (
          <JobDetail job={openJob} onBack={() => setOpenJobId(null)} onGoMessages={() => { setOpenJobId(null); setView("messages"); }} />
        )}
        {view === "messages" && <MessagesView jobs={jobs} clientName={clientName} />}
        {view === "billing" && <BillingView jobs={jobs} />}
        {view === "settings" && <SettingsView email={email} />}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: `1px solid ${BRAND.border}`, display: "flex" }}>
        {allowedTabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setView(t.key); setOpenJobId(null); }}
            style={{
              flex: 1, padding: "10px 0", border: "none", background: "none", cursor: "pointer",
              color: view === t.key ? BRAND.navy : BRAND.muted, fontWeight: view === t.key ? 700 : 500, fontSize: 11.5,
            }}
          >
            <div style={{ fontSize: 18 }}>{t.icon}</div>
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const hash = useHashRoute();
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, sess) => setSession(sess));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (hash === "#admin") return <AdminShell />;
  if (hash.startsWith("#auth/")) return <AuthorizationRouteScreen authCode={hash.replace("#auth/", "")} />;

  if (session === undefined) return <div style={{ minHeight: "100vh" }} />;
  if (!session) return <LoginScreen />;
  return <ClientApp session={session} />;
}
