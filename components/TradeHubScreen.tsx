"use client";

import { useState } from "react";
import {
  Screen, NavProps, T,
  StatusBar, PhoneShell, SectionHeader, SearchBar, BottomNav, LogoBall,
} from "./shared";

// ─── DATA ──────────────────────────────────────────────────────────────────────
const MATCHES = [
  {
    id: 1, live: true,
    user: "Rahul_TCG",    city: "Mumbai",    rating: "4.9", trades: 143, score: 98,
    avatarBg: "#FFF5C0",  avatarLetter: "R",
    offering:   { name: "Luffy Gear 5 R",   val: "₹3,400",   bg: "#E4F4FB" },
    requesting: { name: "Charizard ex SAR", val: "₹24,500",  bg: "#FFF0ED" },
    gapLabel: "You receive", gap: "+₹21,100",
  },
  {
    id: 2, live: false,
    user: "CardKing_BLR", city: "Bengaluru", rating: "4.8", trades: 87,  score: 94,
    avatarBg: "#C0F0DC",  avatarLetter: "C",
    offering:   { name: "Zoro Alt Art R",   val: "₹2,900",   bg: "#EDFBF4" },
    requesting: { name: "Charizard ex SAR", val: "₹24,500",  bg: "#FFF0ED" },
    gapLabel: "You receive", gap: "+₹21,600",
  },
  {
    id: 3, live: false,
    user: "PokeFan_MUM",  city: "Mumbai",    rating: "5.0", trades: 62,  score: 99,
    avatarBg: "#E4F4FB",  avatarLetter: "P",
    offering:   { name: "Umbreon VMAX Alt", val: "₹8,500",   bg: "#EDFBF4" },
    requesting: { name: "Any PSA 10 card",  val: "₹8k–₹30k", bg: "#FFF5C0" },
    gapLabel: "Range",    gap: "Negotiable",
  },
];

const LISTINGS = [
  { id: 1, user: "TCG_Kerala",   city: "Thrissur",  offering: "Mewtwo ex SAR",  requesting: "Pikachu V Alt",  val: "~₹5,800",  avatarBg: "#E4F4FB", letter: "T" },
  { id: 2, user: "Nami_Collect", city: "Chennai",   offering: "Nami Alt Art",   requesting: "Any Luffy card", val: "~₹1,600",  avatarBg: "#F3F1FF", letter: "N" },
  { id: 3, user: "ShinySeller",  city: "Hyderabad", offering: "Base Charizard", requesting: "SAR PSA 9+",     val: "~₹45,000", avatarBg: "#FFF0ED", letter: "S" },
];

const ACTIVE_TRADES = [
  {
    id: 1,
    title: "Charizard ex ⇄ Luffy Gear 5",
    with: "Rahul_TCG", withCity: "Mumbai",
    note: "2 new messages",
    status: "Pending", statusBg: "#F3F1FF", statusColor: "#6B5AC4", dot: "#6B5AC4",
    stage: 1,
    escrowSteps: [
      { label: "Offer Sent",        done: true,  active: false, time: "May 14, 2:20 PM" },
      { label: "Awaiting Confirm",  done: false, active: true,  time: "Pending..." },
      { label: "Escrow Started",    done: false, active: false, time: "" },
      { label: "Card Shipped",      done: false, active: false, time: "" },
      { label: "Verified & Paid",   done: false, active: false, time: "" },
    ],
    latestUpdate: "Waiting for Rahul_TCG to confirm the trade offer.",
  },
  {
    id: 2,
    title: "Umbreon VMAX ⇄ Mewtwo ex",
    with: "TCG_Kerala", withCity: "Thrissur",
    note: "Escrow in progress",
    status: "Escrow", statusBg: "#EDFBF4", statusColor: "#16854E", dot: "#20B870",
    stage: 3,
    escrowSteps: [
      { label: "Offer Sent",        done: true,  active: false, time: "May 12, 10:00 AM" },
      { label: "Confirmed",         done: true,  active: false, time: "May 12, 11:30 AM" },
      { label: "Escrow Started",    done: true,  active: false, time: "May 13, 9:00 AM" },
      { label: "Card Shipped",      done: false, active: true,  time: "Awaiting shipment..." },
      { label: "Verified & Paid",   done: false, active: false, time: "" },
    ],
    latestUpdate: "RareNook escrow is active. Ship your card to our verification centre.",
  },
  {
    id: 3,
    title: "Pikachu Alt Art trade",
    with: "PokeFan_MUM", withCity: "Mumbai",
    note: "Awaiting shipment",
    status: "Shipping", statusBg: "#FFF0ED", statusColor: "#E8402A", dot: "#E8402A",
    stage: 4,
    escrowSteps: [
      { label: "Offer Sent",        done: true,  active: false, time: "May 10, 3:00 PM" },
      { label: "Confirmed",         done: true,  active: false, time: "May 10, 4:15 PM" },
      { label: "Escrow Started",    done: true,  active: false, time: "May 11, 9:00 AM" },
      { label: "Card Shipped",      done: true,  active: false, time: "May 13, 11:00 AM" },
      { label: "Verified & Paid",   done: false, active: true,  time: "In transit to buyer..." },
    ],
    latestUpdate: "Card dispatched via India Post. Estimated delivery May 17.",
  },
];

const TRENDING = [
  { rank: 1, name: "Charizard ex SAR",  trades: "34 requests this week", change: "↑ 40%", up: true,  bg: "#FFF0ED" },
  { rank: 2, name: "Luffy Gear 5 R",    trades: "28 requests this week", change: "↑ 24%", up: true,  bg: "#E4F4FB" },
  { rank: 3, name: "Umbreon VMAX Alt",  trades: "19 requests this week", change: "↑ 11%", up: true,  bg: "#EDFBF4" },
  { rank: 4, name: "Mewtwo ex SAR",     trades: "15 requests this week", change: "↓ 4%",  up: false, bg: "#F3F1FF" },
];

// ─── OVERLAY BASE ──────────────────────────────────────────────────────────────
function Overlay({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 800,
        background: "rgba(28,35,64,0.45)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        backdropFilter: "blur(3px)",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{transform:translateY(24px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "345px", background: T.white,
          borderRadius: "24px 24px 0 0",
          padding: "20px 20px 32px",
          boxShadow: T.s3,
          animation: "slideUp 0.2s ease",
          maxHeight: "88vh", overflowY: "auto",
        }}
      >
        {/* Drag handle */}
        <div style={{ width: "36px", height: "4px", background: T.inkGhost, borderRadius: "2px", margin: "0 auto 18px" }} />
        {children}
      </div>
    </div>
  );
}

// ─── "DEMO NOT AVAILABLE" OVERLAY ──────────────────────────────────────────────
function MatchDemoOverlay({ match, onClose }: {
  match: typeof MATCHES[0];
  onClose: () => void;
}) {
  return (
    <Overlay onClose={onClose}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: match.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 900, color: T.ink, border: `1.5px solid ${T.border}` }}>{match.avatarLetter}</div>
        <div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.ink }}>{match.user}</div>
          <div style={{ fontSize: "11px", color: T.inkSoft }}>{match.city} · ⭐ {match.rating} · {match.trades} trades</div>
        </div>
        <div style={{ marginLeft: "auto", background: T.mintSoft, color: "#16854E", fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "3px 9px", borderRadius: "50px", border: `1.5px solid ${T.mint}` }}>🛡 {match.score}</div>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{ flex: 1, background: match.offering.bg, borderRadius: "14px", padding: "12px 10px", textAlign: "center" as const }}>
          <div style={{ fontSize: "32px", marginBottom: "6px" }}>🃏</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{match.offering.name}</div>
          <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "3px" }}>{match.offering.val}</div>
        </div>
        <div style={{ fontSize: "18px", color: T.inkGhost }}>⇄</div>
        <div style={{ flex: 1, background: match.requesting.bg, borderRadius: "14px", padding: "12px 10px", textAlign: "center" as const }}>
          <div style={{ fontSize: "32px", marginBottom: "6px" }}>🃏</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{match.requesting.name}</div>
          <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "3px" }}>{match.requesting.val}</div>
        </div>
      </div>

      {/* Value gap */}
      <div style={{ background: T.mintSoft, borderRadius: "12px", padding: "10px 13px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "11px", color: T.inkSoft, fontWeight: 600 }}>{match.gapLabel}</div>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.mint }}>{match.gap}</div>
      </div>

      {/* Demo notice */}
      <div style={{ background: T.skySoft, borderRadius: "12px", padding: "12px 14px", marginBottom: "18px", borderLeft: `3px solid ${T.navy}` }}>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.navy, marginBottom: "4px" }}>🚧 Trade flow demo not available yet</div>
        <div style={{ fontSize: "11px", color: T.inkMid, lineHeight: 1.6 }}>Full trade negotiation for this match is coming soon. Only the first suggested match has a live demo right now.</div>
      </div>

      <div onClick={onClose} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>
        Got it
      </div>
    </Overlay>
  );
}

// ─── LISTING DETAIL OVERLAY ───────────────────────────────────────────────────
function ListingOverlay({ listing, onClose }: {
  listing: typeof LISTINGS[0];
  onClose: () => void;
}) {
  return (
    <Overlay onClose={onClose}>
      <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink, marginBottom: "16px" }}>Trade Listing</div>

      {/* Seller */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 13px", background: T.skySoft, borderRadius: "14px", marginBottom: "14px" }}>
        <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: listing.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 900, color: T.ink, border: `1.5px solid ${T.border}`, flexShrink: 0 }}>{listing.letter}</div>
        <div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 800, color: T.ink }}>{listing.user}</div>
          <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "1px" }}>{listing.city}</div>
        </div>
      </div>

      {/* Offered / Requested */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
        <div style={{ background: T.white, borderRadius: "14px", padding: "12px", border: `1.5px solid ${T.border}`, textAlign: "center" as const }}>
          <div style={{ fontSize: "9px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "8px" }}>Offering</div>
          <div style={{ fontSize: "28px", marginBottom: "6px" }}>🃏</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{listing.offering}</div>
        </div>
        <div style={{ background: T.white, borderRadius: "14px", padding: "12px", border: `1.5px solid ${T.border}`, textAlign: "center" as const }}>
          <div style={{ fontSize: "9px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: "8px" }}>Wants</div>
          <div style={{ fontSize: "28px", marginBottom: "6px" }}>🔍</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{listing.requesting}</div>
        </div>
      </div>

      {/* Value row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 13px", background: T.mintSoft, borderRadius: "12px", marginBottom: "14px" }}>
        <div style={{ fontSize: "12px", color: T.inkSoft, fontWeight: 600 }}>Estimated Value</div>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.mint }}>{listing.val}</div>
      </div>

      {/* Coming soon notice */}
      <div style={{ background: T.skySoft, borderRadius: "12px", padding: "11px 14px", marginBottom: "18px", borderLeft: `3px solid ${T.navy}` }}>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.navy, marginBottom: "3px" }}>🚧 Trading flow coming soon</div>
        <div style={{ fontSize: "11px", color: T.inkMid, lineHeight: 1.6 }}>You'll be able to respond to this listing, send a counter offer, and start escrow — all from this screen.</div>
      </div>

      <div onClick={onClose} style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>
        Close
      </div>
    </Overlay>
  );
}

// ─── TRADE STATUS OVERLAY ─────────────────────────────────────────────────────
function TradeStatusOverlay({ trade, onClose }: {
  trade: typeof ACTIVE_TRADES[0];
  onClose: () => void;
}) {
  return (
    <Overlay onClose={onClose}>
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 900, color: T.ink, flex: 1, paddingRight: "12px", lineHeight: 1.3 }}>{trade.title}</div>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "4px 10px", borderRadius: "8px", background: trade.statusBg, color: trade.statusColor, flexShrink: 0 }}>{trade.status}</div>
      </div>

      {/* Trade partner */}
      <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "10px 13px", background: T.skySoft, borderRadius: "12px", marginBottom: "16px" }}>
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: trade.dot, flexShrink: 0 }} />
        <div style={{ fontSize: "12px", color: T.inkMid, fontWeight: 600 }}>Trading with <span style={{ fontWeight: 800, color: T.ink }}>{trade.with}</span> · {trade.withCity}</div>
      </div>

      {/* Escrow timeline */}
      <div style={{ marginBottom: "16px" }}>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink, marginBottom: "12px" }}>🔒 Escrow Progress</div>
        {trade.escrowSteps.map((step, i) => (
          <div key={`step-${trade.id}-${i}`} style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: i < trade.escrowSteps.length - 1 ? "0" : "0" }}>
            {/* Line + dot */}
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "center", flexShrink: 0 }}>
              <div style={{
                width: "22px", height: "22px", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px",
                background: step.done ? T.mint : step.active ? T.yellow : T.skySoft,
                border: `2px solid ${step.done ? T.mint : step.active ? T.navy : T.inkGhost}`,
                color: step.done ? T.white : step.active ? T.navy : T.inkGhost,
                fontWeight: 800, fontFamily: "Nunito, sans-serif",
              }}>
                {step.done ? "✓" : i + 1}
              </div>
              {i < trade.escrowSteps.length - 1 && (
                <div style={{ width: "2px", height: "20px", background: step.done ? T.mint : T.inkGhost, opacity: 0.3 }} />
              )}
            </div>
            {/* Label */}
            <div style={{ paddingTop: "2px", paddingBottom: "18px" }}>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: step.active ? 800 : 600, color: step.active ? T.ink : step.done ? T.inkMid : T.inkGhost }}>{step.label}</div>
              {step.time && <div style={{ fontSize: "10px", color: step.active ? T.lavender : T.inkGhost, marginTop: "2px" }}>{step.time}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Latest update */}
      <div style={{ background: T.skySoft, borderRadius: "12px", padding: "11px 13px", marginBottom: "14px", borderLeft: `3px solid ${T.navy}` }}>
        <div style={{ fontSize: "10px", fontWeight: 700, color: T.inkSoft, textTransform: "uppercase" as const, letterSpacing: "0.05em", marginBottom: "4px" }}>Latest Update</div>
        <div style={{ fontSize: "12px", color: T.inkMid, lineHeight: 1.6 }}>{trade.latestUpdate}</div>
      </div>

      {/* Support CTA */}
      <div style={{ display: "flex", gap: "9px" }}>
        <div
          onClick={onClose}
          style={{ flex: 1, padding: "12px 0", background: T.navy, borderRadius: "12px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}
        >
          💬 Chat Support
        </div>
        <div
          onClick={onClose}
          style={{ flex: 1, padding: "12px 0", background: "transparent", border: `1.5px solid ${T.borderMid}`, borderRadius: "12px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkMid, textAlign: "center" as const, cursor: "pointer" }}
        >
          Close
        </div>
      </div>
    </Overlay>
  );
}

// ─── MATCH CARD COMPONENT ─────────────────────────────────────────────────────
function MatchCard({ match, onView, onOffer }: {
  match: typeof MATCHES[0];
  onView: () => void;
  onOffer: () => void;
}) {
  return (
    <div style={{ margin: "0 16px 12px", background: T.white, borderRadius: "22px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "12px 14px 10px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: match.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, flexShrink: 0, border: `1.5px solid ${T.border}` }}>{match.avatarLetter}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 800, color: T.ink }}>{match.user}</div>
          <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "1px" }}>{match.city} · ⭐ {match.rating} · {match.trades} trades</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {match.live && (
            <div style={{ display: "flex", alignItems: "center", gap: "3px", background: "#EDFBF4", padding: "2px 8px", borderRadius: "50px", border: `1px solid ${T.mint}` }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.mint }} />
              <span style={{ fontFamily: "Nunito, sans-serif", fontSize: "9px", fontWeight: 800, color: T.mint }}>Live</span>
            </div>
          )}
          <div style={{ background: T.mintSoft, color: "#16854E", fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "3px 9px", borderRadius: "50px", border: `1.5px solid ${T.mint}` }}>🛡 {match.score}</div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "flex", alignItems: "center", padding: "0 14px 12px", gap: "8px" }}>
        <div style={{ flex: 1, background: match.offering.bg, borderRadius: "12px", padding: "10px 8px", textAlign: "center" as const }}>
          <div style={{ fontSize: "28px", marginBottom: "4px" }}>🃏</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, color: T.ink, lineHeight: 1.2 }}>{match.offering.name}</div>
          <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "3px" }}>{match.offering.val}</div>
        </div>
        <div style={{ fontSize: "16px", color: T.inkGhost, flexShrink: 0 }}>⇄</div>
        <div style={{ flex: 1, background: match.requesting.bg, borderRadius: "12px", padding: "10px 8px", textAlign: "center" as const }}>
          <div style={{ fontSize: "28px", marginBottom: "4px" }}>🃏</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, color: T.ink, lineHeight: 1.2 }}>{match.requesting.name}</div>
          <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "3px" }}>{match.requesting.val}</div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px 12px", borderTop: `1px solid ${T.border}` }}>
        <div>
          <div style={{ fontSize: "10px", color: T.inkSoft, fontWeight: 600 }}>{match.gapLabel}</div>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.mint, marginTop: "1px" }}>{match.gap}</div>
        </div>
        <div style={{ display: "flex", gap: "7px" }}>
          <div onClick={onView} style={{ padding: "7px 14px", background: T.navy, borderRadius: "9px", fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 800, color: T.yellow, cursor: "pointer" }}>View</div>
          <div onClick={onOffer} style={{ padding: "7px 14px", background: "transparent", border: `1.5px solid ${T.borderMid}`, borderRadius: "9px", fontFamily: "Nunito, sans-serif", fontSize: "11px", fontWeight: 700, color: T.inkMid, cursor: "pointer" }}>Offer</div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB CONFIG ───────────────────────────────────────────────────────────────
// live = fully functional, coming = shows coming-soon overlay, myTrades = local state
type TabId = "Open Trades" | "Wishlist Match" | "Verified" | "My Trades";

const TAB_CONFIG: Record<TabId, {
  live: boolean;
  icon: string;
  title: string;
  message: string;
  features: { icon: string; label: string; sub: string }[];
}> = {
  "Open Trades": {
    live: true,
    icon: "", title: "", message: "", features: [],
  },
  "Wishlist Match": {
    live: false,
    icon: "🎯",
    title: "Wishlist Matching",
    message: "Wishlist matching is coming soon. Add cards to your wishlist and RareNook will automatically surface collectors who have them — and want yours.",
    features: [
      { icon: "🔔", label: "Auto-match alerts",     sub: "Get notified when a match is found"        },
      { icon: "🃏", label: "Smart card pairing",    sub: "AI-powered trade value suggestions"        },
      { icon: "⚖️", label: "Balanced trade finder", sub: "Find trades with minimal balance payments" },
    ],
  },
  "Verified": {
    live: false,
    icon: "🛡",
    title: "Verified Traders Only",
    message: "Verified-only trade filtering will be available in the next update. This will let you browse exclusively from collectors with a verified trust score above 90.",
    features: [
      { icon: "✅", label: "ID-verified collectors", sub: "All users go through KYC verification"  },
      { icon: "📦", label: "Escrow-guaranteed only",  sub: "Every trade backed by RareNook escrow" },
      { icon: "⭐", label: "4.8+ rated traders",      sub: "Filter by minimum seller rating"       },
    ],
  },
  "My Trades": {
    live: true,
    icon: "", title: "", message: "", features: [],
  },
};

// ─── COMING SOON TAB VIEW ─────────────────────────────────────────────────────
function ComingSoonTabView({ tabId, onDismiss }: { tabId: TabId; onDismiss: () => void }) {
  const cfg = TAB_CONFIG[tabId];
  return (
    <div style={{ margin: "0 16px 16px" }}>
      {/* Hero card */}
      <div style={{
        background: `linear-gradient(135deg, ${T.skySoft}, ${T.lavSoft})`,
        borderRadius: "22px", padding: "24px 20px 20px",
        border: `1.5px solid ${T.border}`,
        boxShadow: T.s1,
        textAlign: "center" as const,
        marginBottom: "14px",
      }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>{cfg.icon}</div>
        <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink, marginBottom: "8px" }}>{cfg.title}</div>
        <div style={{ display: "inline-block", background: T.yellow, color: T.navy, fontFamily: "Nunito, sans-serif", fontSize: "9px", fontWeight: 800, padding: "3px 10px", borderRadius: "50px", border: `1.5px solid ${T.navy}`, marginBottom: "12px" }}>Coming Soon</div>
        <div style={{ fontSize: "12px", color: T.inkMid, lineHeight: 1.7 }}>{cfg.message}</div>
      </div>

      {/* Features */}
      <div style={{ background: T.white, borderRadius: "18px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, overflow: "hidden", marginBottom: "14px" }}>
        {cfg.features.map((f, i) => (
          <div key={`feat-${i}`} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: T.skySoft, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", flexShrink: 0 }}>{f.icon}</div>
            <div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.ink }}>{f.label}</div>
              <div style={{ fontSize: "11px", color: T.inkSoft, marginTop: "1px" }}>{f.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Notify me CTA */}
      <div
        onClick={onDismiss}
        style={{ width: "100%", padding: "13px 0", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer", marginBottom: "9px", boxShadow: `2px 3px 0 rgba(28,35,64,0.18)`, transition: "transform 0.15s" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
      >
        🔔 Notify Me When Live
      </div>
      <div
        onClick={onDismiss}
        style={{ width: "100%", padding: "11px 0", background: "transparent", border: `1.5px solid ${T.border}`, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 700, color: T.inkMid, textAlign: "center" as const, cursor: "pointer" }}
      >
        Back to Open Trades
      </div>
    </div>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────────────────────────
export default function TradeHubScreen({ onNavigate }: NavProps) {
  const [activeTab, setActiveTab] = useState<TabId>("Open Trades");

  // Overlay states — typed properly
  const [demoMatch, setDemoMatch]         = useState<typeof MATCHES[0] | null>(null);
  const [activeListing, setActiveListing] = useState<typeof LISTINGS[0] | null>(null);
  const [activeTrade, setActiveTrade]     = useState<typeof ACTIVE_TRADES[0] | null>(null);
  const [seeAllModal, setSeeAllModal]     = useState<string | null>(null);
  const [notifyModal, setNotifyModal]     = useState<TabId | null>(null);

  const tabs: TabId[] = ["Open Trades", "Wishlist Match", "Verified", "My Trades"];

  function handleTabClick(tab: TabId) {
    if (TAB_CONFIG[tab].live) {
      setActiveTab(tab);
    } else {
      // Show coming-soon inline view instead of silently activating or doing nothing
      setActiveTab(tab);
    }
  }

  function handleMatchView(match: typeof MATCHES[0]) {
    if (match.live) {
      onNavigate("TradeOffer" as Screen);
    } else {
      setDemoMatch(match);
    }
  }

  return (
    <>
      {/* Overlays */}
      {demoMatch    && <MatchDemoOverlay    match={demoMatch}      onClose={() => setDemoMatch(null)}      />}
      {activeListing && <ListingOverlay     listing={activeListing} onClose={() => setActiveListing(null)} />}
      {activeTrade  && <TradeStatusOverlay  trade={activeTrade}     onClose={() => setActiveTrade(null)}   />}

      {/* Notify me confirmation overlay */}
      {notifyModal && (
        <Overlay onClose={() => setNotifyModal(null)}>
          <div style={{ padding: "4px 4px 0", textAlign: "center" as const }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔔</div>
            <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink, marginBottom: "8px" }}>You're on the list!</div>
            <div style={{ fontSize: "12px", color: T.inkSoft, lineHeight: 1.7, marginBottom: "22px" }}>
              We'll notify you as soon as <strong style={{ color: T.ink }}>{notifyModal}</strong> goes live. You'll be among the first to access it.
            </div>
            <div onClick={() => { setNotifyModal(null); setActiveTab("Open Trades"); }} style={{ width: "100%", padding: "13px", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>Got it</div>
          </div>
        </Overlay>
      )}

      {/* See-all info overlay */}
      {seeAllModal && (
        <Overlay onClose={() => setSeeAllModal(null)}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "16px", fontWeight: 900, color: T.ink, marginBottom: "10px" }}>{seeAllModal}</div>
          <div style={{ fontSize: "13px", color: T.inkSoft, lineHeight: 1.65, marginBottom: "20px" }}>Full browsing view is coming soon. You'll be able to search, sort, and filter all listings across India.</div>
          <div onClick={() => setSeeAllModal(null)} style={{ width: "100%", padding: "13px", background: T.navy, borderRadius: "14px", fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.yellow, textAlign: "center" as const, cursor: "pointer" }}>Got it</div>
        </Overlay>
      )}

      <PhoneShell>
        <StatusBar />

        {/* Top Nav */}
        <div style={{ background: T.sky, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 18px 12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", fontFamily: "Nunito, sans-serif", fontSize: "18px", fontWeight: 900, color: T.navy }}>
              <LogoBall /> Trade Hub
            </div>
            <div style={{ fontSize: "9px", fontWeight: 600, color: T.inkSoft, letterSpacing: "0.06em", textTransform: "uppercase" as const, marginTop: "2px" }}>
              Discover collectors &amp; open trades
            </div>
          </div>
          <div
            onClick={() => setSeeAllModal("List a Trade")}
            style={{ background: T.yellow, border: `2px solid ${T.navy}`, borderRadius: "9px", padding: "6px 12px", fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 900, color: T.navy, boxShadow: `2px 2px 0 ${T.navy}`, cursor: "pointer" }}
          >+ List</div>
        </div>

        <div style={{ maxHeight: "636px", overflowY: "auto", overflowX: "hidden" }}>
          <SearchBar placeholder="Search cards, collectors, or trades..." />

          {/* Tabs */}
          <div style={{ display: "flex", gap: "7px", padding: "0 16px 14px", overflowX: "auto" }}>
            {tabs.map(tab => {
              const isOn = tab === activeTab;
              const isLive = TAB_CONFIG[tab].live;
              return (
                <div
                  key={`tab-${tab}`}
                  onClick={() => handleTabClick(tab)}
                  style={{
                    flexShrink: 0,
                    padding: "6px 14px",
                    borderRadius: "50px",
                    fontFamily: "Nunito, sans-serif",
                    fontSize: "12px", fontWeight: 700,
                    cursor: "pointer", whiteSpace: "nowrap" as const,
                    background: isOn ? T.navy : T.white,
                    color: isOn ? T.yellow : isLive ? T.inkMid : T.inkSoft,
                    border: `1.5px solid ${isOn ? T.navy : T.border}`,
                    boxShadow: isOn ? "none" : T.s1,
                    transition: "all 0.15s",
                    display: "flex", alignItems: "center", gap: "5px",
                    opacity: isLive || isOn ? 1 : 0.75,
                  }}
                >
                  {tab}
                  {!isLive && (
                    <span style={{
                      width: "6px", height: "6px", borderRadius: "50%",
                      background: isOn ? "rgba(255,215,64,0.6)" : T.inkGhost,
                      flexShrink: 0,
                    }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ── Coming-soon tab view ── */}
          {!TAB_CONFIG[activeTab].live && (
            <ComingSoonTabView
              tabId={activeTab}
              onDismiss={() => {
                setNotifyModal(activeTab);
              }}
            />
          )}

          {/* ── OPEN TRADES content ── */}
          {activeTab === "Open Trades" && (<>
          {/* Match banner */}
          <div style={{ margin: "0 16px 14px", background: T.yellow, borderRadius: "18px", border: `2px solid ${T.navy}`, boxShadow: `3px 3px 0 ${T.navy}`, padding: "13px 15px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.navy }}>🎯 3 Wishlist Matches!</div>
              <div style={{ fontSize: "11px", color: T.navy, opacity: 0.7, marginTop: "3px", fontWeight: 600 }}>Collectors want your Charizard ex SAR</div>
            </div>
            <div style={{ fontSize: "32px" }}>🃏</div>
          </div>

          {/* Suggested matches */}
          <SectionHeader
            title="✨ Suggested Matches"
            link="See all ›"
            onLink={() => setSeeAllModal("All Matches")}
          />
          {MATCHES.map(match => (
            <MatchCard
              key={`match-${match.id}`}
              match={match}
              onView={() => handleMatchView(match)}
              onOffer={() => handleMatchView(match)}
            />
          ))}

          {/* Active listings */}
          <SectionHeader
            title="📋 Active Listings"
            link="24 open ›"
            onLink={() => setSeeAllModal("All Active Listings")}
          />
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "20px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
            {LISTINGS.map((listing, i) => (
              <div
                key={`listing-${listing.id}`}
                onClick={() => setActiveListing(listing)}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 13px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.skySoft}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: listing.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Nunito, sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, flexShrink: 0 }}>{listing.letter}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700, color: T.ink }}>{listing.user} · <span style={{ color: T.inkSoft, fontWeight: 400 }}>{listing.city}</span></div>
                  <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px" }}>{listing.offering} ⇄ {listing.requesting}</div>
                </div>
                <div style={{ textAlign: "right" as const }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 900, color: T.ink }}>{listing.val}</div>
                  <div style={{ marginTop: "4px", background: T.navy, borderRadius: "7px", padding: "2px 9px", fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, color: T.yellow }}>View</div>
                </div>
              </div>
            ))}
          </div>
          </>)}

          {/* ── MY TRADES content ── */}
          {activeTab === "My Trades" && (<>
          <SectionHeader title="⇄ My Active Trades" link="Manage ›" onLink={() => setSeeAllModal("Manage Trades")} />
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "20px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
            {ACTIVE_TRADES.map((trade, i) => (
              <div
                key={`trade-${trade.id}`}
                onClick={() => setActiveTrade(trade)}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 13px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = T.skySoft}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
              >
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: trade.dot, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700, color: T.ink }}>{trade.title}</div>
                  <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px" }}>with {trade.with} · {trade.note}</div>
                </div>
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "9px", fontWeight: 800, padding: "3px 9px", borderRadius: "7px", background: trade.statusBg, color: trade.statusColor }}>{trade.status}</div>
              </div>
            ))}
          </div>
          </>)}

          {/* ── Trending — shown on live tabs only ── */}
          {TAB_CONFIG[activeTab].live && (<>
          <SectionHeader title="🔥 Trending Trades" link="This week ›" />
          <div style={{ margin: "0 16px 16px", background: T.white, borderRadius: "20px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
            {TRENDING.map((t, i) => (
              <div
                key={`trending-${t.rank}`}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 13px", borderTop: i > 0 ? `1px solid rgba(28,35,64,0.06)` : "none" }}
              >
                <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, color: T.inkGhost, width: "18px", flexShrink: 0 }}>{t.rank}</div>
                <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>🃏</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700, color: T.ink }}>{t.name}</div>
                  <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "1px" }}>{t.trades}</div>
                </div>
                <div style={{ fontSize: "11px", fontWeight: 800, color: t.up ? T.mint : T.coral }}>{t.change}</div>
              </div>
            ))}
          </div>
          </>)}

          <div style={{ height: "14px" }} />
        </div>

        <BottomNav active="Trade" onNavigate={onNavigate} />
      </PhoneShell>
    </>
  );
}
