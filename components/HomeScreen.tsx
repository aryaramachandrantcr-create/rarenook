"use client";

import { useState } from "react";
import {
  Screen, NavProps, T, condStyle, ALL_CARDS, MOVERS, SALES,
  Modal, StatusBar, LogoBall, PhoneShell, SectionHeader, SearchBar, BottomNav,
} from "./shared";

const CATEGORIES = ["All", "Pokémon", "One Piece", "Anime", "Graded"];

export default function HomeScreen({ onNavigate }: NavProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

  function handleCategoryClick(cat: string) {
    if (cat === "One Piece" || cat === "Anime") {
      setModal({
        title: "Coming Soon 🚧",
        message: `${cat} cards are being added to RareNook. Stay tuned — we'll notify you when they're live!`,
      });
      return;
    }
    if (cat === "Graded") {
      setModal({
        title: "Coming Soon 🚧",
        message: "Graded card listings are coming very soon. PSA, BGS and CGC slabs will all be supported.",
      });
      return;
    }
    setActiveCategory(cat);
  }

  function handleCardClick(cardId: number) {
    const card = ALL_CARDS.find(c => c.id === cardId);
    if (!card) return;
    if (card.real) {
      onNavigate("CardDetail");
    } else {
      setModal({
        title: "Not Listed Yet",
        message: `${card.name} is not available for sale yet. Check back soon or set a wishlist alert.`,
      });
    }
  }

  function handleMoverClick(moverId: number) {
    const mover = MOVERS.find(m => m.id === moverId);
    if (!mover) return;
    if (mover.category === "onepiece") {
      setModal({
        title: "Coming Soon 🚧",
        message: "One Piece card listings are coming very soon to RareNook!",
      });
    } else {
      setModal({
        title: "Not Listed Yet",
        message: `${mover.name} is not available for sale yet. Check back soon.`,
      });
    }
  }

  const trendingCards = ALL_CARDS.filter(c => c.category === "pokemon").slice(0, 4);

  return (
    <>
      {modal && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}
      <PhoneShell>
        <StatusBar />

        {/* Top Nav */}
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
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: T.white, border: `2px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1C5.8 1 4 2.8 4 5V8L2 10V11H14V10L12 8V5C12 2.8 10.2 1 8 1Z" stroke={T.inkMid} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke={T.inkMid} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{ position: "absolute", top: "-1px", right: "-1px", width: "10px", height: "10px", background: T.coral, borderRadius: "50%", border: `2px solid ${T.sky}` }} />
            </div>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: T.yellow, border: `2.5px solid ${T.navy}`, boxShadow: `2px 2px 0 ${T.navy}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontWeight: 900, fontSize: "14px", color: T.navy, cursor: "pointer" }}>
              A
            </div>
          </div>
        </div>

        {/* Scroll area */}
        <div style={{ maxHeight: "636px", overflowY: "auto", overflowX: "hidden" }}>

          <SearchBar placeholder="Search cards, sets, sellers..." />

          {/* Category chips */}
          <div style={{ display: "flex", gap: "7px", padding: "0 16px 15px", overflowX: "auto" }}>
            {CATEGORIES.map((cat) => {
              const isOn = cat === activeCategory;
              return (
                <div
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    flexShrink: 0, padding: "6px 15px", borderRadius: "50px",
                    fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700,
                    cursor: "pointer", whiteSpace: "nowrap" as const,
                    background: isOn ? T.navy : T.white,
                    color: isOn ? T.yellow : T.inkMid,
                    border: `1.5px solid ${isOn ? T.navy : T.border}`,
                    boxShadow: isOn ? "none" : T.s1,
                    transition: "all 0.15s",
                  }}
                >{cat}</div>
              );
            })}
          </div>

          {/* Wallet card */}
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "24px", boxShadow: T.s2, padding: "16px", border: `1.5px solid ${T.border}`, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", bottom: "-20px", right: "-12px", width: "90px", height: "90px", borderRadius: "50%", background: "#FFF5C0", border: "6px solid #FFE680" }} />
            <div style={{ fontSize: "11px", fontWeight: 600, color: T.inkSoft }}>Welcome back, Trainer! ✦</div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "28px", fontWeight: 900, color: T.ink, lineHeight: 1.1, margin: "4px 0" }}>₹24,500</div>
            <div style={{ fontSize: "12px", fontWeight: 700, color: T.mint }}>↑ 12% this week</div>
          </div>

          {/* Trending Now */}
          <SectionHeader title="Trending Now 🔥" link="See all ›" onLink={() => onNavigate("Marketplace")} />
          <div style={{ display: "flex", gap: "10px", padding: "0 16px 16px", overflowX: "auto" }}>
            {trendingCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                style={{
                  flexShrink: 0, width: "110px", background: T.white,
                  borderRadius: "18px", boxShadow: T.s1, overflow: "hidden",
                  border: `1.5px solid ${T.border}`, cursor: "pointer",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = T.s2;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = T.s1;
                }}
              >
                <div style={{ height: "90px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "50px", position: "relative" }}>
                  <span style={{ position: "absolute", top: "6px", left: "8px", fontSize: "8px", fontWeight: 700, color: "rgba(28,35,64,0.3)", fontFamily: "Nunito, sans-serif" }}>{card.no}</span>
                  🃏
                </div>
                <div style={{ padding: "8px 9px 10px" }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 900, color: T.ink, lineHeight: 1.2 }}>{card.name}</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, marginTop: "4px" }}>{card.price}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Market Movers */}
          <SectionHeader title="Market Movers 📈" link="See all ›" onLink={() => onNavigate("Marketplace")} />
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "24px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}` }}>
            {MOVERS.map((m, i) => (
              <div
                key={m.id}
                onClick={() => handleMoverClick(m.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "11px",
                  padding: "11px 13px",
                  borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none",
                  cursor: "pointer",
                  transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.skySoft}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0, border: `1.5px solid ${T.border}` }}>🃏</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{m.name}</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, marginTop: "2px" }}>{m.price}</div>
                </div>
                <div style={{ fontSize: "12px", fontWeight: 700, color: m.up ? T.mint : T.coral }}>{m.change}</div>
              </div>
            ))}
          </div>

          {/* Verified Sales */}
          <SectionHeader title="Verified Sales ✅" link="See all ›" />
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "24px", boxShadow: T.s1, overflow: "hidden", border: `1.5px solid ${T.border}` }}>
            {SALES.map((s, i) => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 13px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none" }}>
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

          <div style={{ height: "14px" }} />
        </div>

        <BottomNav active="Home" onNavigate={onNavigate} />
      </PhoneShell>
    </>
  );
}
