"use client";

import React, { useState } from "react";
import {
  Screen, T, ALL_CARDS, MOVERS, SALES,
  CardArt, ArtKey, condStyle,
  Modal, NotificationsModal, InfoModal, AddListingModal,
  LogoBall,
} from "./shared";

// ─── CONSTANTS ────────────────────────────────────────────
const MAX_W = "1280px";
const PAD   = "0 clamp(20px, 3.5vw, 48px)";

// ─── FEATURE ICONS (yellow fill, navy outline) ────────────
function IconCart() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="1" y="1" width="38" height="38" rx="10" fill={T.yellow} stroke={T.navy} strokeWidth="2"/>
      <path d="M9 11H12L15 24H28L30 16H13" stroke={T.navy} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="17" cy="28" r="2.2" fill={T.navy}/>
      <circle cx="26" cy="28" r="2.2" fill={T.navy}/>
    </svg>
  );
}
function IconHandshake() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="1" y="1" width="38" height="38" rx="10" fill={T.yellow} stroke={T.navy} strokeWidth="2"/>
      <path d="M8 22L13 26.5L18 23L22 26.5L29 22" stroke={T.navy} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8 17L13 14H19L23 17H29" stroke={T.navy} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 27V31M29 22V27" stroke={T.navy} strokeWidth="2.2" strokeLinecap="round"/>
    </svg>
  );
}
function IconPackage() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="1" y="1" width="38" height="38" rx="10" fill={T.yellow} stroke={T.navy} strokeWidth="2"/>
      <rect x="10" y="20" width="20" height="13" rx="2.5" fill="white" stroke={T.navy} strokeWidth="2"/>
      <path d="M10 20L13.5 14H26.5L30 20" stroke={T.navy} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M17 20V14" stroke={T.navy} strokeWidth="2"/>
      <circle cx="28" cy="16" r="5.5" fill={T.yellow} stroke={T.navy} strokeWidth="2"/>
      <path d="M25.5 16L27.2 17.7L30.5 14.5" stroke={T.navy} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function IconChat() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="1" y="1" width="38" height="38" rx="10" fill={T.yellow} stroke={T.navy} strokeWidth="2"/>
      <rect x="8" y="10" width="17" height="13" rx="3.5" fill="white" stroke={T.navy} strokeWidth="2"/>
      <path d="M11 27L9 31V27H7" stroke={T.navy} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="12.5" cy="16.5" r="1.8" fill={T.navy}/>
      <circle cx="16.5" cy="16.5" r="1.8" fill={T.navy}/>
      <circle cx="20.5" cy="16.5" r="1.8" fill={T.navy}/>
      <rect x="17" y="18" width="15" height="11" rx="3.5" fill={T.yellow} stroke={T.navy} strokeWidth="2"/>
      <path d="M32 29V32L29 29" stroke={T.navy} strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

// ─── DESKTOP NAV ──────────────────────────────────────────
function DesktopNav({ screen, onNavigate, onNotif, onProfile, onSell }: {
  screen: Screen;
  onNavigate: (s: Screen) => void;
  onNotif: () => void;
  onProfile: () => void;
  onSell: () => void;
}) {
  const links: { label: string; screen: Screen }[] = [
    { label: "Home",        screen: "Home"        },
    { label: "Marketplace", screen: "Marketplace" },
    { label: "Trade Hub",   screen: "TradeHub"    },
    { label: "Community",   screen: "Community"   },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.94)",
      backdropFilter: "blur(14px)",
      borderBottom: `1px solid ${T.border}`,
      boxShadow: T.s1,
    }}>
      <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: PAD, display: "flex", alignItems: "center", height: "64px", gap: "28px" }}>
        {/* Logo */}
        <div onClick={() => onNavigate("Home")} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flexShrink: 0 }}>
          <LogoBall />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 800, color: T.navy, lineHeight: 1 }}>
              Rare<span style={{ color: T.coral }}>Nook</span>
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 500, color: T.inkSoft, letterSpacing: "0.07em", textTransform: "uppercase" as const }}>India</div>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "2px", flex: 1 }}>
          {links.map(l => {
            const on = screen === l.screen;
            return (
              <div key={l.screen} onClick={() => onNavigate(l.screen)}
                style={{ padding: "7px 15px", borderRadius: "9px", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: on ? 700 : 500, color: on ? T.navy : T.inkSoft, background: on ? T.skySoft : "transparent", transition: "all 0.15s" }}
                onMouseEnter={e => { if (!on) (e.currentTarget as HTMLElement).style.background = T.skySoft; (e.currentTarget as HTMLElement).style.color = T.navy; }}
                onMouseLeave={e => { if (!on) { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = T.inkSoft; } }}
              >{l.label}</div>
            );
          })}
        </div>

        {/* Right */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div onClick={onSell} style={{ padding: "8px 18px", background: T.navy, borderRadius: "10px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, color: T.yellow, cursor: "pointer", whiteSpace: "nowrap" as const }}>
            + Sell a Card
          </div>
          <div onClick={onNotif} style={{ width: "36px", height: "36px", borderRadius: "50%", background: T.white, border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1C5.8 1 4 2.8 4 5V8L2 10V11H14V10L12 8V5C12 2.8 10.2 1 8 1Z" stroke={T.inkMid} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke={T.inkMid} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ position: "absolute", top: "-1px", right: "-1px", width: "8px", height: "8px", background: T.coral, borderRadius: "50%", border: `2px solid ${T.white}` }} />
          </div>
          <div onClick={onProfile} style={{ width: "36px", height: "36px", borderRadius: "50%", background: T.yellow, border: `2px solid ${T.navy}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "14px", color: T.navy, cursor: "pointer" }}>A</div>
        </div>
      </div>
    </nav>
  );
}

// ─── DESKTOP HOME ─────────────────────────────────────────
function DesktopHome({ onNavigate, onListing, onInfoPage }: {
  onNavigate: (s: Screen) => void;
  onListing: (m: "sell"|"trade") => void;
  onInfoPage: (p: "about"|"help"|"contact") => void;
}) {
  const tcgCards  = ALL_CARDS.filter(c => c.category === "cards");
  const trending  = tcgCards.slice(0, 4);

  return (
    <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `36px clamp(20px,3.5vw,48px)` }}>

      {/* ── HERO ── */}
      <div style={{ background: "linear-gradient(135deg, #FFD740 0%, #FFE878 55%, #FFF5C0 100%)", borderRadius: "20px", padding: "48px 56px", marginBottom: "36px", position: "relative", overflow: "hidden", boxShadow: T.s2 }}>
        <div style={{ position: "absolute", top: "-40px", right: "-30px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.28)" }} />
        <div style={{ position: "absolute", bottom: "-50px", right: "160px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(28,35,64,0.04)" }} />

        <div style={{ maxWidth: "520px", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ background: T.navy, color: T.yellow, fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 700, padding: "4px 12px", borderRadius: "50px" }}>
              🇮🇳 India's First Collector Marketplace
            </div>
            <div onClick={() => onInfoPage("about")} style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: T.navy, opacity: 0.5, cursor: "pointer", textDecoration: "underline" }}>About RareNook</div>
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "36px", fontWeight: 800, color: T.navy, lineHeight: 1.15, marginBottom: "12px" }}>
            Buy, Sell &amp; Trade<br/>Cards Safely in India
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: "rgba(28,35,64,0.6)", lineHeight: 1.7, marginBottom: "24px" }}>
            Real ₹ pricing · Escrow-protected trades · Verified collectors across India
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <div onClick={() => onNavigate("Marketplace")}
              style={{ padding: "12px 26px", background: T.navy, borderRadius: "12px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 700, color: T.yellow, cursor: "pointer", boxShadow: "3px 4px 0 rgba(28,35,64,0.18)", transition: "transform 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
            >Browse Cards</div>
            <div onClick={() => onListing("sell")}
              style={{ padding: "12px 26px", background: "rgba(255,255,255,0.6)", borderRadius: "12px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: T.navy, cursor: "pointer", border: "1.5px solid rgba(28,35,64,0.18)", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)"}
            >Sell a Card</div>
            <div onClick={() => onNavigate("TradeHub")}
              style={{ padding: "12px 26px", background: "transparent", borderRadius: "12px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: T.navy, cursor: "pointer", border: "1.5px solid rgba(28,35,64,0.25)", transition: "background 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.4)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
            >Start Trading</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ position: "absolute", right: "56px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column" as const, gap: "12px", zIndex: 1 }}>
          {[{ val: "2,400+", lbl: "Collectors" }, { val: "₹1.2Cr", lbl: "Traded Safely" }, { val: "99%", lbl: "Escrow Success" }].map(s => (
            <div key={s.lbl} style={{ textAlign: "center" as const, background: "rgba(255,255,255,0.58)", borderRadius: "14px", padding: "12px 20px", backdropFilter: "blur(4px)" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 800, color: T.navy }}>{s.val}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: "rgba(28,35,64,0.6)", fontWeight: 500, marginTop: "2px" }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PLATFORM FEATURES (4 fixed cols) ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "44px" }}>
        {[
          { Icon: IconCart,      label: "Marketplace",  sub: "Buy & sell collectibles at real INR prices",  screen: "Marketplace" as Screen },
          { Icon: IconHandshake, label: "Trade Hub",     sub: "Swap cards collector-to-collector safely",    screen: "TradeHub"    as Screen },
          { Icon: IconPackage,   label: "Escrow",        sub: "Every transaction verified before release",   screen: null                    },
          { Icon: IconChat,      label: "Community",     sub: "Share pulls & discuss market trends",         screen: "Community"   as Screen },
        ].map(f => (
          <div key={f.label}
            onClick={() => f.screen ? onNavigate(f.screen) : onInfoPage("about")}
            style={{ background: T.white, borderRadius: "16px", padding: "20px 18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s2; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s1; }}
          >
            <div style={{ marginBottom: "12px" }}><f.Icon /></div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 700, color: T.ink, marginBottom: "5px" }}>{f.label}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: T.inkSoft, lineHeight: 1.55 }}>{f.sub}</div>
          </div>
        ))}
      </div>

      {/* ── TWO COLUMN: Trending + Movers/Sales ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginBottom: "44px" }}>

        {/* Trending Now */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 800, color: T.ink }}>Trending Now 🔥</div>
            <div onClick={() => onNavigate("Marketplace")} style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: T.lavender, cursor: "pointer" }}>See all ›</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {trending.map(card => (
              <div key={card.id} onClick={() => onNavigate("CardDetail")}
                style={{ background: T.white, borderRadius: "16px", overflow: "hidden", boxShadow: T.s1, border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s2; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s1; }}
              >
                <div style={{ height: "100px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ position: "absolute", top: "7px", left: "9px", fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 600, color: "rgba(28,35,64,0.3)" }}>{card.no}</span>
                  <CardArt artKey={card.art as ArtKey} size={54} />
                </div>
                <div style={{ padding: "10px 11px 12px" }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 700, color: T.ink }}>{card.name}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: T.inkSoft, marginTop: "2px", marginBottom: "5px" }}>{card.set} · {card.lang}</div>
                  <div style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.08)", ...condStyle[card.condType], marginBottom: "5px" }}>{card.cond}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: T.inkSoft, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>Market Value</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 800, color: T.ink }}>{card.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Movers + Sales */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "22px" }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 800, color: T.ink, marginBottom: "14px" }}>Market Movers 📈</div>
            <div style={{ background: T.white, borderRadius: "16px", overflow: "hidden", boxShadow: T.s1, border: `1.5px solid ${T.border}` }}>
              {MOVERS.map((m, i) => (
                <div key={m.id}
                  style={{ display: "flex", alignItems: "center", gap: "13px", padding: "12px 15px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none", cursor: "pointer", transition: "background 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.skySoft}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                >
                  <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CardArt artKey={m.art as ArtKey} size={30} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, color: T.ink }}>{m.name}</div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 800, color: T.ink, marginTop: "2px" }}>{m.price}</div>
                  </div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: m.up ? "#20B870" : T.coral }}>{m.change}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 800, color: T.ink, marginBottom: "14px" }}>Verified Sales ✅</div>
            <div style={{ background: T.white, borderRadius: "16px", overflow: "hidden", boxShadow: T.s1, border: `1.5px solid ${T.border}` }}>
              {SALES.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 15px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: T.ink }}>{s.name}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: T.inkSoft, marginTop: "2px" }}>{s.by}</div>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 800, color: T.ink }}>{s.price}</div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: "#20B870", marginTop: "2px" }}>Verified ✓</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── ALL LISTINGS (4 fixed cols) ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 800, color: T.ink }}>All Listings</div>
        <div onClick={() => onNavigate("Marketplace")} style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: T.lavender, cursor: "pointer" }}>Browse all ›</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "48px" }}>
        {tcgCards.map(card => (
          <div key={card.id} onClick={() => onNavigate("CardDetail")}
            style={{ background: T.white, borderRadius: "18px", overflow: "hidden", boxShadow: T.s1, border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s2; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s1; }}
          >
            <div style={{ height: "120px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ position: "absolute", top: "8px", left: "10px", fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 600, color: "rgba(28,35,64,0.3)" }}>{card.no}</span>
              <CardArt artKey={card.art as ArtKey} size={60} />
            </div>
            <div style={{ padding: "11px 12px 13px" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, color: T.ink, lineHeight: 1.2 }}>{card.name}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: T.inkSoft, marginTop: "2px", marginBottom: "6px" }}>{card.set} · {card.lang} · {card.year}</div>
              <div style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 700, padding: "2px 9px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.08)", ...condStyle[card.condType], marginBottom: "6px" }}>{card.cond}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: T.inkSoft, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>Market Value</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 800, color: T.ink }}>{card.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" as const, gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LogoBall />
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 800, color: T.navy }}>Rare<span style={{ color: T.coral }}>Nook</span></div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", color: T.inkSoft }}>India's Collector Marketplace · Early Access</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {(["about","help","contact"] as const).map(p => (
            <div key={p} onClick={() => onInfoPage(p)}
              style={{ padding: "6px 14px", background: T.white, borderRadius: "50px", border: `1.5px solid ${T.border}`, fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 600, color: T.inkMid, cursor: "pointer" }}
            >{p === "about" ? "About" : p === "help" ? "Help" : "Contact"}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DESKTOP MARKETPLACE (with working search) ────────────
function DesktopMarketplace({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery]         = useState("");
  const [modal, setModal]         = useState<{ title: string; message: string } | null>(null);

  const cats = ["All", "TCG Cards", "One Piece", "Anime", "Graded"];

  function handleCat(cat: string) {
    if (["One Piece","Anime","Graded"].includes(cat)) {
      setModal({ title: "Coming Soon 🚧", message: `${cat} listings are coming very soon to RareNook!` });
      return;
    }
    setActiveCat(cat);
  }

  // Filter by category then search query
  const baseCards = (activeCat === "All" || activeCat === "TCG Cards")
    ? ALL_CARDS.filter(c => c.category === "cards")
    : ALL_CARDS;

  const displayCards = query.trim() === ""
    ? baseCards
    : baseCards.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.set.toLowerCase().includes(query.toLowerCase())  ||
        c.series.toLowerCase().includes(query.toLowerCase()) ||
        c.cond.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div style={{ maxWidth: MAX_W, margin: "0 auto", padding: `36px clamp(20px,3.5vw,48px)` }}>
      {modal && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}

      {/* Header + Search */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px", gap: "16px", flexWrap: "wrap" as const }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "26px", fontWeight: 800, color: T.ink }}>Marketplace</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: T.white, border: `1.5px solid ${T.border}`, borderRadius: "14px", padding: "9px 14px", boxShadow: T.s1, flex: "0 0 auto", width: "280px" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" opacity={0.4}>
            <circle cx="6" cy="6" r="5" stroke={T.ink} strokeWidth="1.5"/>
            <path d="M10 10L13 13" stroke={T.ink} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search cards, sets, grades..."
            style={{ border: "none", outline: "none", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.inkMid, background: "transparent", width: "100%" }}
          />
          {query && (
            <div onClick={() => setQuery("")} style={{ cursor: "pointer", color: T.inkGhost, fontSize: "14px", lineHeight: 1, flexShrink: 0 }}>×</div>
          )}
        </div>
      </div>

      {/* Category chips + count */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "26px", alignItems: "center", flexWrap: "wrap" as const }}>
        {cats.map(cat => {
          const isOn = cat === activeCat;
          return (
            <div key={cat} onClick={() => handleCat(cat)}
              style={{ padding: "7px 18px", borderRadius: "50px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, cursor: "pointer", background: isOn ? T.navy : T.white, color: isOn ? T.yellow : T.inkMid, border: `1.5px solid ${isOn ? T.navy : T.border}`, transition: "all 0.15s" }}
            >{cat}</div>
          );
        })}
        <div style={{ marginLeft: "auto", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600, color: T.inkSoft }}>
          {displayCards.length} result{displayCards.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Card grid — 4 fixed columns */}
      {displayCards.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {displayCards.map(card => (
            <div key={card.id} onClick={() => onNavigate("CardDetail")}
              style={{ background: T.white, borderRadius: "18px", overflow: "hidden", boxShadow: T.s1, border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s2; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s1; }}
            >
              <div style={{ height: "136px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <span style={{ position: "absolute", top: "8px", left: "10px", fontFamily: "'Inter', sans-serif", fontSize: "9px", fontWeight: 600, color: "rgba(28,35,64,0.3)" }}>{card.no}</span>
                <CardArt artKey={card.art as ArtKey} size={66} />
              </div>
              <div style={{ padding: "12px 13px 14px" }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, color: T.ink }}>{card.name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", color: T.inkSoft, marginTop: "2px", marginBottom: "7px" }}>{card.set} · {card.lang} · {card.year}</div>
                <div style={{ display: "inline-block", fontFamily: "'Inter', sans-serif", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.08)", ...condStyle[card.condType], marginBottom: "7px" }}>{card.cond}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "9px", color: T.inkSoft, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>Market Value</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 800, color: T.ink }}>{card.price}</div>
                <div style={{ marginTop: "10px", padding: "9px 0", background: T.navy, borderRadius: "10px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 700, color: T.yellow, textAlign: "center" as const }}>View Listing</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center" as const, padding: "60px 0", color: T.inkSoft }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 700, color: T.inkMid, marginBottom: "6px" }}>No results for "{query}"</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>Try searching for a card name, set, or condition</div>
          <div onClick={() => setQuery("")} style={{ marginTop: "16px", display: "inline-block", padding: "9px 20px", background: T.navy, borderRadius: "10px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, color: T.yellow, cursor: "pointer" }}>Clear search</div>
        </div>
      )}
    </div>
  );
}

// ─── DESKTOP COMING SOON ──────────────────────────────────
function DesktopComingSoon({ title, icon, message, onHome }: {
  title: string; icon: string; message: string; onHome: () => void;
}) {
  return (
    <div style={{ maxWidth: "560px", margin: "80px auto", padding: "0 24px", textAlign: "center" as const }}>
      <div style={{ fontSize: "56px", marginBottom: "18px" }}>{icon}</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "26px", fontWeight: 800, color: T.ink, marginBottom: "10px" }}>{title}</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "15px", color: T.inkSoft, lineHeight: 1.7, marginBottom: "28px" }}>{message}</div>
      <div onClick={onHome} style={{ display: "inline-block", padding: "12px 28px", background: T.navy, borderRadius: "12px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 700, color: T.yellow, cursor: "pointer" }}>← Back to Home</div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────
export default function DesktopLayout({ screen, onNavigate }: {
  screen: Screen;
  onNavigate: (s: Screen) => void;
}) {
  const [showNotifs,  setShowNotifs]  = useState(false);
  const [infoPage,    setInfoPage]    = useState<"about"|"help"|"contact"|null>(null);
  const [showListing, setShowListing] = useState<"sell"|"trade"|null>(null);
  const [modal,       setModal]       = useState<{ title: string; message: string } | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#F0F4F8", fontFamily: "'Inter', sans-serif" }}>
      {showNotifs  && <NotificationsModal onClose={() => setShowNotifs(false)} />}
      {infoPage    && <InfoModal page={infoPage} onClose={() => setInfoPage(null)} onSwitch={p => setInfoPage(p)} />}
      {showListing && <AddListingModal mode={showListing} onClose={() => setShowListing(null)} />}
      {modal       && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}

      <DesktopNav
        screen={screen}
        onNavigate={onNavigate}
        onNotif={() => setShowNotifs(true)}
        onProfile={() => onNavigate("Profile")}
        onSell={() => setShowListing("sell")}
      />

      <main>
        {screen === "Home"        && <DesktopHome onNavigate={onNavigate} onListing={m => setShowListing(m)} onInfoPage={p => setInfoPage(p)} />}
        {screen === "Marketplace" && <DesktopMarketplace onNavigate={onNavigate} />}
        {screen === "CardDetail"  && <DesktopComingSoon title="Card Detail" icon="🃏" message="Full card detail page with market intelligence, seller info, and escrow purchasing is coming for desktop very soon." onHome={() => onNavigate("Marketplace")} />}
        {screen === "TradeHub"    && <DesktopComingSoon title="Trade Hub"   icon="⇄"  message="The full Trade Hub with wishlist matching, escrow trading, and negotiation chat is being optimised for desktop." onHome={() => onNavigate("Home")} />}
        {screen === "TradeOffer"  && <DesktopComingSoon title="Trade Offer" icon="🤝" message="Full trade offer flow with escrow and balance payment is being optimised for desktop." onHome={() => onNavigate("TradeHub")} />}
        {screen === "Community"   && <DesktopComingSoon title="Community"   icon="💬" message="The collector community feed with pull posts, market talk, and reviews is coming to desktop very soon." onHome={() => onNavigate("Home")} />}
        {screen === "Profile"     && <DesktopComingSoon title="Your Profile" icon="👤" message="Full collector profile with listings, wishlist, trust score, and verified trades is coming to desktop." onHome={() => onNavigate("Home")} />}
      </main>
    </div>
  );
}
