"use client";

import { useState } from "react";
import {
  NavProps, T,
  Modal, StatusBar, PhoneShell, BottomNav,
} from "./shared";

// ─── DATA ─────────────────────────────────────────────────
const INITIAL_POSTS = [
  {
    id: 1,
    user: "Rahul_TCG", city: "Mumbai", time: "just now",
    tag: "🔥 Rare Pull", tagBg: "#FFF0ED", tagColor: "#E8402A",
    avatarBg: "#FFF5C0", letter: "R",
    title: "PSA 10 Charizard ex SAR! 🎉",
    body: "Just got this graded — 3 month wait was so worth it. Estimated ₹28k now. Should I sell or hold? 👀",
    likes: 248, comments: 34, liked: false,
  },
  {
    id: 2,
    user: "CardKing_BLR", city: "Bengaluru", time: "2h ago",
    tag: "📊 Market", tagBg: "#EDFBF4", tagColor: "#16854E",
    avatarBg: "#C0F0DC", letter: "C",
    title: "OP09 prices rising fast 🚀",
    body: "Rob Lucci SAR up 40% in 2 weeks. If you have one, now's the time to sell. Set an alert on RareNook!",
    likes: 187, comments: 52, liked: false,
  },
  {
    id: 3,
    user: "PokeFan_MUM", city: "Mumbai", time: "5h ago",
    tag: "⭐ Review", tagBg: "#E4F4FB", tagColor: "#1C2340",
    avatarBg: "#E4F4FB", letter: "P",
    title: "Perfect trade with @TCG_Kerala!",
    body: "Smooth escrow. Card arrived perfect, verified and shipped in 3 days. RareNook is the only safe way to trade in India. 10/10 🙌",
    likes: 92, comments: 18, liked: false,
  },
  {
    id: 4,
    user: "TCG_Kerala", city: "Thrissur", time: "1d ago",
    tag: "🃏 Trade", tagBg: "#F3F1FF", tagColor: "#6B5AC4",
    avatarBg: "#F3F1FF", letter: "T",
    title: "Looking for Umbreon VMAX Alt Art",
    body: "Have a Mewtwo ex SAR NM and some cash to offer. DM me if you're willing to trade! Only buying from verified collectors.",
    likes: 54, comments: 12, liked: false,
  },
  {
    id: 5,
    user: "ShinySeller", city: "Hyderabad", time: "2d ago",
    tag: "💹 Market", tagBg: "#EDFBF4", tagColor: "#16854E",
    avatarBg: "#FFF0ED", letter: "S",
    title: "Base Set prices hitting all time highs",
    body: "Shadowless Charizard PSA 9 just crossed ₹1.2L in India. If you've been sitting on vintage, now's the time to get a valuation.",
    likes: 321, comments: 67, liked: false,
  },
];

const TAGS = ["#WantCharizard", "#OP09Trades", "#PSAswap", "#SV151", "#RarePull"];
const TAG_STYLES = [
  { bg: "#FFF0ED", color: "#E8402A" },
  { bg: "#E4F4FB", color: "#1C2340" },
  { bg: "#EDFBF4", color: "#16854E" },
  { bg: "#FFF5C0", color: "#8B6400" },
  { bg: "#F3F1FF", color: "#6B5AC4" },
];

const TABS = ["Feed", "Pulls", "Reviews", "Market Talk", "Trading"];

// ─── POST CARD ─────────────────────────────────────────────
function PostCard({ post, onLike, onComment }: {
  post: typeof INITIAL_POSTS[0];
  onLike: () => void;
  onComment: () => void;
}) {
  return (
    <div style={{ margin: "0 16px 12px", background: T.white, borderRadius: "22px", boxShadow: T.s1, border: `1.5px solid ${T.border}`, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "12px 13px 9px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: post.avatarBg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, flexShrink: 0, border: `1.5px solid ${T.border}` }}>{post.letter}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 700, color: T.ink }}>{post.user}</div>
          <div style={{ fontSize: "10px", color: T.inkSoft }}>{post.city} · {post.time}</div>
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px", fontWeight: 800, padding: "3px 9px", borderRadius: "50px", background: post.tagBg, color: post.tagColor, border: `1.5px solid rgba(0,0,0,0.08)` }}>{post.tag}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "0 13px 10px" }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 900, color: T.ink, marginBottom: "5px" }}>{post.title}</div>
        <div style={{ fontSize: "12px", color: T.inkMid, lineHeight: 1.6 }}>{post.body}</div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", gap: "0", padding: "9px 13px", borderTop: `1px solid rgba(28,35,64,0.06)` }}>
        <div
          onClick={onLike}
          style={{ flex: 1, display: "flex", alignItems: "center", gap: "5px", cursor: "pointer", transition: "opacity 0.15s" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.7"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
        >
          <span style={{ fontSize: "14px" }}>{post.liked ? "❤️" : "🤍"}</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 700, color: post.liked ? T.coral : T.inkSoft }}>{post.likes}</span>
        </div>
        <div
          onClick={onComment}
          style={{ flex: 1, display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1H13V10H8L5 13V10H1V1Z" stroke={T.inkSoft} strokeWidth="1.3" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 700, color: T.inkSoft }}>{post.comments}</span>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "5px", cursor: "pointer" }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7L5 3V5.5C8 5.5 11 7 12 11C10.5 9 8.5 8.5 5 8.5V11L1 7Z" stroke={T.inkSoft} strokeWidth="1.3" strokeLinejoin="round"/></svg>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 700, color: T.inkSoft }}>Share</span>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN SCREEN ──────────────────────────────────────────
export default function CommunityScreen({ onNavigate }: NavProps) {
  const [activeTab, setActiveTab] = useState("Feed");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [modal, setModal] = useState<{ title: string; message: string } | null>(null);

  function handleLike(id: number) {
    setPosts(prev => prev.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  }

  function handleComment(id: number) {
    setModal({ title: "Comments", message: "The full comments section is coming soon! You'll be able to reply, react, and discuss with collectors." });
  }

  return (
    <>
      {modal && <Modal title={modal.title} message={modal.message} onClose={() => setModal(null)} />}
      <PhoneShell>
        <StatusBar />

        {/* Top Nav */}
        <div style={{ background: T.sky, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 18px 12px" }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "19px", fontWeight: 900, color: T.navy }}>Community</div>
          <div
            onClick={() => setModal({ title: "Create Post", message: "Post creation is coming soon! Share your rare pulls, market insights, and trades with the RareNook community." })}
            style={{ background: T.yellow, border: `2px solid ${T.navy}`, borderRadius: "9px", padding: "6px 12px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 900, color: T.navy, boxShadow: `2px 2px 0 ${T.navy}`, cursor: "pointer" }}
          >+ Post</div>
        </div>

        <div style={{ overflowY: "visible", overflowX: "hidden" }}>
          {/* Tabs */}
          <div style={{ display: "flex", gap: "7px", padding: "0 16px 14px", overflowX: "auto" }}>
            {TABS.map(tab => {
              const isOn = tab === activeTab;
              return (
                <div key={tab} onClick={() => setActiveTab(tab)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: "50px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" as const, background: isOn ? T.navy : T.white, color: isOn ? T.yellow : T.inkMid, border: `1.5px solid ${isOn ? T.navy : T.border}`, boxShadow: isOn ? "none" : T.s1, transition: "all 0.15s" }}>{tab}</div>
              );
            })}
          </div>

          {/* Posts */}
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onComment={() => handleComment(post.id)}
            />
          ))}

          {/* Trending Tags */}
          <div style={{ padding: "4px 16px 10px" }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "15px", fontWeight: 900, color: T.ink, marginBottom: "10px" }}>🏷 Trending Tags</div>
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "7px" }}>
              {TAGS.map((tag, i) => (
                <div
                  key={tag}
                  onClick={() => setModal({ title: tag, message: `See all posts tagged ${tag}. Full tag browsing is coming soon!` })}
                  style={{ padding: "6px 14px", borderRadius: "50px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px", fontWeight: 700, cursor: "pointer", background: TAG_STYLES[i].bg, color: TAG_STYLES[i].color, border: `1.5px solid rgba(0,0,0,0.08)`, transition: "transform 0.15s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "scale(1)"}
                >{tag}</div>
              ))}
            </div>
          </div>

          <div style={{ height: "16px" }} />
        </div>

        <BottomNav active="Community" onNavigate={onNavigate} />
      </PhoneShell>
    </>
  );
}
