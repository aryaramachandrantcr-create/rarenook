"use client";

import {
  NavProps, T,
  StatusBar, PhoneShell, BottomNav,
} from "./shared";

export default function CardDetailScreen({ onNavigate }: NavProps) {
  return (
    <PhoneShell>
      <StatusBar />

      {/* Top Nav */}
      <div style={{ background: T.sky, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 18px 12px" }}>
        <div
          onClick={() => onNavigate("Marketplace")}
          style={{ fontSize: "14px", fontWeight: 700, color: T.lavender, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
        >
          <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
            <path d="M7 1L1 6.5L7 12" stroke={T.lavender} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </div>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 800, color: T.ink }}>Card Detail</div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ cursor: "pointer" }}>
            <path d="M9 2L11 7H16L12 10.5L13.5 16L9 13L4.5 16L6 10.5L2 7H7L9 2Z" stroke="#FFD740" strokeWidth="1.7" strokeLinejoin="round"/>
          </svg>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ cursor: "pointer" }}>
            <circle cx="4" cy="9" r="1.5" fill={T.inkSoft}/>
            <circle cx="9" cy="9" r="1.5" fill={T.inkSoft}/>
            <circle cx="14" cy="9" r="1.5" fill={T.inkSoft}/>
          </svg>
        </div>
      </div>

      <div style={{ maxHeight: "636px", overflowY: "auto", overflowX: "hidden" }}>

        {/* Hero image */}
        <div style={{ height: "220px", background: `linear-gradient(150deg, ${T.skySoft} 0%, #9DD0EA 100%)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          <div
            onClick={() => onNavigate("Marketplace")}
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", boxShadow: T.s1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M6 1L1 6L6 11" stroke={T.ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ width: "122px", height: "170px", background: T.white, borderRadius: "12px", boxShadow: T.s3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "76px", border: `2px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
            🃏
            <div style={{ position: "absolute", inset: 0, borderRadius: "12px", background: "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 55%)", pointerEvents: "none" }} />
          </div>
          <div
            style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.85)", boxShadow: T.s1, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <svg width="7" height="12" viewBox="0 0 7 12" fill="none"><path d="M1 1L6 6L1 11" stroke={T.ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* Thumbnails */}
        <div style={{ display: "flex", gap: "7px", justifyContent: "center", padding: "10px 0 13px" }}>
          {[true, false, false, false].map((active, i) => (
            <div key={i} style={{ width: "40px", height: "40px", borderRadius: "10px", background: active ? T.white : "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", border: `1.5px solid ${active ? T.navy : "transparent"}`, boxShadow: active ? T.s1 : "none", cursor: "pointer" }}>🃏</div>
          ))}
        </div>

        {/* Card info */}
        <div style={{ padding: "0 16px 13px" }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "21px", fontWeight: 900, color: T.ink }}>Charizard ex SAR</div>
          <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "3px", marginBottom: "10px", lineHeight: 1.5 }}>
            Scarlet &amp; Violet 151 · #006/165 · Holo Rare · EN · 2023
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "28px", fontWeight: 900, color: T.ink }}>₹24,500</span>
            <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, color: "#16854E", background: T.mintSoft, padding: "4px 11px", borderRadius: "50px", border: `1.5px solid ${T.mint}` }}>Near Mint</span>
            <span style={{ fontSize: "12px", fontWeight: 700, color: T.mint }}>↑ 12%</span>
          </div>
        </div>

        {/* Market Intelligence */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", margin: "0 16px 11px" }}>
          {[
            { label: "Global Avg", value: "$290",    sub: "USD",       color: T.ink     },
            { label: "India Avg",  value: "₹24,200", sub: "avg price", color: T.coral   },
            { label: "Last Sale",  value: "₹23,800", sub: "verified",  color: T.mint    },
          ].map((stat) => (
            <div key={stat.label} style={{ background: T.white, borderRadius: "12px", boxShadow: T.s1, padding: "10px 8px", textAlign: "center" as const, border: `1.5px solid ${T.border}` }}>
              <div style={{ fontSize: "9px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{stat.label}</div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: stat.color, marginTop: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "9px", color: T.inkSoft, marginTop: "2px" }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div style={{ margin: "0 16px 12px", padding: "10px 13px", background: T.mintSoft, borderRadius: "12px", borderLeft: `3px solid ${T.mint}`, fontSize: "11px", fontWeight: 500, color: "#16854E", lineHeight: 1.55 }}>
          💡 Recommended range ₹22k–₹26k · Price trending up — good time to sell!
        </div>

        {/* Seller */}
        <div style={{ margin: "0 16px 13px", background: T.white, borderRadius: "18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", gap: "11px", padding: "11px 13px" }}>
          <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#FFF5C0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontSize: "17px", fontWeight: 900, color: T.ink, flexShrink: 0, border: `2px solid ${T.border}` }}>R</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 800, color: T.ink }}>Rahul_TCG</div>
            <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px" }}>Mumbai · ⭐ 4.9 · 143 sales · 99% authentic</div>
          </div>
          <div style={{ background: T.mintSoft, color: "#16854E", fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "50px", border: `1.5px solid ${T.mint}` }}>🛡 Trusted</div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "10px", padding: "0 16px", marginBottom: "12px" }}>
          <div
            style={{ flex: 1.4, padding: "13px 0", background: T.yellow, borderRadius: "18px", border: `2px solid ${T.navy}`, fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.navy, textAlign: "center" as const, cursor: "pointer", boxShadow: `2px 3px 0 ${T.navy}`, transition: "transform 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
          >Buy Now</div>
          <div
            style={{ flex: 1, padding: "13px 0", background: "transparent", border: `2px solid ${T.borderMid}`, borderRadius: "18px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 700, color: T.inkMid, textAlign: "center" as const, cursor: "pointer", transition: "border-color 0.15s" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = T.navy}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.borderMid}
          >⇄ Make Offer</div>
        </div>

        <div style={{ textAlign: "center" as const, fontSize: "10px", color: T.inkSoft, padding: "0 16px 14px", lineHeight: 1.5 }}>
          🔒 Protected by RareNook Escrow · Authenticity verified before delivery
        </div>

        <div style={{ height: "14px" }} />
      </div>

      <BottomNav active="Market" onNavigate={onNavigate} />
    </PhoneShell>
  );
}
