import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Self-contained constants (no App.jsx import, avoids circular deps —
// matches the pattern used in adminTools.jsx / authWizard.jsx)
const SUPABASE_URL = "https://bhofebvgpsozpubefzvx.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJob2ZlYnZncHNvenB1YmVmenZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjE2MzgsImV4cCI6MjA5NzM5NzYzOH0.1pLDZUpEFoOBQDbwEcX1sFTVXZ80e2NLM6cSKGjYmk4";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const BRAND = {
  navy: "#1B3A6B",
  accent: "#BFD1EC",
  offWhite: "#F4F6FA",
  border: "#D1D9E8",
  muted: "#5A7099",
};
const DISPLAY = "'Bebas Neue', sans-serif";

// Keys here MUST match whatever `view` values App.jsx uses for these four
// sections. Rename the `key` fields (not the labels) if App.jsx uses
// different view identifiers.
export const PORTAL_TABS = [
  { key: "jobs", label: "My Jobs" },
  { key: "messages", label: "Messages / Change Orders" },
  { key: "billing", label: "My Bill" },
  { key: "settings", label: "Settings / Contact" },
];

export function AdminTabVisibilityPanel() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingEmail, setSavingEmail] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data: metaRows, error } = await supabase
      .from("client_portal_meta")
      .select("email, visible_tabs, invited_at")
      .order("invited_at", { ascending: false });

    if (error) {
      setToast({ type: "error", text: "Couldn't load clients: " + error.message });
      setLoading(false);
      return;
    }

    const emails = (metaRows || []).map((r) => r.email);
    let nameByEmail = {};
    if (emails.length) {
      const { data: jobRows } = await supabase
        .from("jobs")
        .select("customer_email, customer_name")
        .in("customer_email", emails);
      (jobRows || []).forEach((j) => {
        if (j.customer_email && !nameByEmail[j.customer_email]) {
          nameByEmail[j.customer_email] = j.customer_name;
        }
      });
    }

    setClients(
      (metaRows || []).map((r) => ({
        email: r.email,
        name: nameByEmail[r.email] || "",
        visibleTabs: r.visible_tabs && r.visible_tabs.length ? r.visible_tabs : null,
      }))
    );
    setLoading(false);
  }

  function effectiveTabs(client) {
    return client.visibleTabs || PORTAL_TABS.map((t) => t.key);
  }

  async function toggleTab(client, tabKey) {
    const current = effectiveTabs(client);
    const next = current.includes(tabKey)
      ? current.filter((k) => k !== tabKey)
      : [...current, tabKey];

    if (next.length === 0) {
      setToast({ type: "error", text: "A client needs at least one visible tab." });
      setTimeout(() => setToast(null), 2500);
      return;
    }
    await saveVisibility(client.email, next);
  }

  async function showAll(email) {
    await saveVisibility(email, null);
  }

  async function saveVisibility(email, tabsArrayOrNull) {
    setSavingEmail(email);
    const { error } = await supabase
      .from("client_portal_meta")
      .update({ visible_tabs: tabsArrayOrNull })
      .eq("email", email);

    if (error) {
      setToast({ type: "error", text: "Save failed: " + error.message });
    } else {
      setClients((prev) =>
        prev.map((c) => (c.email === email ? { ...c, visibleTabs: tabsArrayOrNull } : c))
      );
      setToast({ type: "ok", text: "Saved" });
    }
    setSavingEmail(null);
    setTimeout(() => setToast(null), 2000);
  }

  if (loading) {
    return <div style={{ padding: 20, color: BRAND.muted, fontSize: 14 }}>Loading clients…</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 22, color: BRAND.navy, margin: 0, letterSpacing: 0.5 }}>
          CLIENT PORTAL VISIBILITY
        </h2>
        <p style={{ fontSize: 13, color: BRAND.muted, margin: "4px 0 0" }}>
          Control which tabs each client can see. Green = visible. Default is everything visible.
        </p>
      </div>

      {toast && (
        <div
          style={{
            padding: "8px 12px",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 600,
            background: toast.type === "error" ? "#FDEAEA" : "#E8F5ED",
            color: toast.type === "error" ? "#B83232" : "#2D7D46",
          }}
        >
          {toast.text}
        </div>
      )}

      {clients.length === 0 && (
        <div style={{ padding: 20, color: BRAND.muted, fontSize: 14 }}>
          No client portal accounts yet. Invite a client first.
        </div>
      )}

      {clients.map((client) => {
        const tabs = effectiveTabs(client);
        const isRestricted = !!client.visibleTabs;
        return (
          <div
            key={client.email}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 16,
              border: `1px solid ${BRAND.border}`,
              opacity: savingEmail === client.email ? 0.6 : 1,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: BRAND.navy }}>
                  {client.name || client.email}
                </div>
                {client.name && <div style={{ fontSize: 12.5, color: BRAND.muted }}>{client.email}</div>}
              </div>
              {isRestricted && (
                <button
                  onClick={() => showAll(client.email)}
                  disabled={savingEmail === client.email}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: BRAND.navy,
                    background: "none",
                    border: "none",
                    textDecoration: "underline",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  Show All
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {PORTAL_TABS.map((tab) => {
                const enabled = tabs.includes(tab.key);
                return (
                  <button
                    key={tab.key}
                    onClick={() => toggleTab(client, tab.key)}
                    disabled={savingEmail === client.email}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "7px 12px",
                      borderRadius: 999,
                      border: `1px solid ${enabled ? "#16A34A" : BRAND.border}`,
                      background: enabled ? "#F0FDF4" : BRAND.offWhite,
                      color: enabled ? "#15803D" : BRAND.muted,
                      fontSize: 12.5,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    <span>{tab.label}</span>
                    <div
                      style={{
                        width: 30,
                        height: 17,
                        borderRadius: 99,
                        background: enabled ? "#16A34A" : BRAND.border,
                        position: "relative",
                        flexShrink: 0,
                        transition: "background 0.2s",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 2,
                          left: enabled ? 15 : 2,
                          width: 13,
                          height: 13,
                          borderRadius: "50%",
                          background: "#fff",
                          transition: "left 0.2s",
                          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
