import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "./components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Kasa",
  description:
    "Kasa, votre location d'appartements de vacances en France et à l'étranger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
