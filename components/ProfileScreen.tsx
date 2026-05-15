"use client";

import { useState } from "react";
import {
  NavProps, T, condStyle,
  Modal, InfoModal, AddListingModal,
  StatusBar, PhoneShell, SectionHeader, BottomNav,
} from "./shared";

// ─── DATA ─────────────────────────────────────────────────
const METRICS = [
  { val: "143", label: "Verified Sales",  color: T.coral     },
  { val: "99%", label: "Auth Rate",       color: T.mint      },
  { val: "4.9", label: "Avg Rating",      color: "#D4A000"   },
  { val: "<2h", label: "Response Time",   color: T.lavender  },
];

const LISTINGS = [
  { id: 1, no: "006", name: "Charizard ex SAR",   price: "₹24,500", cond: "PSA 10",    condType: "psa" as const, bg: "#FFF0ED", type: "🔥" },
  { id: 2, no: "150", name: "Mewtwo ex SAR",       price: "₹5,800",  cond: "Near Mint", condType: "nm"  as const, bg: "#F3F1FF", type: "🔮" },
  { id: 3, no: "025", name: "Pikachu V Alt Art",   price: "₹2,100",  cond: "Near Mint", condType: "nm"  as const, bg: "#FFF5C0", type: "⚡" },
];

const WISHLIST = [
  { name: "Umbreon VMAX Alt Art",  set: "Evolving Skies", maxPrice: "₹9,000",  bg: "#EDFBF4", type: "🌙" },
  { name: "Blastoise ex SAR",      set: "SV151",          maxPrice: "₹3,500",  bg: "#E4F4FB", type: "💧" },
  { name: "Luffy Gear 5 SAR",      set: "OP-09 JP",       maxPrice: "₹5,000",  bg: "#E4F4FB", type: "👊" },
];

const REVIEWS = [
  { user: "CardKing_BLR", avatarBg: "#E4F4FB",  letter: "C", stars: 5, text: "Fast shipping, card perfectly packed. Exactly as described. Will trade again!" },
  { user: "PokeFan_MUM",  avatarBg: "#C0F0DC",  letter: "P", stars: 5, text: "Escrow was smooth, PSA slab arrived in perfect condition. Trusted seller ✅" },
  { user: "TCG_Kerala",   avatarBg: "#F3F1FF",  letter: "T", stars: 5, text: "Great communication throughout the trade. Super responsive. 10/10 recommend." },
];

const ACTIVITY = [
  { icon: "✅", text: "Sold Pikachu V Alt Art to CardKing_BLR",   time: "2h ago",  color: T.mint      },
  { icon: "⇄",  text: "Trade completed with PokeFan_MUM",         time: "1d ago",  color: T.lavender  },
  { icon: "📦", text: "Shipped Umbreon VMAX Alt via India Post",   time: "2d ago",  color: T.inkSoft   },
  { icon: "🎯", text: "3 new wishlist matches found",              time: "3d ago",  color: T.coral     },
];

const PROFILE_TABS = ["Listings", "Wishlist", "Activity", "Reviews"];

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function ProfileScreen({ onNavigate }: NavProps) {
  const [activeTab, setActiveTab] = useState("Listings");
  const [modal, setModal]         = useState<{ title: string; message: string } | null>(null);
  const [infoPage, setInfoPage]   = useState<"about"|"help"|"contact"|null>(null);
  const [showListing, setShowListing] = useState<"sell"|"trade"|null>(null);

  return (
    <>
      {modal       && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}
      {infoPage    && <InfoModal page={infoPage} onClose={() => setInfoPage(null)} onSwitch={p => setInfoPage(p)} />}
      {showListing && <AddListingModal mode={showListing} onClose={() => setShowListing(null)} />}
      <PhoneShell>
        <StatusBar />

        {/* Top Nav */}
        <div style={{ background: T.sky, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 18px 12px" }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "19px", fontWeight: 900, color: T.navy }}>My Profile</div>
          <div
            onClick={() => setInfoPage("about")}
            style={{ width: "34px", height: "34px", borderRadius: "50%", background: T.white, border: `1.5px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: T.s1 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="2" stroke={T.inkMid} strokeWidth="1.5"/>
              <path d="M8 1V3M8 13V15M1 8H3M13 8H15M3.2 3.2L4.6 4.6M11.4 11.4L12.8 12.8M3.2 12.8L4.6 11.4M11.4 4.6L12.8 3.2" stroke={T.inkMid} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div style={{ maxHeight: "636px", overflowY: "auto", overflowX: "hidden" }}>

          {/* Profile Hero */}
          <div style={{ background: `linear-gradient(160deg, ${T.skySoft}, #FFF5C0)`, padding: "20px 16px 18px", textAlign: "center" as const, borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: "70px", height: "70px", borderRadius: "50%", background: T.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontSize: "28px", fontWeight: 900, color: T.navy, margin: "0 auto 10px", border: `3px solid ${T.navy}`, boxShadow: `3px 3px 0 ${T.navy}` }}>A</div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 900, color: T.ink }}>Arya_Collector</div>
            <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "3px" }}>Thrissur, Kerala · Member since 2023</div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: T.mintSoft, borderRadius: "50px", padding: "5px 14px", marginTop: "12px", fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: "#16854E", border: `1.5px solid ${T.mint}` }}>
              🛡 Trust Score: 98 / 100
            </div>
          </div>

          {/* Metrics grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "14px 16px" }}>
            {METRICS.map(m => (
              <div key={m.label} style={{ background: T.white, borderRadius: "18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, padding: "13px", textAlign: "center" as const }}>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "22px", fontWeight: 900, color: m.color }}>{m.val}</div>
                <div style={{ fontSize: "10px", color: T.inkSoft, fontWeight: 600, marginTop: "4px", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Quick stats row */}
          <div style={{ display: "flex", gap: "9px", padding: "0 16px 14px" }}>
            {[
              { val: "12", lbl: "Listings",  color: T.yellow },
              { val: "28", lbl: "Wishlist",  color: T.skySoft },
              { val: "7",  lbl: "Trades",    color: T.mintSoft },
            ].map(s => (
              <div key={s.lbl} onClick={() => setActiveTab(s.lbl === "Wishlist" ? "Wishlist" : s.lbl === "Listings" ? "Listings" : "Activity")} style={{ flex: 1, background: s.color, borderRadius: "14px", padding: "10px", textAlign: "center" as const, cursor: "pointer", border: `1.5px solid ${T.border}`, boxShadow: T.s1, transition: "transform 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
              >
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "20px", fontWeight: 900, color: T.ink }}>{s.val}</div>
                <div style={{ fontSize: "9px", color: T.inkMid, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: "0.04em", marginTop: "3px" }}>{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Tab bar */}
          <div style={{ display: "flex", gap: "0", padding: "0 16px", marginBottom: "14px", background: T.white, marginLeft: "16px", marginRight: "16px", borderRadius: "14px", border: `1.5px solid ${T.border}`, overflow: "hidden", boxShadow: T.s1 }}>
            {PROFILE_TABS.map((tab, i) => {
              const isOn = tab === activeTab;
              return (
                <div
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1, padding: "10px 0", textAlign: "center" as const,
                    fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: isOn ? 800 : 500,
                    cursor: "pointer",
                    background: isOn ? T.navy : "transparent",
                    color: isOn ? T.yellow : T.inkSoft,
                    borderRight: i < PROFILE_TABS.length - 1 ? `1px solid ${T.border}` : "none",
                    transition: "all 0.15s",
                  }}
                >{tab}</div>
              );
            })}
          </div>

          {/* LISTINGS TAB */}
          {activeTab === "Listings" && (
            <div style={{ padding: "0 16px" }}>
              {LISTINGS.map((card, i) => (
                <div
                  key={card.id}
                  onClick={() => onNavigate("CardDetail")}
                  style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 13px", background: T.white, borderRadius: "16px", marginBottom: "8px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateX(2px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateX(0)"}
                >
                  <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", flexShrink: 0 }}>🃏</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 800, color: T.ink }}>{card.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "4px" }}>
                      <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "2px 7px", borderRadius: "50px", border: "1px solid rgba(0,0,0,0.08)", ...condStyle[card.condType] }}>{card.cond}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.ink }}>{card.price}</div>
                    <div style={{ fontSize: "9px", color: T.mint, fontWeight: 700, marginTop: "3px" }}>Active ●</div>
                  </div>
                </div>
              ))}
              <div
                onClick={() => setShowListing("sell")}
                style={{ width: "100%", padding: "12px", background: "transparent", border: `2px dashed ${T.inkGhost}`, borderRadius: "16px", textAlign: "center" as const, fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkSoft, cursor: "pointer", marginBottom: "16px", transition: "border-color 0.15s, color 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = T.navy; (e.currentTarget as HTMLElement).style.color = T.navy; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = T.inkGhost; (e.currentTarget as HTMLElement).style.color = T.inkSoft; }}
              >+ Add New Listing</div>
            </div>
          )}

          {/* WISHLIST TAB */}
          {activeTab === "Wishlist" && (
            <div style={{ padding: "0 16px" }}>
              {WISHLIST.map(w => (
                <div key={w.name} style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 13px", background: T.white, borderRadius: "16px", marginBottom: "8px", boxShadow: T.s1, border: `1.5px solid ${T.border}` }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "11px", background: w.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>🃏</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 800, color: T.ink }}>{w.name}</div>
                    <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px" }}>{w.set}</div>
                  </div>
                  <div style={{ textAlign: "right" as const }}>
                    <div style={{ fontSize: "10px", color: T.inkSoft }}>Max budget</div>
                    <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, marginTop: "2px" }}>{w.maxPrice}</div>
                  </div>
                </div>
              ))}
              <div
                onClick={() => setModal({ title: "Add to Wishlist", message: "Add a card you're looking for to your wishlist. RareNook will notify you when a match is found!" })}
                style={{ width: "100%", padding: "12px", background: "transparent", border: `2px dashed ${T.inkGhost}`, borderRadius: "16px", textAlign: "center" as const, fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkSoft, cursor: "pointer", marginBottom: "16px" }}
              >+ Add to Wishlist</div>

              {/* Footer links */}
              <div style={{ display: "flex", justifyContent: "center", gap: "6px", flexWrap: "wrap" as const, paddingBottom: "4px" }}>
                {(["about","help","contact"] as const).map(p => (
                  <div key={`prof-footer-${p}`} onClick={() => setInfoPage(p)} style={{ padding: "5px 13px", background: T.white, borderRadius: "50px", border: `1.5px solid ${T.border}`, fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 700, color: T.inkMid, cursor: "pointer", boxShadow: T.s1, textTransform: "capitalize" as const }}>
                    {p === "about" ? "About" : p === "help" ? "Help" : "Contact"}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === "Activity" && (
            <div style={{ padding: "0 16px" }}>
              <div style={{ background: T.white, borderRadius: "20px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, overflow: "hidden", marginBottom: "16px" }}>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "11px", padding: "11px 13px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{a.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: T.ink, lineHeight: 1.4 }}>{a.text}</div>
                    </div>
                    <div style={{ fontSize: "10px", color: T.inkSoft, flexShrink: 0 }}>{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === "Reviews" && (
            <div style={{ padding: "0 16px" }}>
              {REVIEWS.map(r => (
                <div key={r.user} style={{ background: T.white, borderRadius: "18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, padding: "13px", marginBottom: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "8px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: r.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, flexShrink: 0, border: `1.5px solid ${T.border}` }}>{r.letter}</div>
                    <div>
                      <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700, color: T.ink }}>{r.user}</div>
                      <div style={{ fontSize: "11px", color: "#D4A000", marginTop: "1px" }}>{"★".repeat(r.stars)}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", color: T.inkMid, lineHeight: 1.6 }}>{r.text}</div>
                </div>
              ))}
              <div style={{ height: "6px" }} />
            </div>
          )}

          <div style={{ height: "14px" }} />
        </div>

        <BottomNav active="Profile" onNavigate={onNavigate} />
      </PhoneShell>
    </>
  );
}
