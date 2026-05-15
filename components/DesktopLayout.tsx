"use client";

import React, { useState } from "react";
import {
  Screen, T, ALL_CARDS, MOVERS, SALES,
  CardArt, ArtKey, condStyle,
  Modal, NotificationsModal, InfoModal, AddListingModal,
  LogoBall, SectionHeader,
} from "./shared";

// ─── DESKTOP NAV ──────────────────────────────────────────
function DesktopNav({ screen, onNavigate, onNotif, onProfile }: {
  screen: Screen;
  onNavigate: (s: Screen) => void;
  onNotif: () => void;
  onProfile: () => void;
}) {
  const navLinks: { label: string; screen: Screen }[] = [
    { label: "Home",      screen: "Home"        },
    { label: "Marketplace", screen: "Marketplace" },
    { label: "Trade Hub", screen: "TradeHub"    },
    { label: "Community", screen: "Community"   },
  ];

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${T.border}`,
      boxShadow: T.s1,
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", height: "60px", gap: "32px" }}>
        {/* Logo */}
        <div
          onClick={() => onNavigate("Home")}
          style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", flexShrink: 0 }}
        >
          <LogoBall />
          <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "19px", fontWeight: 900, color: T.navy }}>
            Rare<span style={{ color: T.coral }}>Nook</span>
          </span>
          <span style={{ fontSize: "9px", fontWeight: 600, color: T.inkSoft, letterSpacing: "0.06em", textTransform: "uppercase" as const, marginTop: "2px" }}>India</span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: "4px", flex: 1 }}>
          {navLinks.map(l => {
            const isActive = screen === l.screen;
            return (
              <div
                key={l.screen}
                onClick={() => onNavigate(l.screen)}
                style={{
                  padding: "6px 14px", borderRadius: "9px", cursor: "pointer",
                  fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: isActive ? 800 : 600,
                  color: isActive ? T.navy : T.inkSoft,
                  background: isActive ? T.skySoft : "transparent",
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = T.skySoft; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >{l.label}</div>
            );
          })}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div
            onClick={onNotif}
            style={{ width: "36px", height: "36px", borderRadius: "50%", background: T.white, border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1C5.8 1 4 2.8 4 5V8L2 10V11H14V10L12 8V5C12 2.8 10.2 1 8 1Z" stroke={T.inkMid} strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke={T.inkMid} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span style={{ position: "absolute", top: "-1px", right: "-1px", width: "8px", height: "8px", background: T.coral, borderRadius: "50%", border: `2px solid ${T.white}` }} />
          </div>
          <div
            onClick={onProfile}
            style={{ width: "36px", height: "36px", borderRadius: "50%", background: T.yellow, border: `2px solid ${T.navy}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "14px", color: T.navy, cursor: "pointer" }}
          >A</div>
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
  const cards = ALL_CARDS.filter(c => c.category === "cards");
  const trending = cards.slice(0, 4);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 32px" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #FFD740 0%, #FFE878 60%, #FFF5C0 100%)", borderRadius: "24px", padding: "48px 56px", marginBottom: "40px", position: "relative", overflow: "hidden", boxShadow: T.s2 }}>
        <div style={{ position: "absolute", top: "-40px", right: "-30px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.3)" }} />
        <div style={{ position: "absolute", bottom: "-50px", right: "120px", width: "130px", height: "130px", borderRadius: "50%", background: "rgba(28,35,64,0.04)" }} />
        <div style={{ maxWidth: "560px", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <div style={{ display: "inline-block", background: T.navy, color: T.yellow, fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, padding: "4px 12px", borderRadius: "50px" }}>
              🇮🇳 India's First Collector Marketplace
            </div>
            <div onClick={() => onInfoPage("about")} style={{ fontSize: "11px", fontWeight: 700, color: T.navy, opacity: 0.55, cursor: "pointer", textDecoration: "underline", fontFamily: "Nunito, sans-serif" }}>About RareNook</div>
          </div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "38px", fontWeight: 900, color: T.navy, lineHeight: 1.15, marginBottom: "14px" }}>
            Buy, Sell &amp; Trade<br/>Cards Safely in India
          </div>
          <div style={{ fontSize: "15px", color: "rgba(28,35,64,0.6)", lineHeight: 1.7, marginBottom: "28px" }}>
            Real ₹ pricing · Escrow-protected trades · Verified collectors across India
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div onClick={() => onNavigate("Marketplace")} style={{ padding: "13px 28px", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, cursor: "pointer", boxShadow: "3px 4px 0 rgba(28,35,64,0.2)", transition: "transform 0.15s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}>Browse Cards</div>
            <div onClick={() => onListing("sell")} style={{ padding: "13px 28px", background: "rgba(255,255,255,0.6)", borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 700, color: T.navy, cursor: "pointer", border: "1.5px solid rgba(28,35,64,0.18)", transition: "background 0.15s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.85)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.6)"}>Sell a Card</div>
            <div onClick={() => onNavigate("TradeHub")} style={{ padding: "13px 28px", background: "transparent", borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 700, color: T.navy, cursor: "pointer", border: "1.5px solid rgba(28,35,64,0.25)", transition: "background 0.15s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.4)"} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>Start Trading</div>
          </div>
        </div>

        {/* Stats — right side */}
        <div style={{ position: "absolute", right: "56px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column" as const, gap: "16px" }}>
          {[
            { val: "2,400+", lbl: "Collectors" },
            { val: "₹1.2Cr", lbl: "Traded Safely" },
            { val: "99%",    lbl: "Escrow Success" },
          ].map(s => (
            <div key={s.lbl} style={{ textAlign: "center" as const, background: "rgba(255,255,255,0.55)", borderRadius: "14px", padding: "12px 20px", backdropFilter: "blur(4px)" }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "22px", fontWeight: 900, color: T.navy }}>{s.val}</div>
              <div style={{ fontSize: "10px", color: "rgba(28,35,64,0.6)", fontWeight: 600, marginTop: "2px" }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Platform features */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "48px" }}>
        {[
          { icon: "🛍", label: "Marketplace",     sub: "Buy & sell collectibles at real INR prices",  screen: "Marketplace" as Screen },
          { icon: "⇄",  label: "Trade Hub",        sub: "Swap cards collector-to-collector safely",    screen: "TradeHub"    as Screen },
          { icon: "🔒", label: "Escrow",           sub: "Every transaction verified before release",   screen: null                    },
          { icon: "💬", label: "Community",        sub: "Share pulls & discuss market trends",         screen: "Community"   as Screen },
        ].map(f => (
          <div key={f.label} onClick={() => f.screen ? onNavigate(f.screen) : onInfoPage("about")} style={{ background: T.white, borderRadius: "18px", padding: "20px 18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s2; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s1; }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", marginBottom: "12px" }}>{f.icon}</div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.ink, marginBottom: "5px" }}>{f.label}</div>
            <div style={{ fontSize: "12px", color: T.inkSoft, lineHeight: 1.55 }}>{f.sub}</div>
          </div>
        ))}
      </div>

      {/* Two-column: Trending + Market Movers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", marginBottom: "48px" }}>

        {/* Trending Now */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 900, color: T.ink }}>Trending Now 🔥</div>
            <div onClick={() => onNavigate("Marketplace")} style={{ fontSize: "13px", fontWeight: 700, color: T.lavender, cursor: "pointer" }}>See all ›</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {trending.map(card => (
              <div key={card.id} onClick={() => onNavigate("CardDetail")} style={{ background: T.white, borderRadius: "18px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s2; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s1; }}>
                <div style={{ height: "100px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ position: "absolute", top: "7px", left: "9px", fontSize: "9px", fontWeight: 700, color: "rgba(28,35,64,0.3)", fontFamily: "Nunito, sans-serif" }}>{card.no}</span>
                  <CardArt artKey={card.art as ArtKey} size={56} />
                </div>
                <div style={{ padding: "10px 11px 12px" }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 900, color: T.ink }}>{card.name}</div>
                  <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px", marginBottom: "5px" }}>{card.set} · {card.lang}</div>
                  <div style={{ display: "inline-block", fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "2px 8px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.08)", ...condStyle[card.condType], marginBottom: "5px" }}>{card.cond}</div>
                  <div style={{ fontSize: "9px", color: T.inkSoft, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>Market Value</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 900, color: T.ink }}>{card.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Market Movers + Verified Sales */}
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "24px" }}>
          {/* Market Movers */}
          <div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 900, color: T.ink, marginBottom: "14px" }}>Market Movers 📈</div>
            <div style={{ background: T.white, borderRadius: "18px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}` }}>
              {MOVERS.map((m, i) => (
                <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "14px", padding: "13px 16px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none", cursor: "pointer", transition: "background 0.15s" }} onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.skySoft} onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <CardArt artKey={m.art as ArtKey} size={32} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 800, color: T.ink }}>{m.name}</div>
                    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.ink, marginTop: "2px" }}>{m.price}</div>
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: m.up ? "#20B870" : T.coral }}>{m.change}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Sales */}
          <div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 900, color: T.ink, marginBottom: "14px" }}>Verified Sales ✅</div>
            <div style={{ background: T.white, borderRadius: "18px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}` }}>
              {SALES.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: T.ink }}>{s.name}</div>
                    <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "2px" }}>{s.by}</div>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.ink }}>{s.price}</div>
                    <div style={{ fontSize: "11px", fontWeight: 700, color: "#20B870", marginTop: "2px" }}>Verified ✓</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full marketplace grid preview */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 900, color: T.ink }}>All Listings</div>
        <div onClick={() => onNavigate("Marketplace")} style={{ fontSize: "13px", fontWeight: 700, color: T.lavender, cursor: "pointer" }}>Browse all ›</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "48px" }}>
        {ALL_CARDS.filter(c => c.category === "cards").map(card => (
          <div key={card.id} onClick={() => onNavigate("CardDetail")} style={{ background: T.white, borderRadius: "18px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s2; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s1; }}>
            <div style={{ height: "120px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ position: "absolute", top: "8px", left: "10px", fontSize: "9px", fontWeight: 700, color: "rgba(28,35,64,0.3)", fontFamily: "Nunito, sans-serif" }}>{card.no}</span>
              <CardArt artKey={card.art as ArtKey} size={62} />
            </div>
            <div style={{ padding: "11px 12px 13px" }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, lineHeight: 1.2 }}>{card.name}</div>
              <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px", marginBottom: "6px" }}>{card.set} · {card.lang} · {card.year}</div>
              <div style={{ display: "inline-block", fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "2px 9px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.08)", ...condStyle[card.condType], marginBottom: "6px" }}>{card.cond}</div>
              <div style={{ fontSize: "9px", color: T.inkSoft, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>Market Value</div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink }}>{card.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <LogoBall />
          <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 900, color: T.navy }}>Rare<span style={{ color: T.coral }}>Nook</span></span>
          <span style={{ fontSize: "10px", color: T.inkSoft }}>India's Collector Marketplace · Early Access</span>
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {(["about","help","contact"] as const).map(p => (
            <div key={p} onClick={() => onInfoPage(p)} style={{ padding: "6px 14px", background: T.white, borderRadius: "50px", border: `1.5px solid ${T.border}`, fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 700, color: T.inkMid, cursor: "pointer" }}>
              {p === "about" ? "About" : p === "help" ? "Help" : "Contact"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DESKTOP MARKETPLACE ──────────────────────────────────
function DesktopMarketplace({ onNavigate }: { onNavigate: (s: Screen) => void }) {
  const [activeCat, setActiveCat] = useState("All");
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

  const cats = ["All", "TCG Cards", "One Piece", "Anime", "Graded"];

  function handleCat(cat: string) {
    if (["One Piece","Anime","Graded"].includes(cat)) {
      setModal({ title: "Coming Soon 🚧", message: `${cat} listings are coming very soon to RareNook!` });
      return;
    }
    setActiveCat(cat);
  }

  const cards = ALL_CARDS.filter(c => c.category === "cards");

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 32px" }}>
      {modal && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "28px", fontWeight: 900, color: T.ink }}>Marketplace</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: T.white, border: `1.5px solid ${T.border}`, borderRadius: "14px", padding: "8px 14px", boxShadow: T.s1 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" opacity={0.4}><circle cx="6" cy="6" r="5" stroke={T.ink} strokeWidth="1.5"/><path d="M10 10L13 13" stroke={T.ink} strokeWidth="1.5" strokeLinecap="round"/></svg>
          <input placeholder="Search cards, sets, sellers..." style={{ border: "none", outline: "none", fontFamily: "Nunito Sans, sans-serif", fontSize: "14px", color: T.inkMid, background: "transparent", width: "260px" }} />
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
        {cats.map(cat => {
          const isOn = cat === activeCat;
          return (
            <div key={cat} onClick={() => handleCat(cat)} style={{ padding: "7px 18px", borderRadius: "50px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, cursor: "pointer", background: isOn ? T.navy : T.white, color: isOn ? T.yellow : T.inkMid, border: `1.5px solid ${isOn ? T.navy : T.border}`, transition: "all 0.15s" }}>{cat}</div>
          );
        })}
        <div style={{ marginLeft: "auto", padding: "7px 18px", borderRadius: "50px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.lavender, cursor: "pointer", border: `1.5px solid ${T.border}`, background: T.white }}>
          {cards.length} results · Highest Price ▾
        </div>
      </div>

      {/* 4-col grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {cards.map(card => (
          <div key={card.id} onClick={() => onNavigate("CardDetail")} style={{ background: T.white, borderRadius: "20px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s2; }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s1; }}>
            <div style={{ height: "140px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <span style={{ position: "absolute", top: "8px", left: "10px", fontSize: "9px", fontWeight: 700, color: "rgba(28,35,64,0.3)", fontFamily: "Nunito, sans-serif" }}>{card.no}</span>
              <CardArt artKey={card.art as ArtKey} size={68} />
            </div>
            <div style={{ padding: "12px 14px 14px" }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink }}>{card.name}</div>
              <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "2px", marginBottom: "7px" }}>{card.set} · {card.lang} · {card.year}</div>
              <div style={{ display: "inline-block", fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "3px 10px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.08)", ...condStyle[card.condType], marginBottom: "7px" }}>{card.cond}</div>
              <div style={{ fontSize: "9px", color: T.inkSoft, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.04em" }}>Market Value</div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "17px", fontWeight: 900, color: T.ink }}>{card.price}</div>
              <div style={{ marginTop: "10px", padding: "9px 0", background: T.navy, borderRadius: "10px", fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>View Listing</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DESKTOP COMING SOON SCREEN ───────────────────────────
function DesktopComingSoon({ title, icon, message, onHome }: {
  title: string; icon: string; message: string; onHome: () => void;
}) {
  return (
    <div style={{ maxWidth: "600px", margin: "80px auto", padding: "0 32px", textAlign: "center" as const }}>
      <div style={{ fontSize: "64px", marginBottom: "20px" }}>{icon}</div>
      <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "28px", fontWeight: 900, color: T.ink, marginBottom: "12px" }}>{title}</div>
      <div style={{ fontSize: "15px", color: T.inkSoft, lineHeight: 1.7, marginBottom: "32px" }}>{message}</div>
      <div onClick={onHome} style={{ display: "inline-block", padding: "13px 32px", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, cursor: "pointer" }}>← Back to Home</div>
    </div>
  );
}

// ─── MAIN DESKTOP LAYOUT ─────────────────────────────────
export default function DesktopLayout({ screen, onNavigate }: {
  screen: Screen;
  onNavigate: (s: Screen) => void;
}) {
  const [showNotifs, setShowNotifs]   = useState(false);
  const [infoPage, setInfoPage]       = useState<"about"|"help"|"contact"|null>(null);
  const [showListing, setShowListing] = useState<"sell"|"trade"|null>(null);
  const [modal, setModal]             = useState<{ title: string; message: string } | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#EEF3F7", fontFamily: "Nunito Sans, sans-serif" }}>
      {/* Global modals */}
      {showNotifs  && <NotificationsModal onClose={() => setShowNotifs(false)} />}
      {infoPage    && <InfoModal page={infoPage} onClose={() => setInfoPage(null)} onSwitch={p => setInfoPage(p)} />}
      {showListing && <AddListingModal mode={showListing} onClose={() => setShowListing(null)} />}
      {modal       && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}

      <DesktopNav
        screen={screen}
        onNavigate={onNavigate}
        onNotif={() => setShowNotifs(true)}
        onProfile={() => onNavigate("Profile")}
      />

      <main>
        {screen === "Home" && (
          <DesktopHome
            onNavigate={onNavigate}
            onListing={m => setShowListing(m)}
            onInfoPage={p => setInfoPage(p)}
          />
        )}
        {screen === "Marketplace" && <DesktopMarketplace onNavigate={onNavigate} />}
        {screen === "CardDetail" && (
          <DesktopComingSoon title="Card Detail" icon="🃏" message="Full card detail page with market intelligence, seller info, and escrow purchasing is coming for desktop very soon." onHome={() => onNavigate("Marketplace")} />
        )}
        {screen === "TradeHub" && (
          <DesktopComingSoon title="Trade Hub" icon="⇄" message="The full Trade Hub with wishlist matching, escrow trading, and negotiation chat is being optimised for desktop." onHome={() => onNavigate("Home")} />
        )}
        {screen === "TradeOffer" && (
          <DesktopComingSoon title="Trade Offer" icon="🤝" message="Full trade offer flow with escrow and balance payment is being optimised for desktop." onHome={() => onNavigate("TradeHub")} />
        )}
        {screen === "Community" && (
          <DesktopComingSoon title="Community" icon="💬" message="The collector community feed with pull posts, market talk, and reviews is coming to desktop very soon." onHome={() => onNavigate("Home")} />
        )}
        {screen === "Profile" && (
          <DesktopComingSoon title="Your Profile" icon="👤" message="Full collector profile with listings, wishlist, trust score, and verified trades is coming to desktop." onHome={() => onNavigate("Home")} />
        )}
      </main>
    </div>
  );
}
