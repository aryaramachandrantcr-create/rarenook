"use client";

import React, { useState, useEffect, useRef } from "react";
import { NavProps, T, StatusBar, PhoneShell, BottomNav } from "./shared";

// ─── TYPES ────────────────────────────────────────────────
type ModalType = "support" | "negotiate" | "payment" | "loading" | "success" | null;

// ─── DATA ─────────────────────────────────────────────────
const CHAT_INIT = [
  { from: "them", user: "CardKing_BLR", text: "Hey! I'm interested in your Charizard SAR 🔥", time: "2:14 PM" },
  { from: "me",   user: "You",          text: "Sure! What are you offering for it?",           time: "2:16 PM" },
  { from: "them", user: "CardKing_BLR", text: "Luffy Gear 5 R + ₹20k balance. Thoughts?",      time: "2:17 PM" },
  { from: "me",   user: "You",          text: "Min ₹21k — that's market rate 📊",               time: "2:19 PM" },
  { from: "them", user: "CardKing_BLR", text: "Deal! ₹21k works for me 👍",                    time: "2:20 PM" },
];

const ESCROW_STEPS = [
  { num: "1", label: ["You", "Ship"],     bg: "#FFF5C0" },
  { num: "2", label: ["We", "Verify"],    bg: "#E4F4FB" },
  { num: "3", label: ["We", "Ship"],      bg: "#F3F1FF" },
  { num: "4", label: ["You", "Get Paid"], bg: "#EDFBF4" },
];

const COUNTER_PRESETS = ["₹19,000", "₹20,000", "₹21,100", "₹22,500"];

const PAYMENT_METHODS = [
  { id: "upi",      icon: "📲", label: "UPI",            sub: "PhonePe, GPay, Paytm" },
  { id: "bank",     icon: "🏦", label: "Bank Transfer",  sub: "NEFT / IMPS / RTGS" },
  { id: "wallet",   icon: "💼", label: "Wallet",         sub: "RareNook balance" },
  { id: "escrow",   icon: "🔒", label: "Escrow Hold",    sub: "Held until card verified" },
];

// ─── OVERLAY SHELL ────────────────────────────────────────
function OverlayShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 900,
        background: "rgba(28,35,64,0.48)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        backdropFilter: "blur(4px)",
        animation: "rnFade 0.18s ease",
      }}
    >
      <style>{`
        @keyframes rnFade   { from { opacity: 0 } to { opacity: 1 } }
        @keyframes rnSlide  { from { transform: translateY(28px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes rnSpin   { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes rnPop    { 0% { transform: scale(0.85); opacity: 0 } 60% { transform: scale(1.05) } 100% { transform: scale(1); opacity: 1 } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "345px", background: T.white,
          borderRadius: "26px 26px 0 0",
          padding: "0 0 32px",
          boxShadow: T.s3,
          animation: "rnSlide 0.22s ease",
          maxHeight: "90vh", overflowY: "auto",
        }}
      >
        <div style={{ width: "36px", height: "4px", background: T.inkGhost, borderRadius: "2px", margin: "16px auto 0" }} />
        {children}
      </div>
    </div>
  );
}

// ─── 1. CHAT SUPPORT MODAL ────────────────────────────────
function SupportModal({ onClose }: { onClose: () => void }) {
  return (
    <OverlayShell onClose={onClose}>
      <div style={{ padding: "20px 22px 0" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "17px", fontWeight: 900, color: T.ink }}>Collector Support</div>
              <div style={{ background: T.yellow, color: T.navy, fontFamily: "Nunito, sans-serif", fontSize: "9px", fontWeight: 800, padding: "2px 8px", borderRadius: "50px", border: `1.5px solid ${T.navy}` }}>Coming Soon</div>
            </div>
            <div style={{ fontSize: "11px", color: T.inkSoft }}>Help with trades, escrow &amp; disputes</div>
          </div>
          <div onClick={onClose} style={{ width: "28px", height: "28px", borderRadius: "50%", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke={T.inkMid} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </div>
        </div>

        {/* Preview card */}
        <div style={{ background: `linear-gradient(135deg, ${T.skySoft}, ${T.lavSoft})`, borderRadius: "18px", padding: "20px", marginBottom: "18px", textAlign: "center" as const, border: `1.5px solid ${T.border}` }}>
          <div style={{ fontSize: "42px", marginBottom: "10px" }}>🤖</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.ink, marginBottom: "6px" }}>AI Trade Assistant</div>
          <div style={{ fontSize: "12px", color: T.inkMid, lineHeight: 1.65 }}>Get instant help with trade valuations, escrow guidance, dispute resolution, and collector advice.</div>
        </div>

        {/* Feature list */}
        {[
          { icon: "💬", label: "Live collector support", sub: "Chat with verified RareNook agents" },
          { icon: "🤖", label: "AI trade assistance",    sub: "Instant answers on pricing & escrow" },
          { icon: "⚖️", label: "Dispute resolution",     sub: "Fair resolution for trade conflicts" },
        ].map(f => (
          <div key={f.label} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: `1px solid rgba(28,35,64,0.06)` }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{f.icon}</div>
            <div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{f.label}</div>
              <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "1px" }}>{f.sub}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: "18px", padding: "10px 13px", background: T.skySoft, borderRadius: "12px", fontSize: "11px", color: T.inkMid, lineHeight: 1.6, marginBottom: "18px" }}>
          🚧 Live collector support and AI trade assistance will be available in the next update.
        </div>

        <div onClick={onClose} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>
          Got it
        </div>
      </div>
    </OverlayShell>
  );
}

// ─── 2. NEGOTIATE MODAL ───────────────────────────────────
function NegotiateModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount]   = useState("21,100");
  const [sent, setSent]       = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  function pickPreset(p: string) {
    const num = p.replace("₹", "").replace(",", "");
    setAmount(Number(num).toLocaleString("en-IN"));
    setSelected(p);
  }

  function handleSend() {
    if (!amount) return;
    setSent(true);
  }

  return (
    <OverlayShell onClose={onClose}>
      <div style={{ padding: "20px 22px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "17px", fontWeight: 900, color: T.ink }}>Counter Offer</div>
          <div onClick={onClose} style={{ width: "28px", height: "28px", borderRadius: "50%", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke={T.inkMid} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </div>
        </div>

        {sent ? (
          /* ── Sent confirmation ── */
          <div style={{ textAlign: "center" as const, padding: "20px 0 24px" }}>
            <div style={{ fontSize: "48px", marginBottom: "14px", animation: "rnPop 0.4s ease" }}>✅</div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink, marginBottom: "8px" }}>Counter Offer Sent!</div>
            <div style={{ fontSize: "12px", color: T.inkSoft, lineHeight: 1.65, marginBottom: "6px" }}>You offered <strong style={{ color: T.ink }}>₹{amount}</strong> balance payment to CardKing_BLR.</div>
            <div style={{ fontSize: "11px", color: T.inkSoft, marginBottom: "24px" }}>They'll be notified and can accept, decline, or counter.</div>
            <div onClick={onClose} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>
              Back to Trade
            </div>
          </div>
        ) : (
          <>
            {/* Context pill */}
            <div style={{ background: T.skySoft, borderRadius: "10px", padding: "9px 12px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: "11px", color: T.inkMid }}>Current gap</div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink }}>₹21,100</div>
            </div>

            {/* Quick presets */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "9px" }}>Quick Presets</div>
              <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" as const }}>
                {COUNTER_PRESETS.map(p => {
                  const isOn = selected === p;
                  return (
                    <div key={`preset-${p}`} onClick={() => pickPreset(p)} style={{ padding: "7px 14px", borderRadius: "50px", fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700, cursor: "pointer", background: isOn ? T.navy : T.white, color: isOn ? T.yellow : T.inkMid, border: `1.5px solid ${isOn ? T.navy : T.border}`, transition: "all 0.15s" }}>{p}</div>
                  );
                })}
              </div>
            </div>

            {/* Custom amount input */}
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "9px" }}>Custom Amount</div>
              <div style={{ display: "flex", alignItems: "center", background: T.white, border: `2px solid ${T.navy}`, borderRadius: "14px", padding: "11px 14px", gap: "6px" }}>
                <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 900, color: T.inkMid }}>₹</span>
                <input
                  value={amount}
                  onChange={e => { setAmount(e.target.value); setSelected(null); }}
                  placeholder="Enter amount"
                  style={{ flex: 1, border: "none", outline: "none", fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 900, color: T.ink, background: "transparent" }}
                />
              </div>
              <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "6px", paddingLeft: "4px" }}>Market avg balance: ₹21,100 · Min accepted: ₹18,000</div>
            </div>

            {/* Note input */}
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "9px" }}>Add a Note (optional)</div>
              <textarea
                placeholder="e.g. I can include shipping insurance..."
                style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${T.border}`, borderRadius: "12px", fontFamily: "Nunito Sans, sans-serif", fontSize: "12px", color: T.inkMid, outline: "none", background: T.skySoft, resize: "none" as const, height: "60px" }}
              />
            </div>

            <div onClick={handleSend} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer", marginBottom: "8px", transition: "transform 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
            >
              Send Counter Offer
            </div>
            <div onClick={onClose} style={{ width: "100%", padding: "11px 0", background: "transparent", border: `1.5px solid ${T.border}`, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkMid, textAlign: "center" as const, cursor: "pointer", marginBottom: "4px" }}>
              Cancel
            </div>
          </>
        )}
      </div>
    </OverlayShell>
  );
}

// ─── 3. PAYMENT MODAL ────────────────────────────────────
function PaymentModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState("upi");
  const [confirmed, setConfirmed] = useState(false);

  return (
    <OverlayShell onClose={onClose}>
      <div style={{ padding: "20px 22px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "17px", fontWeight: 900, color: T.ink }}>Pay Balance</div>
          <div onClick={onClose} style={{ width: "28px", height: "28px", borderRadius: "50%", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke={T.inkMid} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </div>
        </div>
        <div style={{ fontSize: "11px", color: T.inkSoft, marginBottom: "18px" }}>payable by CardKing_BLR to complete the trade</div>

        {confirmed ? (
          <div style={{ textAlign: "center" as const, padding: "12px 0 24px" }}>
            <div style={{ fontSize: "44px", marginBottom: "14px", animation: "rnPop 0.4s ease" }}>✅</div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink, marginBottom: "8px" }}>Payment Initiated</div>
            <div style={{ fontSize: "12px", color: T.inkSoft, lineHeight: 1.65, marginBottom: "22px" }}>₹21,100 via {PAYMENT_METHODS.find(m => m.id === selected)?.label}. Funds will be held in RareNook Escrow until the card is verified.</div>
            <div onClick={onClose} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>Done</div>
          </div>
        ) : (
          <>
            {/* Amount display */}
            <div style={{ background: `linear-gradient(135deg, #DDD8FA, #E4F4FB)`, borderRadius: "16px", padding: "16px", marginBottom: "16px", textAlign: "center" as const }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "6px" }}>Balance Due</div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "28px", fontWeight: 900, color: T.navy }}>₹21,100</div>
              <div style={{ fontSize: "10px", color: T.inkMid, marginTop: "4px" }}>Held securely in RareNook Escrow</div>
            </div>

            {/* Payment methods */}
            <div style={{ marginBottom: "14px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "10px" }}>Payment Method</div>
              {PAYMENT_METHODS.map(m => {
                const isOn = selected === m.id;
                return (
                  <div
                    key={`pay-${m.id}`}
                    onClick={() => setSelected(m.id)}
                    style={{ display: "flex", alignItems: "center", gap: "12px", padding: "11px 13px", borderRadius: "14px", marginBottom: "6px", background: isOn ? T.skySoft : T.white, border: `1.5px solid ${isOn ? T.navy : T.border}`, cursor: "pointer", transition: "all 0.15s" }}
                  >
                    <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: isOn ? T.white : T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{m.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 800, color: T.ink }}>{m.label}</div>
                      <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "1px" }}>{m.sub}</div>
                    </div>
                    <div style={{ width: "18px", height: "18px", borderRadius: "50%", border: `2px solid ${isOn ? T.navy : T.inkGhost}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {isOn && <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: T.navy }} />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Escrow explainer */}
            <div style={{ background: T.mintSoft, borderRadius: "12px", padding: "11px 13px", marginBottom: "14px", borderLeft: `3px solid ${T.mint}` }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, color: "#16854E", marginBottom: "4px" }}>🔒 How RareNook Escrow Works</div>
              <div style={{ fontSize: "11px", color: T.inkMid, lineHeight: 1.65 }}>Your payment is held safely until the card passes our authenticity and condition check. If anything fails, you get a full refund.</div>
            </div>

            {/* Demo notice */}
            <div style={{ background: T.skySoft, borderRadius: "10px", padding: "9px 12px", marginBottom: "16px", fontSize: "10px", color: T.inkSoft, textAlign: "center" as const }}>
              ⚙️ Payment processing is simulated for demo purposes
            </div>

            <div onClick={() => setConfirmed(true)} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer", marginBottom: "8px" }}>
              Confirm Payment · ₹21,100
            </div>
            <div onClick={onClose} style={{ width: "100%", padding: "11px 0", background: "transparent", border: `1.5px solid ${T.border}`, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkMid, textAlign: "center" as const, cursor: "pointer", marginBottom: "4px" }}>
              Cancel
            </div>
          </>
        )}
      </div>
    </OverlayShell>
  );
}

// ─── 4. LOADING + SUCCESS MODALS ─────────────────────────
function LoadingModal({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2000);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 950, background: "rgba(28,35,64,0.55)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <style>{`@keyframes rnSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <div style={{ background: T.white, borderRadius: "24px", padding: "36px 40px", textAlign: "center" as const, boxShadow: T.s3, animation: "rnFade 0.2s ease" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "50%", border: `3px solid ${T.skySoft}`, borderTop: `3px solid ${T.navy}`, margin: "0 auto 18px", animation: "rnSpin 0.8s linear infinite" }} />
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 800, color: T.ink, marginBottom: "6px" }}>Starting Escrow...</div>
        <div style={{ fontSize: "11px", color: T.inkSoft }}>Securing your trade with RareNook</div>
      </div>
    </div>
  );
}

function SuccessModal({ onTrack, onHub }: { onTrack: () => void; onHub: () => void }) {
  const steps = [
    { icon: "✅", label: "Trade created successfully",    done: true  },
    { icon: "🔒", label: "Escrow initiated",             done: true  },
    { icon: "⏳", label: "Awaiting payment confirmation", done: false },
    { icon: "📦", label: "Shipment instructions next",   done: false },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 950, background: "rgba(28,35,64,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", backdropFilter: "blur(4px)" }}>
      <div style={{ width: "100%", maxWidth: "310px", background: T.white, borderRadius: "26px", padding: "28px 24px", boxShadow: T.s3, animation: "rnPop 0.35s ease" }}>
        {/* Trophy */}
        <div style={{ textAlign: "center" as const, marginBottom: "20px" }}>
          <div style={{ fontSize: "52px", marginBottom: "12px", animation: "rnPop 0.4s ease 0.1s both" }}>🎉</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 900, color: T.ink, marginBottom: "4px" }}>Trade Started!</div>
          <div style={{ fontSize: "12px", color: T.inkSoft }}>Charizard ex SAR ⇄ Luffy Gear 5 R</div>
        </div>

        {/* Status steps */}
        <div style={{ marginBottom: "20px" }}>
          {steps.map((s, i) => (
            <div key={`success-step-${i}`} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < steps.length - 1 ? `1px solid rgba(28,35,64,0.06)` : "none" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: s.done ? T.mintSoft : T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", flexShrink: 0, border: `1.5px solid ${s.done ? T.mint : T.border}` }}>{s.icon}</div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: s.done ? 700 : 500, color: s.done ? T.ink : T.inkGhost }}>{s.label}</div>
              {s.done && <div style={{ marginLeft: "auto", fontSize: "10px", fontWeight: 700, color: T.mint }}>✓</div>}
            </div>
          ))}
        </div>

        {/* Trade ID */}
        <div style={{ background: T.skySoft, borderRadius: "10px", padding: "9px 12px", marginBottom: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: "10px", color: T.inkSoft, fontWeight: 600 }}>Trade ID</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, color: T.ink }}>#RN-2024-7841</div>
        </div>

        {/* CTAs */}
        <div onClick={onTrack} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer", marginBottom: "9px" }}>
          📦 Track Trade
        </div>
        <div onClick={onHub} style={{ width: "100%", padding: "12px 0", background: "transparent", border: `1.5px solid ${T.border}`, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkMid, textAlign: "center" as const, cursor: "pointer" }}>
          ← Return to Trade Hub
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SCREEN ─────────────────────────────────────────
export default function TradeOfferScreen({ onNavigate }: NavProps) {
  const [modal, setModal]         = useState<ModalType>(null);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages]   = useState(CHAT_INIT);
  const [declined, setDeclined]   = useState(false);
  const chatEndRef                = useRef<HTMLDivElement>(null);

  function sendMessage() {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { from: "me", user: "You", text: chatInput.trim(), time: "now" }]);
    setChatInput("");
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function handleAccept() {
    setModal("loading");
  }

  function handleLoadingDone() {
    setModal("success");
  }

  return (
    <>
      {/* ── Modals ── */}
      {modal === "support"   && <SupportModal   onClose={() => setModal(null)} />}
      {modal === "negotiate" && <NegotiateModal  onClose={() => setModal(null)} />}
      {modal === "payment"   && <PaymentModal    onClose={() => setModal(null)} />}
      {modal === "loading"   && <LoadingModal    onDone={handleLoadingDone}    />}
      {modal === "success"   && (
        <SuccessModal
          onTrack={() => { setModal(null); onNavigate("TradeHub"); }}
          onHub={() => { setModal(null); onNavigate("TradeHub"); }}
        />
      )}

      <PhoneShell>
        <StatusBar />

        {/* ── Top Nav ── */}
        <div style={{ background: T.sky, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 18px 12px" }}>
          <div
            onClick={() => onNavigate("TradeHub")}
            style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "14px", fontWeight: 700, color: T.lavender, cursor: "pointer" }}
          >
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none"><path d="M7 1L1 6.5L7 12" stroke={T.lavender} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Trade Hub
          </div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 900, color: T.ink }}>Trade Offer</div>
          <div
            onClick={() => setModal("negotiate")}
            style={{ fontSize: "12px", fontWeight: 700, color: T.lavender, background: T.lavSoft, padding: "5px 11px", borderRadius: "8px", cursor: "pointer", border: `1.5px solid ${T.lavender}`, transition: "all 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.lavender; (e.currentTarget as HTMLElement).style.color = T.white; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.lavSoft;  (e.currentTarget as HTMLElement).style.color = T.lavender; }}
          >
            Negotiate
          </div>
        </div>

        <div style={{ maxHeight: "636px", overflowY: "auto", overflowX: "hidden" }}>

          {/* ── Status pill ── */}
          {!declined && (
            <div style={{ margin: "4px 16px 13px", background: T.lavSoft, borderRadius: "12px", padding: "9px 13px", textAlign: "center" as const, fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700, color: T.lavender }}>
              ⏳ Awaiting confirmation from CardKing_BLR
            </div>
          )}
          {declined && (
            <div style={{ margin: "4px 16px 13px", background: "#FFF0ED", borderRadius: "12px", padding: "9px 13px", textAlign: "center" as const, fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700, color: T.coral }}>
              ❌ Trade declined. You can make a new offer anytime.
            </div>
          )}

          {/* ── Card comparison ── */}
          <div style={{ display: "flex", alignItems: "center", padding: "0 16px 14px", gap: "10px" }}>
            <div style={{ flex: 1, background: T.white, borderRadius: "18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: T.inkSoft, padding: "9px 11px 6px", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>You Offer</div>
              <div style={{ height: "88px", background: "#FFF0ED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "44px" }}>🃏</div>
              <div style={{ padding: "9px 11px 11px" }}>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 900, color: T.ink }}>Charizard ex SAR</div>
                <div style={{ fontSize: "9px", color: T.inkSoft, marginTop: "2px" }}>SV151 · PSA 10 · EN</div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.coral, marginTop: "5px" }}>~₹24,500</div>
              </div>
            </div>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#DDD8FA", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 900, color: T.navy, border: `2px solid ${T.navy}`, flexShrink: 0 }}>VS</div>
            <div style={{ flex: 1, background: T.white, borderRadius: "18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
              <div style={{ fontSize: "10px", fontWeight: 700, color: T.inkSoft, padding: "9px 11px 6px", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>You Receive</div>
              <div style={{ height: "88px", background: "#E4F4FB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "44px" }}>🃏</div>
              <div style={{ padding: "9px 11px 11px" }}>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 900, color: T.ink }}>Luffy Gear 5 R</div>
                <div style={{ fontSize: "9px", color: T.inkSoft, marginTop: "2px" }}>OP06 · NM · JP</div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: "#2A7FAA", marginTop: "5px" }}>~₹3,400</div>
              </div>
            </div>
          </div>

          {/* ── Value gap ── */}
          <div style={{ margin: "0 16px 12px", background: "#FFF0ED", borderRadius: "12px", padding: "11px 13px", borderLeft: `3px solid ${T.coral}` }}>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 900, color: T.coral }}>⚠️ Value Gap Detected</div>
            <div style={{ fontSize: "11px", color: T.inkMid, marginTop: "4px", lineHeight: 1.55 }}>
              Your card is worth ~₹21,100 more. The other party must pay this balance to complete the trade.
            </div>
          </div>

          {/* ── Balance payment card ── */}
          <div style={{ margin: "0 16px 12px", background: "#DDD8FA", borderRadius: "18px", padding: "13px 14px" }}>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.navy }}>💸 Balance Payment Required</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
              <div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "22px", fontWeight: 900, color: T.navy }}>₹21,100</div>
                <div style={{ fontSize: "10px", color: T.navy, opacity: 0.65, marginTop: "3px" }}>payable by CardKing_BLR</div>
              </div>
              <div
                onClick={() => setModal("payment")}
                style={{ background: T.white, borderRadius: "10px", padding: "8px 14px", fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, color: T.navy, border: `1.5px solid ${T.navy}`, cursor: "pointer", transition: "all 0.15s", boxShadow: `1px 1px 0 ${T.navy}` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = T.navy; (e.currentTarget as HTMLElement).style.color = T.yellow; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.white; (e.currentTarget as HTMLElement).style.color = T.navy; }}
              >
                Pay Balance
              </div>
            </div>
          </div>

          {/* ── Escrow timeline ── */}
          <div style={{ margin: "0 16px 12px", background: T.white, borderRadius: "18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, padding: "14px" }}>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink, marginBottom: "12px" }}>🔒 RareNook Escrow Flow</div>
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              {ESCROW_STEPS.map((step, i) => (
                <React.Fragment key={`escrow-${step.num}`}>
                  <div style={{ flex: 1, textAlign: "center" as const }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: step.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 900, color: T.ink, margin: "0 auto 5px", boxShadow: T.s1 }}>{step.num}</div>
                    <div style={{ fontSize: "9px", fontWeight: 700, color: T.inkSoft, lineHeight: 1.35 }}>
                      {step.label.map((l, j) => <div key={`lbl-${j}`}>{l}</div>)}
                    </div>
                  </div>
                  {i < 3 && <div style={{ fontSize: "11px", color: T.inkGhost, flexShrink: 0, marginTop: "9px", padding: "0 2px" }}>→</div>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ── Trade chat ── */}
          <div style={{ margin: "0 16px 12px", background: T.white, borderRadius: "18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, padding: "13px" }}>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink, marginBottom: "10px" }}>💬 Trade Chat</div>
            <div style={{ maxHeight: "160px", overflowY: "auto", marginBottom: "10px", display: "flex", flexDirection: "column" as const, gap: "8px" }}>
              {messages.map((msg, i) => {
                const isMe = msg.from === "me";
                return (
                  <div key={`msg-${i}`} style={{ display: "flex", flexDirection: "column" as const, alignItems: isMe ? "flex-end" : "flex-start" }}>
                    {!isMe && <div style={{ fontSize: "9px", color: T.inkSoft, fontWeight: 600, marginBottom: "3px" }}>{msg.user}</div>}
                    <div style={{ maxWidth: "85%", padding: "7px 11px", borderRadius: isMe ? "12px 4px 12px 12px" : "4px 12px 12px 12px", background: isMe ? "#FFF5C0" : T.skySoft, fontSize: "11px", color: T.ink, lineHeight: 1.45 }}>{msg.text}</div>
                    <div style={{ fontSize: "9px", color: T.inkGhost, marginTop: "2px" }}>{msg.time}</div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: "8px 12px", border: `1.5px solid ${T.border}`, borderRadius: "10px", fontFamily: "Nunito Sans, sans-serif", fontSize: "12px", color: T.inkMid, outline: "none", background: T.skySoft }} />
              <div onClick={sendMessage} style={{ width: "32px", height: "32px", background: T.navy, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7L13 1L7 13V7H1Z" fill={T.yellow} stroke={T.yellow} strokeWidth="0.5" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>

          {/* ── CTA buttons ── */}
          {!declined ? (
            <div style={{ display: "flex", gap: "10px", padding: "0 16px", marginBottom: "14px" }}>
              <div
                onClick={handleAccept}
                style={{ flex: 1.4, padding: "13px 0", background: T.navy, borderRadius: "16px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", boxShadow: `2px 3px 0 rgba(28,35,64,0.25)` }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `2px 5px 0 rgba(28,35,64,0.2)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `2px 3px 0 rgba(28,35,64,0.25)`; }}
              >Accept &amp; Start Escrow</div>
              <div
                onClick={() => setDeclined(true)}
                style={{ flex: 1, padding: "13px 0", background: "#FFF0ED", borderRadius: "16px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 800, color: T.coral, textAlign: "center" as const, cursor: "pointer" }}
              >Decline</div>
            </div>
          ) : (
            <div style={{ display: "flex", gap: "10px", padding: "0 16px", marginBottom: "14px" }}>
              <div onClick={() => setModal("negotiate")} style={{ flex: 1, padding: "13px 0", background: T.navy, borderRadius: "16px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>Make Counter Offer</div>
              <div onClick={() => onNavigate("TradeHub")} style={{ flex: 1, padding: "13px 0", background: "transparent", border: `1.5px solid ${T.border}`, borderRadius: "16px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkMid, textAlign: "center" as const, cursor: "pointer" }}>Back</div>
            </div>
          )}

          {/* ── Support row ── */}
          <div
            onClick={() => setModal("support")}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "0 16px 16px", cursor: "pointer" }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5.5" stroke={T.inkSoft} strokeWidth="1.3"/><path d="M6.5 4C5.7 4 5 4.7 5 5.5" stroke={T.inkSoft} strokeWidth="1.3" strokeLinecap="round"/><circle cx="6.5" cy="8.5" r="0.7" fill={T.inkSoft}/></svg>
            <span style={{ fontSize: "11px", fontWeight: 600, color: T.inkSoft }}>Need help with this trade?</span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: T.lavender }}>Chat Support →</span>
          </div>

          <div style={{ height: "6px" }} />
        </div>

        <BottomNav active="Trade" onNavigate={onNavigate} />
      </PhoneShell>
    </>
  );
}
