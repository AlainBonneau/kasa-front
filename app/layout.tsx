import type { Metadata } from "next";
import "./globals.scss";
import { AuthProvider } from "./context/AuthContext";
import { PropertiesProvider } from "./context/PropertiesContext";
import LayoutShell from "./components/LayoutShell";

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
        <AuthProvider>
          <PropertiesProvider>
            <LayoutShell>{children}</LayoutShell>
          </PropertiesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
