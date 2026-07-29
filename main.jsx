import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bhofebvgpsozpubefzvx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJob2ZlYnZncHNvenB1YmVmenZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjE2MzgsImV4cCI6MjA5NzM5NzYzOH0.1pLDZUpEFoOBQDbwEcX1sFTVXZ80e2NLM6cSKGjYmk4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BRAND = {
  navy: "#1B3A6B", navyDk: "#122850", accent: "#BFD1EC", white: "#FFFFFF",
  offWhite: "#F4F6FA", border: "#D9E1EE", text: "#1C2B4A", muted: "#5A7099",
  green: "#16A34A", greenBg: "#F0FDF4", red: "#B3423A",
};
const DISPLAY = "'Bebas Neue', sans-serif";
const SCRIPT = "'Caveat', cursive";
const PHONE = "(509) 903-5744";

const S = {
  page: { minHeight: "100vh", background: BRAND.offWhite, display: "flex", flexDirection: "column" },
  header: { background: BRAND.navy, color: "#fff", padding: "18px 20px", textAlign: "center" },
  body: { flex: 1, padding: 18, maxWidth: 560, margin: "0 auto", width: "100%", boxSizing: "border-box" },
  card: { background: "#fff", borderRadius: 14, padding: 20, border: `1px solid ${BRAND.border}`, marginBottom: 14 },
  label: { fontSize: 11.5, fontWeight: 700, letterSpacing: 0.5, color: BRAND.navy, marginBottom: 6, display: "block" },
  input: { width: "100%", padding: "11px 12px", borderRadius: 10, border: `1px solid ${BRAND.border}`, fontSize: 15, fontFamily: "inherit", boxSizing: "border-box" },
  btnPrimary: { width: "100%", padding: "13px 0", borderRadius: 10, border: "none", background: BRAND.navy, color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" },
  btnGhost: { padding: "13px 16px", borderRadius: 10, border: `1px solid ${BRAND.border}`, background: "#fff", color: BRAND.muted, fontWeight: 700, fontSize: 15, cursor: "pointer" },
  checkboxRow: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: BRAND.text, marginTop: 10 },
};

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "0 18px", marginBottom: 4 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? BRAND.accent : "rgba(255,255,255,0.25)" }} />
      ))}
    </div>
  );
}

// ─── Step content definitions — grounded in SOP §9.1–9.21 ──────────────────
const DETAILED_STEPS = [
  { key: "info", title: "Client & Property Information", body: (job, auth) => (
      <>
        <p>Please confirm the details below are correct for this project.</p>
        <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.7 }}>
          <li>Client: {job?.customer_name}</li>
          <li>Property: {job?.address || "On file"}</li>
          <li>Project #: {job?.id}</li>
          <li>Loss type: {auth?.loss_type || job?.job_type}</li>
          {job?.claim_number && <li>Claim #: {job.claim_number}</li>}
          {auth?.pm_name && <li>Project Manager: {auth.pm_name}</li>}
        </ul>
        {auth?.scope_summary && <p style={{ marginTop: 8 }}>{auth.scope_summary}</p>}
      </>
    ), requireCheck: "I confirm the client, property, and contact information above is correct." },
  { key: "authority", title: "Authority to Approve Work", body: () => (
      <p>By continuing, you confirm you have authority to request and authorize the services described in this agreement (as the owner, co-owner, property manager, tenant with authority, or authorized representative).</p>
    ), requireCheck: "I confirm that I have authority to request and authorize these services." },
  { key: "scope", title: "Scope of Emergency Services", body: () => (
      <p>This authorization covers inspection, emergency mitigation, stabilization, cleaning, drying, demolition, documentation, and related services only — it does not cover reconstruction, remodeling, upgrades, or unrelated repairs. Concealed conditions discovered during work may require additional authorized work.</p>
    ), requireCheck: "I understand the initial scope may change as concealed damage is discovered." },
  { key: "begin", title: "Authorization to Begin Work", body: () => (
      <p>You authorize S&amp;H Services Spokane, its employees, subcontractors, consultants, and equipment providers to enter the property and perform the selected emergency services reasonably necessary to inspect, protect, stabilize, clean, dry, remediate, and remove damaged materials, including reasonable access to affected and adjacent areas.</p>
    ), requireInitials: true },
  { key: "emergency", title: "Emergency Action Authorization", body: () => (
      <p>Delaying extraction, drying, containment, board-up, stabilization, or removal may increase damage or safety risk. You authorize S&amp;H to perform reasonably necessary emergency services to prevent additional loss, without a preset dollar limit, excluding unrelated reconstruction or elective improvements.</p>
    ), requireInitials: true },
  { key: "demo", title: "Demolition & Material Removal", body: () => (
      <p>You authorize removal of materials that are wet, contaminated, structurally compromised, fire damaged, or otherwise unsalvageable, or necessary to access affected areas.</p>
    ), requireInitials: true },
  { key: "equipment", title: "Equipment Authorization", body: () => (
      <p>You authorize placement of drying, filtration, deodorization, monitoring, or temporary-power equipment as needed, and agree not to move, unplug, alter, or obstruct it except in cases of immediate danger. Equipment charges may accrue by the day or stated billing unit.</p>
    ), requireCheck: "I acknowledge equipment charges may accrue by the day or stated billing unit." },
  { key: "mold", title: "Mold & Microbial Growth Acknowledgment", body: () => (
      <p>Water intrusion may cause or reveal mold, bacteria, sewage contamination, or other microbial conditions, including in concealed areas. Third-party testing, laboratory analysis, medical advice, and clearance testing are excluded unless specifically included in writing.</p>
    ), requireInitials: true },
  { key: "hazmat", title: "Hazardous Material Acknowledgment", body: () => (
      <p>Affected materials may contain asbestos, lead, silica, or other regulated materials. Work may pause for testing or specialty abatement, which can add cost and time to the project.</p>
    ), requireCheck: "I acknowledge this may add cost and schedule impact." },
  { key: "insurance", title: "Insurance & Communication Authorization", body: () => (
      <p>S&amp;H Services Spokane is a contractor, not your insurer, public adjuster, or coverage representative. Coverage, deductibles, depreciation, and claim decisions are controlled by your policy and insurer. You authorize S&amp;H to communicate with your insurer, adjuster, agent, and mortgage company as needed for this project.</p>
    ), requireCheck: "I understand insurance involvement does not guarantee payment of all charges." },
  { key: "pricing", title: "Pricing & Payment Responsibility", body: (job, auth) => (
      <>
        <p>You are responsible for authorized labor, equipment, materials, subcontractors, disposal, taxes, permits, and related charges, including any deductible or uncovered amounts unless otherwise agreed in writing.</p>
        <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.7 }}>
          {auth?.pricing_method && <li>Pricing method: {auth.pricing_method}</li>}
          {auth?.initial_estimate && <li>Initial estimate: ${auth.initial_estimate}</li>}
          {auth?.deposit_amount && <li>Deposit: ${auth.deposit_amount}</li>}
          {auth?.not_to_exceed && <li>Not-to-exceed: ${auth.not_to_exceed}</li>}
        </ul>
        <p style={{ marginTop: 8 }}>Additional work beyond this scope requires a signed change order, except emergency work needed to prevent immediate additional loss, which may be documented after the fact.</p>
      </>
    ), requireCheck: "I understand and accept the pricing and payment terms above." },
  { key: "sign", title: "Electronic Signature", body: () => (
      <p>By signing below, you consent to receive, review, and retain this authorization electronically, and confirm your electronic signature carries the same effect as a handwritten signature. This authorizes S&amp;H Services Spokane to begin the selected work.</p>
    ), isSignature: true },
];

const SIMPLE_STEPS = [
  { key: "info", title: "Project & Authority", body: (job) => (
      <>
        <p>Confirm your project details and authority to approve work.</p>
        <ul style={{ marginTop: 8, paddingLeft: 18, lineHeight: 1.7 }}>
          <li>Client: {job?.customer_name}</li>
          <li>Project #: {job?.id}</li>
          <li>Loss type: {job?.job_type}</li>
        </ul>
      </>
    ), requireCheck: "I confirm my information is correct and I have authority to authorize this work." },
  { key: "scope", title: "Emergency Scope & Access", body: () => (
      <p>You authorize S&amp;H Services Spokane to enter the property and perform emergency inspection, mitigation, stabilization, drying, cleaning, and necessary demolition/equipment placement. Concealed damage may require additional authorized work and a signed change order.</p>
    ), requireInitials: true },
  { key: "terms", title: "Insurance, Mold & Payment Terms", body: () => (
      <p>S&amp;H is a contractor, not your insurer — coverage decisions are controlled by your policy. Water intrusion may reveal mold or other conditions not covered by this authorization. You are responsible for authorized charges not covered by insurance, including deductibles, unless otherwise agreed in writing.</p>
    ), requireCheck: "I acknowledge the insurance, mold, and payment terms above." },
  { key: "sign", title: "Electronic Signature", body: () => (
      <p>By signing below, you authorize S&amp;H Services Spokane to begin the selected work and consent to sign this authorization electronically.</p>
    ), isSignature: true },
];

export function AuthorizationRouteScreen({ authCode, onExit }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null);
  const [job, setJob] = useState(null);
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [initials, setInitials] = useState("");
  const [signatureName, setSignatureName] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: authRow, error: authErr } = await supabase
        .from("work_authorizations")
        .select("*")
        .eq("auth_code", authCode)
        .maybeSingle();
      if (authErr || !authRow) {
        setError("This authorization link isn't valid or has expired.");
        setLoading(false);
        return;
      }
      setAuth(authRow);
      const { data: jobRow } = await supabase.from("jobs").select("*").eq("id", authRow.job_id).maybeSingle();
      setJob(jobRow);
      setLoading(false);
    })();
  }, [authCode]);

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: BRAND.muted }}>Loading your authorization…</div>;
  if (error) return <div style={{ padding: 40, textAlign: "center", color: BRAND.red }}>{error}</div>;
  if (auth?.status === "signed" || done) {
    return (
      <div style={S.page}>
        <div style={S.header}>
          <div style={{ fontFamily: DISPLAY, fontSize: 22, letterSpacing: 1 }}>S&amp;H SERVICES SPOKANE</div>
        </div>
        <div style={{ ...S.body, textAlign: "center", paddingTop: 60 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
          <h2 style={{ fontFamily: DISPLAY, color: BRAND.navy, fontSize: 26 }}>AUTHORIZATION SIGNED</h2>
          <p style={{ color: BRAND.muted, marginTop: 8 }}>Thank you — our team has been notified and a copy is on file for your records.</p>
        </div>
      </div>
    );
  }

  const steps = auth?.wizard_mode === "simple" ? SIMPLE_STEPS : DETAILED_STEPS;
  const current = steps[step];
  const isLast = step === steps.length - 1;

  function canAdvance() {
    if (current.requireCheck) return !!responses[current.key];
    if (current.requireInitials) return (responses[current.key] || "").trim().length >= 2;
    if (current.isSignature) return signatureName.trim().length > 1 && initials.trim().length >= 2;
    return true;
  }

  async function submit() {
    setSubmitting(true);
    try {
      // p_initials is jsonb — collect every step that required initials, plus the final signature initials
      const initialsMap = {};
      steps.forEach((s) => {
        if (s.requireInitials && responses[s.key]) initialsMap[s.key] = responses[s.key];
      });
      initialsMap.signature = initials;

      const { error: rpcErr } = await supabase.rpc("client_sign_work_authorization", {
        p_auth_code: authCode,
        p_responses: responses,
        p_initials: initialsMap,
        p_signature_name: signatureName,
        p_marketing_consent: marketingConsent,
        p_user_agent: navigator.userAgent,
      });
      if (rpcErr) throw rpcErr;
      setDone(true);
    } catch (e) {
      setError(e.message || "Something went wrong submitting your signature. Please try again.");
    }
    setSubmitting(false);
  }

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={{ fontFamily: DISPLAY, fontSize: 20, letterSpacing: 1 }}>S&amp;H SERVICES SPOKANE</div>
        <div style={{ fontFamily: SCRIPT, fontSize: 15, opacity: 0.85 }}>Restoration Done Right!</div>
      </div>
      <ProgressBar step={step} total={steps.length} />
      <div style={S.body}>
        <div style={S.card}>
          <h3 style={{ fontFamily: DISPLAY, fontSize: 19, color: BRAND.navy, margin: "0 0 10px", letterSpacing: 0.4 }}>
            {current.title.toUpperCase()}
          </h3>
          <div style={{ fontSize: 14.5, lineHeight: 1.6, color: BRAND.text }}>{current.body(job, auth)}</div>

          {current.requireCheck && (
            <label style={S.checkboxRow}>
              <input type="checkbox" checked={!!responses[current.key]} onChange={(e) => setResponses((r) => ({ ...r, [current.key]: e.target.checked }))} />
              <span>{current.requireCheck}</span>
            </label>
          )}

          {current.requireInitials && (
            <div style={{ marginTop: 12 }}>
              <label style={S.label}>Enter your initials to acknowledge</label>
              <input style={{ ...S.input, maxWidth: 120 }} value={responses[current.key] || ""} onChange={(e) => setResponses((r) => ({ ...r, [current.key]: e.target.value }))} maxLength={4} placeholder="e.g. JD" />
            </div>
          )}

          {current.isSignature && (
            <div style={{ marginTop: 14 }}>
              <label style={S.label}>Printed full name</label>
              <input style={{ ...S.input, marginBottom: 12 }} value={signatureName} onChange={(e) => setSignatureName(e.target.value)} placeholder="Type your full legal name" />
              <label style={S.label}>Initials</label>
              <input style={{ ...S.input, maxWidth: 120 }} value={initials} onChange={(e) => setInitials(e.target.value)} maxLength={4} placeholder="e.g. JD" />
              <label style={S.checkboxRow}>
                <input type="checkbox" checked={marketingConsent} onChange={(e) => setMarketingConsent(e.target.checked)} />
                <span>Optional: S&amp;H may use before/after project photos for marketing purposes.</span>
              </label>
              <p style={{ fontSize: 11.5, color: BRAND.muted, marginTop: 10 }}>
                Typing your name above and tapping Sign & Submit constitutes your electronic signature.
              </p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {step > 0 && (
            <button style={S.btnGhost} onClick={() => setStep((s) => s - 1)}>
              Back
            </button>
          )}
          {!isLast && (
            <button style={{ ...S.btnPrimary, opacity: canAdvance() ? 1 : 0.5 }} disabled={!canAdvance()} onClick={() => setStep((s) => s + 1)}>
              Continue
            </button>
          )}
          {isLast && (
            <button style={{ ...S.btnPrimary, opacity: canAdvance() && !submitting ? 1 : 0.5 }} disabled={!canAdvance() || submitting} onClick={submit}>
              {submitting ? "Submitting…" : "Sign & Submit"}
            </button>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: BRAND.muted, marginTop: 18 }}>
          Questions before signing? Call {PHONE}.
        </p>
      </div>
    </div>
  );
}
