"use client";

// ─── TYPES ───────────────────────────────────────────────
export type Screen = "Home" | "Marketplace" | "CardDetail" | "TradeHub" | "TradeOffer" | "Community" | "Profile";

export type NavProps = {
  onNavigate: (screen: Screen) => void;
};

// ─── ALL CARDS DATA ───────────────────────────────────────
export const ALL_CARDS = [
  { id: 1,  no: "006", name: "Charizard ex SAR",   set: "SV151 · EN · 2023",      price: "₹24,500",   cond: "PSA 10",    condType: "psa" as const, bg: "#FFF0ED", type: "🔥", category: "pokemon",  real: true  },
  { id: 2,  no: "150", name: "Mewtwo ex SAR",       set: "SV151 · EN · 2023",      price: "₹5,800",    cond: "Near Mint", condType: "nm"  as const, bg: "#F3F1FF", type: "🔮", category: "pokemon",  real: true  },
  { id: 3,  no: "025", name: "Pikachu V Alt Art",   set: "Fusion Strike · EN",     price: "₹2,100",    cond: "Near Mint", condType: "nm"  as const, bg: "#FFF5C0", type: "⚡", category: "pokemon",  real: true  },
  { id: 4,  no: "197", name: "Umbreon VMAX Alt",    set: "Evolving Skies · EN",    price: "₹8,500",    cond: "Near Mint", condType: "nm"  as const, bg: "#EDFBF4", type: "🌙", category: "pokemon",  real: false },
  { id: 5,  no: "009", name: "Blastoise ex SAR",    set: "SV151 · EN · 2023",      price: "₹3,200",    cond: "Near Mint", condType: "nm"  as const, bg: "#E4F4FB", type: "💧", category: "pokemon",  real: false },
  { id: 6,  no: "006", name: "Charizard Base 1st",  set: "Base Set · EN · 1999",   price: "₹1,24,000", cond: "PSA 9",     condType: "psa" as const, bg: "#FFF0ED", type: "⭐", category: "pokemon",  real: false },
  { id: 7,  no: "OP1", name: "Luffy Gear 5 R",      set: "OP-06 · JP · 2024",      price: "₹3,400",    cond: "Near Mint", condType: "nm"  as const, bg: "#E4F4FB", type: "👊", category: "onepiece", real: false },
  { id: 8,  no: "OP2", name: "Zoro Alt Art R",      set: "OP-01 · JP · 2022",      price: "₹2,900",    cond: "Near Mint", condType: "nm"  as const, bg: "#EDFBF4", type: "⚔️", category: "onepiece", real: false },
];

export const MOVERS = [
  { id: 7,  name: "Luffy Gear 5 R",   price: "₹3,400", change: "↑ 24%", up: true,  bg: "#E4F4FB", category: "onepiece" },
  { id: 8,  name: "Zoro Alt Art R",   price: "₹2,900", change: "↑ 9%",  up: true,  bg: "#F3F1FF", category: "onepiece" },
  { id: 4,  name: "Umbreon VMAX Alt", price: "₹8,500", change: "↑ 6%",  up: true,  bg: "#EDFBF4", category: "pokemon"  },
];

export const SALES = [
  { name: "Pikachu V Alt Art · NM · EN", by: "CardKing_BLR · 2h ago",  price: "₹2,100", dot: "#E8402A" },
  { name: "Rob Lucci SAR · NM · JP",     by: "PokeFan_MUM · 5h ago",   price: "₹1,800", dot: "#9DD0EA" },
  { name: "Umbreon VMAX Alt · NM · EN",  by: "TCG_Kerala · 8h ago",    price: "₹8,500", dot: "#6B5AC4" },
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

// ─── MODAL ────────────────────────────────────────────────
export function Modal({ title, message, onClose }: {
  title: string;
  message: string;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(28,35,64,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: "20px",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: T.white, borderRadius: "24px",
          padding: "28px 24px", maxWidth: "300px", width: "100%",
          boxShadow: T.s3, textAlign: "center",
        }}
      >
        <div style={{ fontSize: "40px", marginBottom: "14px" }}>
          {title.includes("soon") ? "🚧" : title.includes("listed") ? "📋" : "ℹ️"}
        </div>
        <div style={{
          fontFamily: "Nunito, sans-serif", fontSize: "17px",
          fontWeight: 900, color: T.ink, marginBottom: "8px",
        }}>{title}</div>
        <div style={{
          fontSize: "13px", color: T.inkSoft,
          lineHeight: 1.6, marginBottom: "22px",
        }}>{message}</div>
        <button
          onClick={onClose}
          style={{
            background: T.navy, color: T.yellow,
            fontFamily: "Nunito, sans-serif", fontWeight: 800,
            fontSize: "14px", padding: "12px 32px",
            borderRadius: "14px", border: "none",
            cursor: "pointer", width: "100%",
          }}
        >
          Got it
        </button>
      </div>
    </div>
  );
}

// ─── STATUS BAR ───────────────────────────────────────────
export function StatusBar() {
  return (
    <div style={{
      background: T.sky,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "13px 22px 2px",
      fontFamily: "Nunito, sans-serif", fontSize: "11px",
      fontWeight: 800, color: T.ink,
    }}>
      <span>9:41</span>
      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <rect x="0" y="4" width="3" height="7" rx="1" fill={T.ink} opacity="0.4"/>
          <rect x="4.5" y="2.5" width="3" height="8.5" rx="1" fill={T.ink} opacity="0.6"/>
          <rect x="9" y="0" width="3" height="11" rx="1" fill={T.ink}/>
          <rect x="13.5" y="2" width="3" height="7" rx="1" fill={T.ink} opacity="0.3"/>
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 2C9.8 2 11.9 3.1 13.2 4.8L14.5 3.4C12.8 1.3 10.3 0 7.5 0C4.7 0 2.2 1.3 0.5 3.4L1.8 4.8C3.1 3.1 5.2 2 7.5 2Z" fill={T.ink} opacity="0.4"/>
          <path d="M7.5 5C9 5 10.3 5.7 11.2 6.8L12.5 5.4C11.2 3.9 9.4 3 7.5 3C5.6 3 3.8 3.9 2.5 5.4L3.8 6.8C4.7 5.7 6 5 7.5 5Z" fill={T.ink} opacity="0.7"/>
          <circle cx="7.5" cy="9" r="2" fill={T.ink}/>
        </svg>
        🔋
      </span>
    </div>
  );
}

// ─── LOGO BALL ────────────────────────────────────────────
export function LogoBall() {
  return (
    <div style={{
      width: "24px", height: "24px", borderRadius: "50%",
      border: `2px solid ${T.navy}`,
      position: "relative", overflow: "hidden", flexShrink: 0,
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "50%", background: T.coral }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: T.white }} />
      <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "2px", background: T.navy, transform: "translateY(-50%)", zIndex: 2 }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: "6px", height: "6px", background: T.white, borderRadius: "50%", border: `1.5px solid ${T.navy}`, transform: "translate(-50%,-50%)", zIndex: 3 }} />
    </div>
  );
}

// ─── PHONE SHELL ──────────────────────────────────────────
export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      width: "345px", background: T.sky, borderRadius: "44px",
      overflow: "hidden",
      boxShadow: `${T.s3}, 0 0 0 1px rgba(255,255,255,0.6) inset`,
      position: "relative",
    }}>
      {children}
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────
export function SectionHeader({ title, link, onLink }: {
  title: string;
  link?: string;
  onLink?: () => void;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 16px 10px" }}>
      <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 900, color: T.ink }}>{title}</span>
      {link && (
        <span
          onClick={onLink}
          style={{ fontSize: "12px", fontWeight: 700, color: T.lavender, cursor: "pointer" }}
        >{link}</span>
      )}
    </div>
  );
}

// ─── SEARCH BAR ───────────────────────────────────────────
export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div style={{
      margin: "0 16px 13px", background: T.white,
      border: `1.5px solid ${T.border}`, borderRadius: "18px",
      display: "flex", alignItems: "center",
      padding: "9px 13px", gap: "8px", boxShadow: T.s1,
    }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" opacity={0.4}>
        <circle cx="6" cy="6" r="5" stroke={T.ink} strokeWidth="1.5"/>
        <path d="M10 10L13 13" stroke={T.ink} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <input
        placeholder={placeholder}
        style={{
          border: "none", outline: "none", flex: 1,
          fontFamily: "Nunito Sans, sans-serif", fontSize: "13px",
          color: T.inkMid, background: "transparent",
        }}
      />
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────
// Clean SVG icons instead of emoji
function HomeIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M2 10L11 2L20 10V20H14V14H8V20H2V10Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill={active ? T.navy : "none"}/>
    </svg>
  );
}
function MarketIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M6 2L3 7H19L16 2H6Z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" fill={active ? "rgba(28,35,64,0.12)" : "none"}/>
      <path d="M3 7V19C3 19.6 3.4 20 4 20H18C18.6 20 19 19.6 19 19V7" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M9 11H13M11 9V13" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}
function TradeIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 8H18M18 8L14 4M18 8L14 12" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18 14H4M4 14L8 10M4 14L8 18" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
function CommunityIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="8" cy="8" r="3" stroke={c} strokeWidth="1.7"/>
      <circle cx="15" cy="7" r="2.5" stroke={c} strokeWidth="1.5"/>
      <path d="M2 18C2 15.2 4.7 13 8 13C11.3 13 14 15.2 14 18" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
      <path d="M15 12C17.2 12 19 13.6 19 17" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function ProfileIcon({ active }: { active: boolean }) {
  const c = active ? T.navy : T.inkGhost;
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="7" r="4" stroke={c} strokeWidth="1.7"/>
      <path d="M3 20C3 16.7 6.6 14 11 14C15.4 14 19 16.7 19 20" stroke={c} strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  );
}

const NAV_ITEMS = [
  { label: "Home",      screen: "Home"        as Screen, Icon: HomeIcon      },
  { label: "Market",    screen: "Marketplace" as Screen, Icon: MarketIcon    },
  { label: "Trade",     screen: "TradeHub"    as Screen, Icon: TradeIcon     },
  { label: "Community", screen: "Community"   as Screen, Icon: CommunityIcon },
  { label: "Profile",   screen: "Profile"     as Screen, Icon: ProfileIcon   },
];

export function BottomNav({ active, onNavigate }: {
  active: string;
  onNavigate: (screen: Screen) => void;
}) {
  return (
    <div style={{
      background: T.white,
      borderTop: `1px solid ${T.border}`,
      display: "flex", justifyContent: "space-around",
      padding: "10px 0 14px",
    }}>
      {NAV_ITEMS.map(({ label, screen, Icon }) => {
        const isActive = label === active;
        return (
          <div
            key={label}
            onClick={() => onNavigate(screen)}
            style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", gap: "4px",
              cursor: "pointer", position: "relative",
              padding: "2px 6px",
              borderRadius: "10px",
              transition: "opacity 0.15s",
            }}
          >
            {isActive && (
              <div style={{
                position: "absolute", top: "-10px",
                width: "20px", height: "3px",
                background: T.navy, borderRadius: "2px",
              }} />
            )}
            <Icon active={isActive} />
            <span style={{
              fontFamily: "Nunito, sans-serif", fontSize: "9px",
              fontWeight: isActive ? 700 : 500,
              color: isActive ? T.navy : T.inkGhost,
              letterSpacing: "0.02em",
            }}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
