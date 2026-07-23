import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VorinWeb",
  description: "VorinWeb - Sites profissionais para o seu negócio.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
