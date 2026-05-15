import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RareNook — India's Collector Marketplace",
  description: "Buy, sell and trade Pokémon, One Piece & Anime cards safely in India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;600;700;800;900&family=Nunito+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}