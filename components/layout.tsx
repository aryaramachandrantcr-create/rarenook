import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RareNook — India's Collector Marketplace",
  description: "Buy, sell and trade Pokémon, One Piece & Anime cards safely in India",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, background: "#C9E9F7" }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0, padding: 0, width: "100%", minHeight: "100vh", overflowX: "hidden", background: "#C9E9F7" }}>
        {children}
      </body>
    </html>
  );
}
