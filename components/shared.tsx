"use client";

import React from "react";

// ─── TYPES ───────────────────────────────────────────────
export type Screen = "Home" | "Marketplace" | "CardDetail" | "TradeHub" | "TradeOffer" | "Community" | "Profile";

export type NavProps = {
  onNavigate: (screen: Screen) => void;
};

// ─── CARD ART — original SVG illustrations (no IP) ───────
// Each returns a self-contained SVG for use as card art
export const CARD_ART: Record<string, React.ReactNode> = {
  fire: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#FFF0ED"/>
      <path d="M27 8C27 8 20 18 20 24C20 28.4 23.1 32 27 32C30.9 32 34 28.4 34 24C34 18 27 8 27 8Z" fill="#FF7A5C" opacity="0.9"/>
      <path d="M22 22C22 22 18 27 18 31C18 36.5 22.5 41 27 41C31.5 41 36 36.5 36 31C36 27 32 22 32 22C32 25 30 27 27 27C24 27 22 25 22 22Z" fill="#E8402A"/>
      <path d="M25 30C25 30 23 33 23 35C23 37.2 24.8 39 27 39C29.2 39 31 37.2 31 35C31 33 29 30 29 30C29 31.5 28 32.5 27 32.5C26 32.5 25 31.5 25 30Z" fill="#FFD740" opacity="0.9"/>
    </svg>
  ),
  psychic: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#F3F1FF"/>
      <circle cx="27" cy="27" r="10" stroke="#6B5AC4" strokeWidth="1.5" fill="none"/>
      <circle cx="27" cy="27" r="5" fill="#6B5AC4" opacity="0.7"/>
      <path d="M27 8V17M27 37V46M8 27H17M37 27H46" stroke="#6B5AC4" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14.6 14.6L21 21M33 33L39.4 39.4M39.4 14.6L33 21M21 33L14.6 39.4" stroke="#6B5AC4" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  electric: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#FFF5C0"/>
      <path d="M31 10L18 29H27L23 46L38 25H29L31 10Z" fill="#FFD740" stroke="#C4960A" strokeWidth="1" strokeLinejoin="round"/>
    </svg>
  ),
  dark: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#EDFBF4"/>
      <path d="M27 10C18 10 11 17 11 26C11 32 14 37.3 19 40.2C18.3 38.6 18 36.9 18 35C18 27.3 22 21.2 27 18.5C32 21.2 36 27.3 36 35C36 36.9 35.7 38.6 35 40.2C40 37.3 43 32 43 26C43 17 36 10 27 10Z" fill="#1A1C2E" opacity="0.85"/>
      <circle cx="21" cy="24" r="2" fill="#FFD740"/>
      <circle cx="33" cy="24" r="2" fill="#FFD740"/>
    </svg>
  ),
  water: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#E4F4FB"/>
      <path d="M27 10C27 10 15 24 15 31C15 38.2 20.4 44 27 44C33.6 44 39 38.2 39 31C39 24 27 10 27 10Z" fill="#9DD0EA" opacity="0.8"/>
      <path d="M21 33C21 36.9 23.7 40 27 40C30.3 40 33 36.9 33 33" stroke="#5AAFD6" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M22 28C24 26 30 26 32 28" stroke="#5AAFD6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  ),
  star: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#FFF5C0"/>
      <path d="M27 10L30.5 20.5H42L32.5 27L36 37.5L27 31L18 37.5L21.5 27L12 20.5H23.5L27 10Z" fill="#FFD740" stroke="#C4960A" strokeWidth="1" strokeLinejoin="round"/>
    </svg>
  ),
  moon: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#EDFBF4"/>
      <path d="M32 12C26 12 21 17 21 23C21 29 26 34 32 34C33.4 34 34.7 33.7 36 33.2C34 37 30.3 39 26 39C19.4 39 14 33.6 14 27C14 20.4 19.4 15 26 15C28.2 15 30.2 15.7 32 16.8C32 15.2 32 13.6 32 12Z" fill="#1A1C2E" opacity="0.8"/>
      <circle cx="36" cy="16" r="2" fill="#FFD740"/>
      <circle cx="39" cy="22" r="1.5" fill="#FFD740" opacity="0.7"/>
    </svg>
  ),
  // Pokéball-inspired placeholder (red top, white bottom, stripe, center button)
  pokeball: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="25" fill="#E8402A" stroke="#1A1C2E" strokeWidth="2"/>
      <path d="M2.2 27 A24.8 24.8 0 0 0 51.8 27 Z" fill="white"/>
      <rect x="2" y="25" width="50" height="4" fill="#1A1C2E"/>
      <circle cx="27" cy="27" r="6" fill="white" stroke="#1A1C2E" strokeWidth="2.5"/>
      <circle cx="27" cy="27" r="2.5" fill="#1A1C2E"/>
    </svg>
  ),
  // Straw hat-inspired placeholder (hat brim + crown silhouette)
  strawhat: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="25" fill="#FFF5C0" stroke="#C4960A" strokeWidth="1.5"/>
      {/* Hat brim */}
      <ellipse cx="27" cy="32" rx="18" ry="4.5" fill="#FFD740" stroke="#C4960A" strokeWidth="1.5"/>
      {/* Hat crown */}
      <path d="M16 32 C16 32 17 20 27 20 C37 20 38 32 38 32Z" fill="#FFD740" stroke="#C4960A" strokeWidth="1.5"/>
      {/* Red band */}
      <path d="M17 28.5 C17 28.5 20 30 27 30 C34 30 37 28.5 37 28.5" stroke="#E8402A" strokeWidth="3" strokeLinecap="round"/>
      {/* Crown lines (texture) */}
      <path d="M22 24 C22 24 24 22 27 22 C30 22 32 24 32 24" stroke="#C4960A" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
    </svg>
  ),
  fist: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#E4F4FB"/>
      <rect x="18" y="20" width="6" height="10" rx="3" fill="#9DD0EA" stroke="#5AAFD6" strokeWidth="1"/>
      <rect x="24" y="18" width="6" height="12" rx="3" fill="#9DD0EA" stroke="#5AAFD6" strokeWidth="1"/>
      <rect x="30" y="20" width="6" height="10" rx="3" fill="#9DD0EA" stroke="#5AAFD6" strokeWidth="1"/>
      <path d="M15 30H39C39 36 33 40 27 40C21 40 15 36 15 30Z" fill="#5AAFD6" opacity="0.8"/>
    </svg>
  ),
  sword: (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
      <circle cx="27" cy="27" r="26" fill="#EDFBF4"/>
      <path d="M27 9L31 23H45L33 31L37 45L27 38L17 45L21 31L9 23H23L27 9Z" fill="none" stroke="#20B870" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 22L34 34" stroke="#20B870" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  ),
};

// ─── CARD ART KEY MAP ─────────────────────────────────────
export type ArtKey = keyof typeof CARD_ART;

// ─── ALL CARDS DATA ──────────────────────────────────────
export const ALL_CARDS = [
  { id: 1,  no: "006", name: "Charizard ex SAR",     series: "Scarlet & Violet",  set: "SV151",   cond: "PSA 10",    condType: "psa" as const, lang: "EN", year: "2023", price: "₹24,500",   marketLabel: "Market Value", bg: "#FFF0ED", art: "pokeball"  as ArtKey, category: "cards",    real: true  },
  { id: 2,  no: "150", name: "Mewtwo ex SAR",         series: "Scarlet & Violet",  set: "SV151",   cond: "Near Mint", condType: "nm"  as const, lang: "EN", year: "2023", price: "₹5,800",    marketLabel: "Market Value", bg: "#F3F1FF", art: "pokeball"  as ArtKey, category: "cards",    real: true  },
  { id: 3,  no: "025", name: "Pikachu V Alt Art",     series: "Fusion Strike",     set: "FS-EN",   cond: "Near Mint", condType: "nm"  as const, lang: "EN", year: "2021", price: "₹2,100",    marketLabel: "Market Value", bg: "#FFF5C0", art: "pokeball"  as ArtKey, category: "cards",    real: true  },
  { id: 4,  no: "197", name: "Umbreon VMAX Alt Art",  series: "Evolving Skies",    set: "EVS",     cond: "Near Mint", condType: "nm"  as const, lang: "EN", year: "2021", price: "₹8,500",    marketLabel: "Market Value", bg: "#EDFBF4", art: "pokeball"  as ArtKey, category: "cards",    real: false },
  { id: 5,  no: "009", name: "Blastoise ex SAR",      series: "Scarlet & Violet",  set: "SV151",   cond: "Near Mint", condType: "nm"  as const, lang: "EN", year: "2023", price: "₹3,200",    marketLabel: "Market Value", bg: "#E4F4FB", art: "pokeball"  as ArtKey, category: "cards",    real: false },
  { id: 6,  no: "006", name: "Charizard Base 1st Ed", series: "Base Set",          set: "BST-EN",  cond: "PSA 9",     condType: "psa" as const, lang: "EN", year: "1999", price: "₹1,24,000", marketLabel: "Market Value", bg: "#FFF0ED", art: "pokeball"  as ArtKey, category: "cards",    real: false },
  { id: 7,  no: "OP1", name: "Luffy Gear 5 R",        series: "One Piece TCG",     set: "OP-06",   cond: "Near Mint", condType: "nm"  as const, lang: "JP", year: "2024", price: "₹3,400",    marketLabel: "Market Value", bg: "#FFF5C0", art: "strawhat"  as ArtKey, category: "onepiece", real: false },
  { id: 8,  no: "OP2", name: "Zoro Alt Art R",        series: "One Piece TCG",     set: "OP-01",   cond: "Near Mint", condType: "nm"  as const, lang: "JP", year: "2022", price: "₹2,900",    marketLabel: "Market Value", bg: "#FFF5C0", art: "strawhat"  as ArtKey, category: "onepiece", real: false },
];

export const MOVERS = [
  { id: 7,  name: "Luffy Gear 5 R",        price: "₹3,400", change: "↑ 24%", up: true,  bg: "#FFF5C0", art: "strawhat"  as ArtKey, category: "onepiece" },
  { id: 8,  name: "Zoro Alt Art R",         price: "₹2,900", change: "↑ 9%",  up: true,  bg: "#FFF5C0", art: "strawhat"  as ArtKey, category: "onepiece" },
  { id: 4,  name: "Umbreon VMAX Alt Art",   price: "₹8,500", change: "↑ 6%",  up: true,  bg: "#EDFBF4", art: "pokeball"  as ArtKey, category: "cards"    },
];

export const SALES = [
  { name: "Pikachu V Alt Art · NM · EN",    by: "CardKing_BLR · 2h ago",  price: "₹2,100", dot: "#E8402A" },
  { name: "Luffy Gear 5 R · NM · JP",       by: "PokeFan_MUM · 5h ago",   price: "₹1,800", dot: "#9DD0EA" },
  { name: "Umbreon VMAX Alt Art · NM · EN", by: "TCG_Kerala · 8h ago",    price: "₹8,500", dot: "#6B5AC4" },
];

// ─── DESIGN TOKENS ────────────────────────────────────────
export const T = {
  navy:       "#1C2340",
  ink:        "#1A1C2E",
  inkMid:     "#404468",
  inkSoft:    "#7A7EA8",
  inkGhost:   "#B8BCDA",
  sky:        "#C9E9F7",
  skySoft:    "#E4F4FB",
  yellow:     "#FFD740",
  coral:      "#E8402A",
  mint:       "#20B870",
  mintSoft:   "#EDFBF4",
  lavender:   "#6B5AC4",
  lavSoft:    "#F3F1FF",
  white:      "#FFFFFF",
  border:     "rgba(28,35,64,0.1)",
  borderMid:  "rgba(28,35,64,0.18)",
  s1:         "0 2px 8px rgba(28,35,64,0.07)",
  s2:         "0 4px 18px rgba(28,35,64,0.11)",
  s3:         "0 8px 32px rgba(28,35,64,0.14)",
};

export const condStyle = {
  psa: { background: "#FFF5C0", color: "#8B6400" },
  nm:  { background: "#EDFBF4", color: "#16854E" },
};

// ─── CARD ART THUMBNAIL ───────────────────────────────────
export function CardArt({ artKey, size = 54 }: { artKey: ArtKey; size?: number }) {
  const art = CARD_ART[artKey] ?? CARD_ART["star"];
  return (
    <div style={{ width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      {art}
    </div>
  );
}

// ─── CARD INFO LABEL — standardised hierarchy ─────────────
// Shows: Name · Set · Cond · Lang · Year · Market Label · Price
export function CardInfoBlock({ card, showPrice = true }: {
  card: typeof ALL_CARDS[0];
  showPrice?: boolean;
}) {
  return (
    <div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 900, color: T.ink, lineHeight: 1.25 }}>{card.name}</div>
      <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px", lineHeight: 1.4 }}>
        {card.set} · {card.lang} · {card.year}
      </div>
      <div style={{ marginTop: "4px" }}>
        <span style={{
          display: "inline-block", fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "10px", fontWeight: 800,
          padding: "2px 8px", borderRadius: "50px",
          border: "1px solid rgba(0,0,0,0.08)",
          ...condStyle[card.condType],
        }}>{card.cond}</span>
      </div>
      {showPrice && (
        <div style={{ marginTop: "5px" }}>
          <div style={{ fontSize: "9px", color: T.inkSoft, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>{card.marketLabel}</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 900, color: T.ink, lineHeight: 1.2 }}>{card.price}</div>
        </div>
      )}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────
export function Modal({ title, message, onClose }: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(28,35,64,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px", backdropFilter: "blur(4px)" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: T.white, borderRadius: "24px", padding: "28px 24px", maxWidth: "300px", width: "100%", boxShadow: T.s3, textAlign: "center" as const }}
      >
        <div style={{ fontSize: "40px", marginBottom: "14px" }}>
          {title.includes("soon") || title.includes("Soon") ? "🚧" : title.includes("listed") ? "📋" : "ℹ️"}
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 900, color: T.ink, marginBottom: "8px" }}>{title}</div>
        <div style={{ fontSize: "13px", color: T.inkSoft, lineHeight: 1.6, marginBottom: "22px" }}>{message}</div>
        <button onClick={onClose} style={{ background: T.navy, color: T.yellow, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "14px", padding: "12px 32px", borderRadius: "14px", border: "none", cursor: "pointer", width: "100%" }}>
          Got it
        </button>
      </div>
    </div>
  );
}

// ─── BOTTOM SHEET OVERLAY ────────────────────────────────
export function BottomSheet({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 900, background: "rgba(28,35,64,0.45)", display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(3px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "345px", background: T.white, borderRadius: "24px 24px 0 0", padding: "0 0 32px", boxShadow: T.s3, maxHeight: "88vh", overflowY: "auto" }}>
        <div style={{ width: "36px", height: "4px", background: T.inkGhost, borderRadius: "2px", margin: "14px auto 0" }} />
        {children}
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS MODAL ──────────────────────────────────
const NOTIFS = [
  { id: 1, icon: "⇄",  color: "#6B5AC4", bg: "#F3F1FF", title: "Trade offer accepted",       sub: "Rahul_TCG accepted your counter offer on Emberveil Dragon",  time: "2m ago",  read: false },
  { id: 2, icon: "🔒", color: "#20B870", bg: "#EDFBF4", title: "Escrow update",               sub: "Your card has been verified and is being shipped to buyer",   time: "1h ago",  read: false },
  { id: 3, icon: "🎯", color: "#E8402A", bg: "#FFF0ED", title: "Wishlist match found",        sub: "A collector has listed Shadowmantle Beast — matches your wishlist!", time: "3h ago", read: false },
  { id: 4, icon: "📈", color: "#C4960A", bg: "#FFF5C0", title: "Price alert",                 sub: "Emberveil Dragon 1st is up 18% this week",                   time: "5h ago",  read: true  },
  { id: 5, icon: "✅", color: "#20B870", bg: "#EDFBF4", title: "Sale complete",               sub: "Stormtail Sprite sold to PokeFan_MUM · ₹2,100 released",      time: "1d ago",  read: true  },
];

export function NotificationsModal({ onClose }: { onClose: () => void }) {
  const unread = NOTIFS.filter(n => !n.read).length;
  return (
    <BottomSheet onClose={onClose}>
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 900, color: T.ink }}>Notifications</div>
            {unread > 0 && <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "2px" }}>{unread} unread</div>}
          </div>
          <div onClick={onClose} style={{ width: "28px", height: "28px", borderRadius: "50%", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke={T.inkMid} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </div>
        </div>

        {NOTIFS.map((n, i) => (
          <div key={`notif-${n.id}`} style={{ display: "flex", gap: "11px", padding: "11px 0", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none", position: "relative" }}>
            {!n.read && <div style={{ position: "absolute", top: "13px", right: 0, width: "7px", height: "7px", borderRadius: "50%", background: T.coral }} />}
            <div style={{ width: "36px", height: "36px", borderRadius: "11px", background: n.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1, paddingRight: "14px" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: n.read ? 600 : 800, color: T.ink }}>{n.title}</div>
              <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "2px", lineHeight: 1.5 }}>{n.sub}</div>
              <div style={{ fontSize: "10px", color: T.inkGhost, marginTop: "3px" }}>{n.time}</div>
            </div>
          </div>
        ))}

        <div style={{ marginTop: "14px", padding: "12px", background: T.skySoft, borderRadius: "12px", textAlign: "center" as const, fontSize: "11px", color: T.inkSoft }}>
          Real-time push notifications coming soon
        </div>
      </div>
    </BottomSheet>
  );
}

// ─── ABOUT / HELP / CONTACT MODAL ────────────────────────
type InfoPage = "about" | "help" | "contact";

function AboutContent() {
  return (
    <>
      <div style={{ fontSize: "40px", textAlign: "center" as const, marginBottom: "12px" }}>🃏</div>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink, marginBottom: "10px" }}>About RareNook</div>
      <div style={{ fontSize: "12px", color: T.inkMid, lineHeight: 1.75, marginBottom: "14px" }}>
        RareNook is India's first dedicated trading card marketplace — built for serious collectors who want to buy, sell, and trade safely.
      </div>
      {[
        { icon: "🛍", label: "Marketplace",       sub: "Browse thousands of cards from verified Indian sellers at real INR prices" },
        { icon: "⇄",  label: "Trade Hub",          sub: "Trade collector-to-collector with value matching and balance payments" },
        { icon: "🔒", label: "Escrow Protection",  sub: "Every trade is verified — we inspect cards before releasing payment" },
        { icon: "💬", label: "Community",          sub: "Connect with collectors, share pulls, and discuss market trends" },
        { icon: "📊", label: "Market Intelligence",sub: "Real-time Indian market pricing, not USD conversions" },
      ].map((f, i) => (
        <div key={`about-${i}`} style={{ display: "flex", gap: "12px", padding: "10px 0", borderTop: `1px solid rgba(28,35,64,0.06)` }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{f.icon}</div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{f.label}</div>
            <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "2px", lineHeight: 1.5 }}>{f.sub}</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: "14px", padding: "12px 13px", background: T.mintSoft, borderRadius: "12px", borderLeft: `3px solid ${T.mint}`, fontSize: "11px", color: "#16854E", lineHeight: 1.65 }}>
        🚀 RareNook is currently in early access. New features including One Piece, Anime cards, graded slab listings, and live escrow tracking are coming soon.
      </div>
    </>
  );
}

function HelpContent() {
  const faqs = [
    { q: "How does escrow work?",           a: "You pay RareNook → seller ships card to us → we verify authenticity and condition → we ship to you → seller gets paid. If the card fails inspection, you get a full refund." },
    { q: "Is my payment safe?",             a: "Yes. All payments are held in escrow until the card passes our verification check. We never release funds to the seller before you receive a verified card." },
    { q: "How do I report a problem?",      a: "Email support@rarenook.in or use the in-app chat support on any trade screen. Our team responds within 24 hours." },
    { q: "What cards can I sell?",          a: "Currently Pokémon and One Piece TCG cards. Anime cards, MTG, and graded slabs are coming soon." },
    { q: "How are prices determined?",      a: "Prices are set by sellers. Our Market Intelligence panel shows verified Indian sale history to help you price fairly." },
  ];
  return (
    <>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink, marginBottom: "14px" }}>Help & Support</div>
      {faqs.map((f, i) => (
        <div key={`faq-${i}`} style={{ padding: "12px 0", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none" }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink, marginBottom: "5px" }}>{f.q}</div>
          <div style={{ fontSize: "11px", color: T.inkMid, lineHeight: 1.65 }}>{f.a}</div>
        </div>
      ))}
      <div style={{ marginTop: "14px", padding: "12px 13px", background: T.skySoft, borderRadius: "12px", fontSize: "11px", color: T.inkMid, lineHeight: 1.65 }}>
        Still need help? Email <strong style={{ color: T.navy }}>support@rarenook.in</strong> — we reply within 24h.
      </div>
    </>
  );
}

function ContactContent() {
  return (
    <>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink, marginBottom: "14px" }}>Contact Us</div>
      {[
        { icon: "📧", label: "Support Email",   value: "support@rarenook.in",       sub: "Response within 24 hours"    },
        { icon: "💬", label: "Live Chat",        value: "In-app chat support",       sub: "Available on all trade screens" },
        { icon: "🐦", label: "Twitter / X",      value: "@rarenook_in",              sub: "Updates and announcements"   },
        { icon: "📸", label: "Instagram",        value: "@rarenook.india",           sub: "Community highlights & pulls" },
      ].map((c, i) => (
        <div key={`contact-${i}`} style={{ display: "flex", gap: "12px", padding: "11px 0", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>{c.icon}</div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{c.label}</div>
            <div style={{ fontSize: "12px", color: T.navy, fontWeight: 700, marginTop: "2px" }}>{c.value}</div>
            <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "1px" }}>{c.sub}</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: "14px", padding: "12px 13px", background: "#FFF5C0", borderRadius: "12px", borderLeft: `3px solid ${T.yellow}`, fontSize: "11px", color: T.inkMid, lineHeight: 1.65 }}>
        🛡 <strong style={{ color: T.ink }}>Trust &amp; Safety:</strong> RareNook verifies every card through our escrow process. If anything goes wrong with a trade, our team will resolve it fairly for both parties.
      </div>
    </>
  );
}

export function InfoModal({ page, onClose, onSwitch }: {
  page: InfoPage;
  onClose: () => void;
  onSwitch: (p: InfoPage) => void;
}) {
  const tabs: InfoPage[] = ["about", "help", "contact"];
  const labels = { about: "About", help: "Help", contact: "Contact" };

  return (
    <BottomSheet onClose={onClose}>
      <div style={{ padding: "16px 20px 0" }}>
        {/* Tab switcher */}
        <div style={{ display: "flex", gap: "0", background: T.skySoft, borderRadius: "12px", padding: "3px", marginBottom: "18px", overflow: "hidden" }}>
          {tabs.map(t => (
            <div key={`info-tab-${t}`} onClick={() => onSwitch(t)} style={{ flex: 1, padding: "8px 0", textAlign: "center" as const, fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: page === t ? 800 : 500, color: page === t ? T.ink : T.inkSoft, background: page === t ? T.white : "transparent", borderRadius: "9px", cursor: "pointer", transition: "all 0.15s", boxShadow: page === t ? T.s1 : "none" }}>
              {labels[t]}
            </div>
          ))}
        </div>

        {page === "about"   && <AboutContent />}
        {page === "help"    && <HelpContent />}
        {page === "contact" && <ContactContent />}

        <div style={{ marginTop: "18px" }}>
          <div onClick={onClose} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>Close</div>
        </div>
      </div>
    </BottomSheet>
  );
}

// ─── LISTING FLOW MODAL ───────────────────────────────────
type ListingStep = "details" | "pricing" | "success";

export function AddListingModal({ mode, onClose }: { mode: "sell" | "trade"; onClose: () => void }) {
  const [step, setStep] = React.useState<ListingStep>("details");
  const [cardName, setCardName]       = React.useState("");
  const [setName, setSetName]         = React.useState("");
  const [condition, setCondition]     = React.useState("Near Mint");
  const [language, setLanguage]       = React.useState("EN");
  const [price, setPrice]             = React.useState("");
  const [wantCard, setWantCard]       = React.useState("");

  const conditions = ["Mint","Near Mint","Lightly Played","Played","Poor"];
  const languages  = ["EN","JP","KR","CN"];
  const isTrade    = mode === "trade";

  if (step === "success") {
    return (
      <BottomSheet onClose={onClose}>
        <div style={{ padding: "24px 22px 0", textAlign: "center" as const }}>
          <div style={{ fontSize: "52px", marginBottom: "14px" }}>🎉</div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 900, color: T.ink, marginBottom: "8px" }}>
            {isTrade ? "Trade Listed!" : "Listing Created!"}
          </div>
          <div style={{ fontSize: "12px", color: T.inkSoft, lineHeight: 1.7, marginBottom: "22px" }}>
            {isTrade
              ? `Your trade for "${cardName || "your card"}" is now visible to collectors. You'll be notified when someone matches it.`
              : `"${cardName || "Your card"}" is now listed at ₹${price || "–"}. Buyers can contact you through RareNook.`}
          </div>
          <div style={{ background: T.skySoft, borderRadius: "12px", padding: "12px", marginBottom: "20px", fontSize: "11px", color: T.inkMid, lineHeight: 1.6 }}>
            ⚙️ This is a demo listing. Full listing submission coming in the next update.
          </div>
          <div onClick={onClose} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>Done</div>
        </div>
      </BottomSheet>
    );
  }

  return (
    <BottomSheet onClose={onClose}>
      <div style={{ padding: "16px 20px 0" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "17px", fontWeight: 900, color: T.ink }}>
            {isTrade ? "List a Trade" : "Add Listing"}
          </div>
          <div onClick={onClose} style={{ width: "28px", height: "28px", borderRadius: "50%", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1L9 9M9 1L1 9" stroke={T.inkMid} strokeWidth="1.6" strokeLinecap="round"/></svg>
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", gap: "6px", marginBottom: "18px" }}>
          {(["details","pricing"] as ListingStep[]).map((s, i) => (
            <div key={`step-${s}`} style={{ flex: 1, height: "3px", borderRadius: "2px",background: step === s ? T.navy : T.inkGhost , transition: "background 0.2s" }} />
          ))}
        </div>

        {step === "details" && (
          <>
            {/* Mock photo upload */}
            <div
              style={{ border: `2px dashed ${T.inkGhost}`, borderRadius: "14px", padding: "20px", textAlign: "center" as const, marginBottom: "14px", cursor: "pointer", transition: "border-color 0.15s" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = T.navy}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = T.inkGhost}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ margin: "0 auto 8px", display: "block" }}>
                <path d="M14 4V20M6 12L14 4L22 12" stroke={T.inkGhost} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 22H24" stroke={T.inkGhost} strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 700, color: T.inkSoft }}>Upload card photo</div>
              <div style={{ fontSize: "10px", color: T.inkGhost, marginTop: "3px" }}>Front + back recommended</div>
            </div>

            {/* Card Name */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "7px" }}>Card Name</div>
              <input value={cardName} onChange={e => setCardName(e.target.value)} placeholder="e.g. Emberveil Dragon ex SAR" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${T.border}`, borderRadius: "12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.inkMid, outline: "none", background: T.skySoft }} />
            </div>

            {/* Set Name */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "7px" }}>Set / Series</div>
              <input value={setName} onChange={e => setSetName(e.target.value)} placeholder="e.g. SV151 · Scarlet & Violet" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${T.border}`, borderRadius: "12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.inkMid, outline: "none", background: T.skySoft }} />
            </div>

            {/* Condition */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "7px" }}>Condition</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" as const }}>
                {conditions.map(c => (
                  <div key={`cond-${c}`} onClick={() => setCondition(c)} style={{ padding: "5px 12px", borderRadius: "50px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 700, cursor: "pointer", background: condition === c ? T.navy : T.white, color: condition === c ? T.yellow : T.inkMid, border: `1.5px solid ${condition === c ? T.navy : T.border}`, transition: "all 0.12s" }}>{c}</div>
                ))}
              </div>
            </div>

            {/* Language */}
            <div style={{ marginBottom: "18px" }}>
              <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "7px" }}>Language</div>
              <div style={{ display: "flex", gap: "6px" }}>
                {languages.map(l => (
                  <div key={`lang-${l}`} onClick={() => setLanguage(l)} style={{ padding: "5px 14px", borderRadius: "50px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 700, cursor: "pointer", background: language === l ? T.navy : T.white, color: language === l ? T.yellow : T.inkMid, border: `1.5px solid ${language === l ? T.navy : T.border}`, transition: "all 0.12s" }}>{l}</div>
                ))}
              </div>
            </div>

            <div onClick={() => setStep("pricing")} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer", marginBottom: "8px" }}>
              Next: Pricing →
            </div>
            <div onClick={onClose} style={{ width: "100%", padding: "11px 0", background: "transparent", border: `1.5px solid ${T.border}`, borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkMid, textAlign: "center" as const, cursor: "pointer" }}>Cancel</div>
          </>
        )}

        {step === "pricing" && (
          <>
            {/* Card summary */}
            <div style={{ background: T.skySoft, borderRadius: "12px", padding: "11px 13px", marginBottom: "16px" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{cardName || "Your Card"}</div>
              <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px" }}>{setName || "–"} · {condition} · {language}</div>
            </div>

            {isTrade ? (
              /* Trade preferences */
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "7px" }}>Card You Want in Return</div>
                <input value={wantCard} onChange={e => setWantCard(e.target.value)} placeholder="e.g. Tidecrest Leviathan SAR" style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${T.border}`, borderRadius: "12px", fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.inkMid, outline: "none", background: T.skySoft }} />
                <div style={{ marginTop: "10px" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "7px" }}>Will accept balance payment?</div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {["Yes, open to it", "No, equal trade only"].map(opt => (
                      <div key={opt} style={{ flex: 1, padding: "8px", borderRadius: "10px", border: `1.5px solid ${T.border}`, fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 600, color: T.inkMid, textAlign: "center" as const, cursor: "pointer", background: T.white }}>{opt}</div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Sell price */
              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "7px" }}>Asking Price (₹)</div>
                <div style={{ display: "flex", alignItems: "center", background: T.white, border: `2px solid ${T.navy}`, borderRadius: "14px", padding: "11px 14px", gap: "6px" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 900, color: T.inkMid }}>₹</span>
                  <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 4200" style={{ flex: 1, border: "none", outline: "none", fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 900, color: T.ink, background: "transparent" }} />
                </div>
                <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "6px" }}>Market avg for this type: ₹2,000–₹6,000</div>
              </div>
            )}

            <div style={{ marginBottom: "14px", padding: "10px 13px", background: T.mintSoft, borderRadius: "12px", borderLeft: `3px solid ${T.mint}`, fontSize: "11px", color: "#16854E", lineHeight: 1.65 }}>
              🔒 All listings are escrow-protected. Buyers pay through RareNook before you ship.
            </div>

            <div onClick={() => setStep("success")} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer", marginBottom: "8px" }}>
              {isTrade ? "📤 List Trade" : "📤 Publish Listing"}
            </div>
            <div onClick={() => setStep("details")} style={{ width: "100%", padding: "11px 0", background: "transparent", border: `1.5px solid ${T.border}`, borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkMid, textAlign: "center" as const, cursor: "pointer" }}>← Back</div>
          </>
        )}
      </div>
    </BottomSheet>
  );
}

// ─── STATUS BAR — hidden on real mobile, shown in desktop preview ─
export function StatusBar() {
  return (
    <>
      <style>{`.rn-statusbar { display: none; }`}</style>
      <div className="rn-statusbar" style={{ background: T.sky, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 22px 2px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 800, color: T.ink }}>
        <span>9:41</span>
        <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <rect x="0" y="4" width="3" height="7" rx="1" fill={T.ink} opacity="0.4"/>
            <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" fill={T.ink} opacity="0.6"/>
            <rect x="9" y="0" width="3" height="11" rx="1" fill={T.ink}/>
            <rect x="13.5" y="2" width="3" height="7" rx="1" fill={T.ink} opacity="0.3"/>
          </svg>
          🔋
        </span>
      </div>
    </>
  );
}

// ─── LOGO BALL — collectible ball mark ───────────────────
export function LogoBall({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
      {/* Ball outline */}
      <circle cx="14" cy="14" r="13" fill={T.coral} stroke={T.ink} strokeWidth="2"/>
      {/* White bottom half */}
      <path d="M1.2 14 A13 13 0 0 0 26.8 14 Z" fill="white"/>
      {/* Center stripe */}
      <rect x="1" y="12.5" width="26" height="3" fill={T.ink}/>
      {/* Center button */}
      <circle cx="14" cy="14" r="3.5" fill="white" stroke={T.ink} strokeWidth="2"/>
    </svg>
  );
}

// ─── COLLECTIBLE FEATURE ICONS — yellow fill, navy outline ──
export function IconCart({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="1" y="1" width="34" height="34" rx="9" fill={T.yellow} stroke={T.ink} strokeWidth="2"/>
      <path d="M8 10H10.5L13.5 22H25L27 14H11.5" stroke={T.ink} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="15" cy="26" r="2" fill={T.ink}/>
      <circle cx="23" cy="26" r="2" fill={T.ink}/>
    </svg>
  );
}

export function IconHandshake({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="1" y="1" width="34" height="34" rx="9" fill={T.yellow} stroke={T.ink} strokeWidth="2"/>
      <path d="M7 20L11 24L15 21L19 24L25 20" stroke={T.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 16L11 13H16L20 16H25L29 18" stroke={T.ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 24V28M25 20V24" stroke={T.ink} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function IconPackage({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="1" y="1" width="34" height="34" rx="9" fill={T.yellow} stroke={T.ink} strokeWidth="2"/>
      <rect x="9" y="17" width="18" height="12" rx="2" fill="white" stroke={T.ink} strokeWidth="2"/>
      <path d="M9 17L12 12H24L27 17" stroke={T.ink} strokeWidth="2" strokeLinejoin="round"/>
      <path d="M15 17V12" stroke={T.ink} strokeWidth="2"/>
      <circle cx="24" cy="14" r="5" fill={T.yellow} stroke={T.ink} strokeWidth="2"/>
      <path d="M22 14L23.5 15.5L26.5 12.5" stroke={T.ink} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function IconChat({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="1" y="1" width="34" height="34" rx="9" fill={T.yellow} stroke={T.ink} strokeWidth="2"/>
      <rect x="7" y="9" width="16" height="12" rx="3" fill="white" stroke={T.ink} strokeWidth="2"/>
      <path d="M11 25L9 28V25H7" stroke={T.ink} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="11" cy="15" r="1.5" fill={T.ink}/>
      <circle cx="15" cy="15" r="1.5" fill={T.ink}/>
      <circle cx="19" cy="15" r="1.5" fill={T.ink}/>
      <rect x="15" y="16" width="14" height="10" rx="3" fill={T.yellow} stroke={T.ink} strokeWidth="2"/>
      <path d="M29 26V28L26 26" stroke={T.ink} strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
}

// One Piece skull logo — original inspired, not direct copy
export function IconOnePiece({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="1" y="1" width="34" height="34" rx="9" fill={T.yellow} stroke={T.ink} strokeWidth="2"/>
      {/* Skull */}
      <circle cx="18" cy="17" r="6.5" fill="white" stroke={T.ink} strokeWidth="1.8"/>
      {/* Eyes */}
      <circle cx="15.5" cy="16" r="2" fill={T.ink}/>
      <circle cx="20.5" cy="16" r="2" fill={T.ink}/>
      {/* Smile */}
      <path d="M15 20.5C15 20.5 16.5 22 18 22C19.5 22 21 20.5 21 20.5" stroke={T.ink} strokeWidth="1.5" strokeLinecap="round"/>
      {/* Crossbones */}
      <path d="M5 13L11 17M5 21L11 17" stroke={T.ink} strokeWidth="2" strokeLinecap="round"/>
      <path d="M31 13L25 17M31 21L25 17" stroke={T.ink} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="6" cy="12" r="2" fill={T.ink}/>
      <circle cx="6" cy="22" r="2" fill={T.ink}/>
      <circle cx="30" cy="12" r="2" fill={T.ink}/>
      <circle cx="30" cy="22" r="2" fill={T.ink}/>
      {/* Straw hat brim */}
      <path d="M11 12H25" stroke={T.coral} strokeWidth="3" strokeLinecap="round"/>
      <ellipse cx="18" cy="10.5" rx="5" ry="3" fill={T.yellow} stroke={T.coral} strokeWidth="1.5"/>
    </svg>
  );
}

// Collectible ball — for Pokémon category
export function IconPokeCategory({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="1" y="1" width="34" height="34" rx="9" fill={T.yellow} stroke={T.ink} strokeWidth="2"/>
      {/* Ball */}
      <circle cx="18" cy="18" r="9" fill={T.coral} stroke={T.ink} strokeWidth="2"/>
      <path d="M9.2 18 A9 9 0 0 0 26.8 18 Z" fill="white"/>
      <rect x="9" y="16.5" width="18" height="3" fill={T.ink}/>
      <circle cx="18" cy="18" r="2.8" fill="white" stroke={T.ink} strokeWidth="2"/>
    </svg>
  );
}

// ─── PHONE SHELL ──────────────────────────────────────────
// On mobile: full-screen. On desktop (when used in preview): 345px shell.
export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .rn-shell {
          width: 100%;
          max-width: 100%;
          background: #C9E9F7;
          border-radius: 0;
          overflow-x: hidden;
          position: relative;
          min-height: 100vh;
          box-shadow: none;
        }
        .rn-scroll {
          max-height: none !important;
          overflow-y: visible !important;
        }
      `}</style>
      <div className="rn-shell">{children}</div>
    </>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────
export function SectionHeader({ title, link, onLink }: { title: string; link?: string; onLink?: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px 10px" }}>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 900, color: T.ink }}>{title}</span>
      {link && <span onClick={onLink} style={{ fontSize: "12px", fontWeight: 700, color: T.lavender, cursor: "pointer" }}>{link}</span>}
    </div>
  );
}

// ─── SEARCH BAR ───────────────────────────────────────────
export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div style={{ margin: "0 16px 13px", background: T.white, border: `1.5px solid ${T.border}`, borderRadius: "18px", display: "flex", alignItems: "center", padding: "9px 13px", gap: "8px", boxShadow: T.s1 }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" opacity={0.4}>
        <circle cx="6" cy="6" r="5" stroke={T.ink} strokeWidth="1.5"/>
        <path d="M10 10L13 13" stroke={T.ink} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <input placeholder={placeholder} style={{ border: "none", outline: "none", flex: 1, fontFamily: "'Inter', sans-serif", fontSize: "13px", color: T.inkMid, background: "transparent" }} />
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────
function HomeIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M2 10L11 2L20 10V20H14V14H8V20H2V10Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill={active ? T.navy : "none"}/></svg>;
}
function MarketIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M6 2L3 7H19L16 2H6Z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" fill={active ? "rgba(28,35,64,0.12)" : "none"}/><path d="M3 7V19C3 19.6 3.4 20 4 20H18C18.6 20 19 19.6 19 19V7" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><path d="M9 11H13M11 9V13" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>;
}
function TradeIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 8H18M18 8L14 4M18 8L14 12" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 14H4M4 14L8 10M4 14L8 18" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function CommunityIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="8" cy="8" r="3" stroke={c} strokeWidth="1.7"/><circle cx="15" cy="7" r="2.5" stroke={c} strokeWidth="1.5"/><path d="M2 18C2 15.2 4.7 13 8 13C11.3 13 14 15.2 14 18" stroke={c} strokeWidth="1.7" strokeLinecap="round"/><path d="M15 12C17.2 12 19 13.6 19 17" stroke={c} strokeWidth="1.5" strokeLinecap="round"/></svg>;
}
function ProfileIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="7" r="4" stroke={c} strokeWidth="1.7"/><path d="M3 20C3 16.7 6.6 14 11 14C15.4 14 19 16.7 19 20" stroke={c} strokeWidth="1.7" strokeLinecap="round"/></svg>;
}

const NAV_ITEMS = [
  { label: "Home",      screen: "Home"        as Screen, Icon: HomeIcon      },
  { label: "Market",    screen: "Marketplace" as Screen, Icon: MarketIcon    },
  { label: "Trade",     screen: "TradeHub"    as Screen, Icon: TradeIcon     },
  { label: "Community", screen: "Community"   as Screen, Icon: CommunityIcon },
  { label: "Profile",   screen: "Profile"     as Screen, Icon: ProfileIcon   },
];

export function BottomNav({ active, onNavigate }: { active: string; onNavigate: (screen: Screen) => void }) {
  return (
    <>
      {/* Spacer so content isn't hidden under the sticky nav */}
      <div style={{ height: "72px" }} />
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,0.97)",
        borderTop: `1px solid ${T.border}`,
        display: "flex", justifyContent: "space-around",
        padding: "10px 0 max(14px, env(safe-area-inset-bottom))",
        zIndex: 50,
        backdropFilter: "blur(10px)",
      }}>
      {NAV_ITEMS.map(({ label, screen, Icon }) => {
        const isActive = label === active;
        return (
          <div key={label} onClick={() => onNavigate(screen)} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", gap: "4px", cursor: "pointer", position: "relative", padding: "2px 6px", borderRadius: "10px", transition: "opacity 0.15s" }}>
            {isActive && <div style={{ position: "absolute", top: "-10px", width: "20px", height: "3px", background: T.navy, borderRadius: "2px" }} />}
            <Icon active={isActive} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px", fontWeight: isActive ? 700 : 500, color: isActive ? T.navy : T.inkGhost, letterSpacing: "0.02em" }}>{label}</span>
          </div>
        );
      })}
      </div>
    </>
  );
}
