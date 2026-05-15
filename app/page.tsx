"use client";

import { useState } from "react";
import HomeScreen        from "@/components/HomeScreen";
import MarketplaceScreen from "@/components/MarketplaceScreen";
import CardDetailScreen  from "@/components/CardDetailScreen";
import TradeHubScreen    from "@/components/TradeHubScreen";
import TradeOfferScreen  from "@/components/TradeOfferScreen";
import CommunityScreen   from "@/components/CommunityScreen";
import ProfileScreen     from "@/components/ProfileScreen";
import { Screen } from "@/components/shared";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("Home");

  function handleNavigate(s: Screen) {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "#D8E4EE",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "2.5rem 2rem",
    }}>
      {screen === "Home"        && <HomeScreen        onNavigate={handleNavigate} />}
      {screen === "Marketplace" && <MarketplaceScreen  onNavigate={handleNavigate} />}
      {screen === "CardDetail"  && <CardDetailScreen   onNavigate={handleNavigate} />}
      {screen === "TradeHub"    && <TradeHubScreen      onNavigate={handleNavigate} />}
      {screen === "TradeOffer"  && <TradeOfferScreen    onNavigate={handleNavigate} />}
      {screen === "Community"   && <CommunityScreen     onNavigate={handleNavigate} />}
      {screen === "Profile"     && <ProfileScreen       onNavigate={handleNavigate} />}
    </main>
  );
}
