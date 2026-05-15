"use client";

import { useState } from "react";
import {
  Screen, NavProps, T, condStyle, ALL_CARDS, ArtKey,
  CardArt, Modal, StatusBar, PhoneShell, SectionHeader, SearchBar, BottomNav,
} from "./shared";

const CATEGORIES = ["All", "TCG Cards", "One Piece", "Anime", "Graded"];

// ─── FILTER TYPES ─────────────────────────────────────────
type Filters = {
  condition: string;
  language: string;
  graded: string;
  priceRange: string;
  rarity: string;
};

const DEFAULT_FILTERS: Filters = {
  condition: "Any",
  language: "Any",
  graded: "Any",
  priceRange: "Any",
  rarity: "Any",
};

// ─── FILTER DRAWER ────────────────────────────────────────
function FilterRow({ label, options, value, onChange }: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 800, color: T.inkMid, marginBottom: "8px", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "7px" }}>
        {options.map(opt => {
          const isOn = value === opt;
          return (
            <div
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                padding: "5px 13px", borderRadius: "50px",
                fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 700,
                cursor: "pointer",
                background: isOn ? T.navy : T.white,
                color: isOn ? T.yellow : T.inkMid,
                border: `1.5px solid ${isOn ? T.navy : T.border}`,
                transition: "all 0.15s",
              }}
            >{opt}</div>
          );
        })}
      </div>
    </div>
  );
}

function FilterDrawer({ filters, onChange, onApply, onReset, onClose }: {
  filters: Filters;
  onChange: (key: keyof Filters, val: string) => void;
  onApply: () => void;
  onReset: () => void;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(28,35,64,0.45)", zIndex: 500, display: "flex", alignItems: "flex-end", justifyContent: "center", backdropFilter: "blur(3px)" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: T.white, borderRadius: "24px 24px 0 0", padding: "20px 20px 32px", width: "345px", maxHeight: "80vh", overflowY: "auto", boxShadow: T.s3 }}
      >
        {/* Handle */}
        <div style={{ width: "36px", height: "4px", background: T.inkGhost, borderRadius: "2px", margin: "0 auto 18px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "17px", fontWeight: 900, color: T.ink }}>Filter Cards</div>
          <div onClick={onReset} style={{ fontSize: "12px", fontWeight: 700, color: T.lavender, cursor: "pointer" }}>Reset all</div>
        </div>

        <FilterRow label="Condition"   options={["Any","Mint","Near Mint","Lightly Played","Played"]} value={filters.condition} onChange={v => onChange("condition", v)} />
        <FilterRow label="Language"    options={["Any","English","Japanese","Korean","Chinese"]}       value={filters.language}  onChange={v => onChange("language", v)}  />
        <FilterRow label="Graded"      options={["Any","Graded Only","Ungraded Only"]}                 value={filters.graded}    onChange={v => onChange("graded", v)}    />
        <FilterRow label="Price Range" options={["Any","Under ₹1k","₹1k–₹5k","₹5k–₹20k","₹20k+"]}   value={filters.priceRange} onChange={v => onChange("priceRange", v)} />
        <FilterRow label="Rarity"      options={["Any","Common","Uncommon","Rare","Ultra Rare","SAR"]} value={filters.rarity}    onChange={v => onChange("rarity", v)}    />

        <div
          onClick={onApply}
          style={{ background: T.navy, color: T.yellow, fontFamily: "Nunito, sans-serif", fontSize: "14px", fontWeight: 900, padding: "14px", borderRadius: "16px", textAlign: "center" as const, cursor: "pointer", marginTop: "8px" }}
        >
          Apply Filters
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function MarketplaceScreen({ onNavigate }: NavProps) {
  const [activeCat, setActiveCat] = useState("All");
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

  function handleCategoryClick(cat: string) {
    if (cat === "One Piece" || cat === "Anime") {
      setModal({ title: "Coming Soon 🚧", message: `${cat} card listings are being added to RareNook. We'll notify you when they go live!` });
      return;
    }
    if (cat === "Graded") {
      setModal({ title: "Coming Soon 🚧", message: "Graded card listings (PSA, BGS, CGC) are coming very soon." });
      return;
    }
    setActiveCat(cat);
  }

  function handleCardClick(cardId: number) {
    const card = ALL_CARDS.find(c => c.id === cardId);
    if (!card) return;
    if (card.real) {
      onNavigate("CardDetail");
    } else {
      setModal({ title: "Not Listed Yet", message: `${card.name} is not available for sale yet. Check back soon or add it to your wishlist.` });
    }
  }

  function handleFilterChange(key: keyof Filters, val: string) {
    setFilters(prev => ({ ...prev, [key]: val }));
  }

  function handleApply() {
    setAppliedFilters(filters);
    setShowFilter(false);
  }

  function handleReset() {
    setFilters(DEFAULT_FILTERS);
    setAppliedFilters(DEFAULT_FILTERS);
  }

  // Count active filters
  const activeFilterCount = Object.values(appliedFilters).filter(v => v !== "Any").length;

  const displayCards = activeCat === "All" || activeCat === "Pokémon"
    ? ALL_CARDS.filter(c => c.category === "pokemon")
    : [];

  return (
    <>
      {modal && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}
      {showFilter && (
        <FilterDrawer
          filters={filters}
          onChange={handleFilterChange}
          onApply={handleApply}
          onReset={handleReset}
          onClose={() => setShowFilter(false)}
        />
      )}

      <PhoneShell>
        <StatusBar />

        {/* Top Nav */}
        <div style={{ background: T.sky, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 18px 12px" }}>
          <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "19px", fontWeight: 900, color: T.navy }}>Marketplace</div>
          <div
            onClick={() => setShowFilter(true)}
            style={{
              fontSize: "12px", fontWeight: 700, color: activeFilterCount > 0 ? T.navy : T.inkMid,
              background: activeFilterCount > 0 ? T.yellow : T.white,
              padding: "6px 12px", borderRadius: "9px",
              border: `1.5px solid ${activeFilterCount > 0 ? T.navy : T.border}`,
              boxShadow: activeFilterCount > 0 ? `2px 2px 0 ${T.navy}` : T.s1,
              cursor: "pointer", display: "flex", alignItems: "center", gap: "5px",
              transition: "all 0.15s",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 2H12M3 6.5H10M5 11H8" stroke={activeFilterCount > 0 ? T.navy : T.inkMid} strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Filter {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
          </div>
        </div>

        <div style={{ maxHeight: "636px", overflowY: "auto", overflowX: "hidden" }}>
          <SearchBar placeholder="Search cards, sets, or collectors..." />

          {/* Category chips */}
          <div style={{ display: "flex", gap: "7px", padding: "0 16px 15px", overflowX: "auto" }}>
            {CATEGORIES.map((cat) => {
              const isOn = cat === activeCat;
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

          {/* Results */}
          <div style={{ padding: "0 16px 11px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: T.inkSoft, fontWeight: 600 }}>
              {displayCards.length} results{activeCat !== "All" ? ` · ${activeCat}` : ""}
            </span>
            <span style={{ fontSize: "11px", fontWeight: 700, color: T.lavender, cursor: "pointer" }}>Highest Price</span>
          </div>

          {/* Card grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "0 16px 16px" }}>
            {displayCards.map((card) => (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id)}
                style={{
                  background: T.white, borderRadius: "18px",
                  boxShadow: T.s1, overflow: "hidden",
                  border: `1.5px solid ${T.border}`,
                  cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
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
                {/* Image */}
                <div style={{ height: "106px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <span style={{ position: "absolute", top: "7px", left: "9px", fontSize: "9px", fontWeight: 700, color: "rgba(28,35,64,0.3)", fontFamily: "Nunito, sans-serif" }}>{card.no}</span>
                  <div style={{ position: "absolute", top: "7px", right: "8px", width: "20px", height: "20px", borderRadius: "50%", background: card.bg, border: "1.5px solid rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px" }}></div>
                  <CardArt artKey={card.art as ArtKey} size={54} />
                </div>
                {/* Body — improved hierarchy */}
                <div style={{ padding: "9px 10px 11px" }}>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "12px", fontWeight: 900, color: T.ink, lineHeight: 1.2 }}>{card.name}</div>
                  <div style={{ fontSize: "10px", color: T.inkSoft, marginTop: "2px", marginBottom: "5px" }}>{card.set} · {card.lang}</div>
                  <div style={{ display: "inline-block", fontFamily: "Nunito, sans-serif", fontSize: "10px", fontWeight: 800, padding: "2px 8px", borderRadius: "50px", border: "1.5px solid rgba(0,0,0,0.1)", ...condStyle[card.condType], marginBottom: "5px" }}>{card.cond}</div>
                  <div style={{ fontSize: "9px", color: T.inkSoft, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" as const }}>Market Value</div>
                  <div style={{ fontFamily: "Nunito, sans-serif", fontSize: "15px", fontWeight: 900, color: T.ink }}>{card.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ height: "14px" }} />
        </div>

        <BottomNav active="Market" onNavigate={onNavigate} />
      </PhoneShell>
    </>
  );
}
