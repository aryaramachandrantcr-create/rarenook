"use client";

import { useState } from "react";
import {
  Screen, NavProps, T, ALL_CARDS, MOVERS, SALES,
  CardArt, CardInfoBlock, ArtKey,
  Modal, NotificationsModal, InfoModal, AddListingModal,
  StatusBar, LogoBall, PhoneShell, SectionHeader, SearchBar, BottomNav,
} from "./shared";

// ─── CATEGORY CONFIG ──────────────────────────────────────
type CatConfig = {
  label: string;
  live: boolean;
  comingSoon?: string;
};

const CATEGORIES: CatConfig[] = [
  { label: "All",                live: true  },
  { label: "TCG Cards",          live: true  },
  { label: "One Piece",          live: false, comingSoon: "One Piece TCG card listings are coming very soon. Collectors across India are already signing up!" },
  { label: "Anime",              live: false, comingSoon: "Anime collectibles — figures, art cards, and limited editions — are coming to RareNook soon." },
  { label: "Graded",             live: false, comingSoon: "Graded card listings (PSA, BGS, CGC slabs) are coming in the next update." },
  { label: "Supplies",           live: false, comingSoon: "Card sleeves, binders, deck boxes, and storage supplies are coming to RareNook soon." },
  { label: "Other Collectibles", live: false, comingSoon: "Board game promos, pins, and rare collectibles will be listed here soon." },
];

// ─── PLATFORM FEATURE TILES ───────────────────────────────
const PLATFORM_FEATURES = [
  { icon: "🛍", label: "Marketplace",    sub: "Buy & sell cards",     bg: "#E4F4FB", screen: "Marketplace" as Screen },
  { icon: "⇄",  label: "Trade Hub",      sub: "Swap with collectors", bg: "#F3F1FF", screen: "TradeHub"    as Screen },
  { icon: "🔒", label: "Escrow",         sub: "Safe & verified",      bg: "#EDFBF4", screen: null                    },
  { icon: "💬", label: "Community",      sub: "Collector feed",       bg: "#FFF5C0", screen: "Community"   as Screen },
];

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function HomeScreen({ onNavigate }: NavProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modal, setModal]             = useState<{ title: string; message: string } | null>(null);
  const [showNotifs, setShowNotifs]   = useState(false);
  const [infoPage, setInfoPage]       = useState<"about"|"help"|"contact"|null>(null);
  const [showListing, setShowListing] = useState<"sell"|"trade"|null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);

  function handleCategoryClick(cat: CatConfig) {
    if (!cat.live) {
      setModal({ title: "Coming Soon 🚧", message: cat.comingSoon ?? "This category is coming soon!" });
      return;
    }
    setActiveCategory(cat.label);
  }

  function handleCardClick(cardId: number) {
    const card = ALL_CARDS.find(c => c.id === cardId);
    if (!card) return;
    if (card.real) { onNavigate("CardDetail"); return; }
    setModal({ title: "Not Listed Yet 📋", message: `${card.name} isn't available yet. Add it to your wishlist and we'll notify you when a seller lists it.` });
  }

  function handleMoverClick(moverId: number) {
    const mover = MOVERS.find(m => m.id === moverId);
    if (!mover) return;
    if (mover.category === "onepiece") {
      setModal({ title: "Coming Soon 🚧", message: "One Piece card listings are coming very soon to RareNook!" });
    } else {
      setModal({ title: "Not Listed Yet 📋", message: `${mover.name} isn't available yet. Check back soon or set a wishlist alert.` });
    }
  }

  const trendingCards = ALL_CARDS.filter(c => c.category === "cards").slice(0, 4);

  return (
    <>
      {modal      && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}
      {showNotifs && <NotificationsModal onClose={() => setShowNotifs(false)} />}
      {infoPage   && <InfoModal page={infoPage} onClose={() => setInfoPage(null)} onSwitch={p => setInfoPage(p)} />}
      {showListing && <AddListingModal mode={showListing} onClose={() => setShowListing(null)} />}

      <PhoneShell>
        <StatusBar />

        {/* ── Top Nav ── */}
        <div style={{ background: T.sky, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 18px 12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", fontFamily: "Nunito, sans-serif", fontSize: "21px", fontWeight: 900, color: T.navy }}>
              <LogoBall />
              Rare<span style={{ color: T.coral }}>Nook</span>
            </div>
            <div style={{ fontSize: "9px", fontWeight: 600, color: T.inkSoft, letterSpacing: "0.06em", textTransform: "uppercase" as const, marginTop: "2px" }}>
              India's Collector Marketplace
            </div>
          </div>
          <div style={{ display: "flex", gap: "7px" }}>
            {/* Bell */}
            <div
              onClick={() => setShowNotifs(true)}
              style={{ width: "36px", height: "36px", borderRadius: "50%", background: T.white, border: `2px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C5.8 1 4 2.8 4 5V8L2 10V11H14V10L12 8V5C12 2.8 10.2 1 8 1Z" stroke={T.inkMid} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke={T.inkMid} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ position: "absolute", top: "-1px", right: "-1px", width: "10px", height: "10px", background: T.coral, borderRadius: "50%", border: `2px solid ${T.sky}` }} />
            </div>
            {/* Avatar → Profile */}
            <div
              onClick={() => onNavigate("Profile")}
              style={{ width: "36px", height: "36px", borderRadius: "50%", background: T.yellow, border: `2.5px solid ${T.navy}`, boxShadow: `2px 2px 0 ${T.navy}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "14px", color: T.navy, cursor: "pointer" }}
            >A</div>
          </div>
        </div>

        {/* ── Scroll area ── */}
        <div style={{ maxHeight: "636px", overflowY: "auto", overflowX: "hidden" }}>

          <SearchBar placeholder="Search cards, sets, sellers..." />

          {/* ── HERO / ONBOARDING SECTION ── */}
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "22px", boxShadow: T.s2, border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
            {/* Colour band */}
            <div style={{ background: `linear-gradient(135deg, ${T.navy} 0%, #2E3A5C 100%)`, padding: "18px 18px 16px", position: "relative", overflow: "hidden" }}>
              {/* Decorative circles */}
              <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(255,215,64,0.12)" }} />
              <div style={{ position: "absolute", bottom: "-30px", right: "30px",  width: "60px", height: "60px", borderRadius: "50%", background: "rgba(200,233,247,0.08)" }} />

              <div style={{ display: "inline-block", background: T.yellow, color: T.navy, fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "3px 10px", borderRadius: "50px", marginBottom: "9px" }}>
                🇮🇳 India's First Collector Marketplace
              </div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "19px", fontWeight: 900, color: T.white, lineHeight: 1.25, marginBottom: "7px" }}>
                Buy, Sell &amp; Trade<br/>Cards Safely in India
              </div>
              <div style={{ fontSize: "12px", color: "rgba(200,233,247,0.8)", lineHeight: 1.65, marginBottom: "14px" }}>
                Real ₹ pricing · Escrow-protected trades · Verified collectors
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <div
                  onClick={() => onNavigate("Marketplace")}
                  style={{ flex: 1, padding: "10px 0", background: T.yellow, borderRadius: "12px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.navy, textAlign: "center" as const, cursor: "pointer" }}
                >Browse Cards</div>
                <div
                  onClick={() => setShowListing("sell")}
                  style={{ flex: 1, padding: "10px 0", background: "rgba(255,255,255,0.12)", borderRadius: "12px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.white, textAlign: "center" as const, cursor: "pointer", border: "1.5px solid rgba(255,255,255,0.25)" }}
                >Sell a Card</div>
              </div>
            </div>

            {/* Trust stats row */}
            <div style={{ display: "flex", borderTop: `1px solid ${T.border}` }}>
              {[
                { val: "2,400+", lbl: "Collectors" },
                { val: "₹1.2Cr", lbl: "Traded safely" },
                { val: "99%",    lbl: "Escrow success" },
              ].map((s, i) => (
                <div key={`stat-${i}`} style={{ flex: 1, padding: "10px 0", textAlign: "center" as const, borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.ink }}>{s.val}</div>
                  <div style={{ fontSize: "9px", color: T.inkSoft, marginTop: "1px", fontWeight: 600 }}>{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Platform feature tiles ── */}
          <SectionHeader title="What is RareNook?" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px", padding: "0 16px 16px" }}>
            {PLATFORM_FEATURES.map(f => (
              <div
                key={`feat-${f.label}`}
                onClick={() => f.screen ? onNavigate(f.screen) : setModal({ title: "Escrow Protection 🔒", message: "Every RareNook trade is escrow-protected. You pay us → seller ships to our verification centre → we check the card → we ship to you → seller gets paid. No scams. No disputes." })}
                style={{ background: T.white, borderRadius: "16px", padding: "14px 13px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: f.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", marginBottom: "8px" }}>{f.icon}</div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 900, color: T.ink }}>{f.label}</div>
                <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px" }}>{f.sub}</div>
              </div>
            ))}
          </div>

          {/* ── "What is RareNook?" onboarding card ── */}
          {showOnboarding && (
            <div style={{ margin: "0 16px 14px", background: T.white, borderRadius: "18px", border: `1.5px solid ${T.border}`, boxShadow: T.s1, overflow: "hidden" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>🃏</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink }}>New to RareNook?</div>
                </div>
                <div onClick={() => setShowOnboarding(false)} style={{ fontSize: "16px", color: T.inkGhost, cursor: "pointer", padding: "2px 4px", lineHeight: 1 }}>×</div>
              </div>
              <div style={{ padding: "0 14px 13px", display: "flex", flexDirection: "column" as const, gap: "8px" }}>
                {[
                  { icon: "🛍", text: "Browse & buy TCG cards at real Indian ₹ prices" },
                  { icon: "⇄",  text: "Trade collector-to-collector safely across India" },
                  { icon: "🔒", text: "Every transaction protected by RareNook Escrow" },
                  { icon: "💬", text: "Join a community of verified Indian collectors" },
                ].map((item, i) => (
                  <div key={`ob-${i}`} style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                    <div style={{ width: "24px", height: "24px", borderRadius: "7px", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ fontSize: "11px", color: T.inkMid, lineHeight: 1.45 }}>{item.text}</div>
                  </div>
                ))}
                <div
                  onClick={() => { setInfoPage("about"); setShowOnboarding(false); }}
                  style={{ marginTop: "4px", fontSize: "11px", fontWeight: 700, color: T.lavender, cursor: "pointer" }}
                >Learn more about RareNook →</div>
              </div>
            </div>
          )}

          {/* ── Category chips ── */}
          <div style={{ display: "flex", gap: "7px", padding: "0 16px 15px", overflowX: "auto" }}>
            {CATEGORIES.map(cat => {
              const isOn = cat.label === activeCategory;
              return (
                <div
                  key={`cat-${cat.label}`}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    flexShrink: 0, padding: "6px 15px", borderRadius: "50px",
                    fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700,
                    cursor: "pointer", whiteSpace: "nowrap" as const,
                    background: isOn ? T.navy : T.white,
                    color: isOn ? T.yellow : cat.live ? T.inkMid : T.inkSoft,
                    border: `1.5px solid ${isOn ? T.navy : T.border}`,
                    boxShadow: isOn ? "none" : T.s1,
                    transition: "all 0.15s",
                    display: "flex", alignItems: "center", gap: "4px",
                  }}
                >
                  {cat.label}
                  {!cat.live && <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: isOn ? "rgba(255,215,64,0.5)" : T.inkGhost }} />}
                </div>
              );
            })}
          </div>

          {/* ── Wallet card ── */}
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "22px", boxShadow: T.s2, padding: "14px 16px", border: `1.5px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "-18px", right: "-10px", width: "80px", height: "80px", borderRadius: "50%", background: "#FFF5C0", border: "5px solid #FFE680" }} />
            <div style={{ fontSize: "11px", fontWeight: 600, color: T.inkSoft }}>Portfolio value</div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "26px", fontWeight: 900, color: T.ink, lineHeight: 1.1, margin: "4px 0" }}>₹24,500</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: T.mint }}>↑ 12% this week</div>
          </div>

          {/* ── Trending Now ── */}
          <SectionHeader title="Trending Now 🔥" link="See all ›" onLink={() => onNavigate("Marketplace")} />
          <div style={{ display: "flex", gap: "10px", padding: "0 16px 16px", overflowX: "auto" }}>
            {trendingCards.map(card => (
              <div
                key={`trending-${card.id}`}
                onClick={() => handleCardClick(card.id)}
                style={{ flexShrink: 0, width: "120px", background: T.white, borderRadius: "18px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s2; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = T.s1; }}
              >
                {/* Card art */}
                <div style={{ height: "92px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ position: "absolute", top: "6px", left: "8px", fontSize: "8px", fontWeight: 700, color: "rgba(28,35,64,0.3)", fontFamily: "Nunito, sans-serif" }}>{card.no}</span>
                  <CardArt artKey={card.art as ArtKey} size={52} />
                </div>
                <div style={{ padding: "8px 9px 10px" }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 900, color: T.ink, lineHeight: 1.2 }}>{card.name}</div>
                  <div style={{ fontSize: "9px", color: T.inkSoft, marginTop: "2px" }}>{card.set} · {card.lang}</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, marginTop: "5px" }}>{card.price}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Market Movers ── */}
          <SectionHeader title="Market Movers 📈" link="See all ›" onLink={() => onNavigate("Marketplace")} />
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "22px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}` }}>
            {MOVERS.map((m, i) => (
              <div
                key={`mover-${m.id}`}
                onClick={() => handleMoverClick(m.id)}
                style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 13px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.skySoft}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "11px", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `1.5px solid ${T.border}` }}>
                  <CardArt artKey={m.art as ArtKey} size={32} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{m.name}</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, marginTop: "2px" }}>{m.price}</div>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: m.up ? T.mint : T.coral }}>{m.change}</div>
              </div>
            ))}
          </div>

          {/* ── Verified Sales ── */}
          <SectionHeader title="Verified Sales ✅" link="See all ›" />
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "22px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}` }}>
            {SALES.map((s, i) => (
              <div key={`sale-${i}`} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 13px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: T.ink }}>{s.name}</div>
                  <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "1px" }}>{s.by}</div>
                </div>
                <div style={{ textAlign: "right" as const }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink }}>{s.price}</div>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: T.mint, marginTop: "2px" }}>Verified ✓</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Footer links ── */}
          <div style={{ margin: "0 16px 20px", display: "flex", justifyContent: "center", gap: "6px", flexWrap: "wrap" as const }}>
            {(["about","help","contact"] as const).map(p => (
              <div
                key={`footer-${p}`}
                onClick={() => setInfoPage(p)}
                style={{ padding: "6px 14px", background: T.white, borderRadius: "50px", border: `1.5px solid ${T.border}`, fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 700, color: T.inkMid, cursor: "pointer", boxShadow: T.s1, textTransform: "capitalize" as const }}
              >
                {p === "about" ? "About RareNook" : p === "help" ? "Help & Support" : "Contact Us"}
              </div>
            ))}
          </div>

        </div>{/* end scroll */}

        <BottomNav active="Home" onNavigate={onNavigate} />
      </PhoneShell>
    </>
  );
}
