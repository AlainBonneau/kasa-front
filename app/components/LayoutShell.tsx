"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar/Navbar";
import Footer from "@/app/components/Footer/Footer";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMessagingPage = pathname === "/messagerie";

  return (
    <>
      <div
        className={
          isMessagingPage ? "layout-navbar messaging-route" : "layout-navbar"
        }
      >
        <Navbar />
      </div>

      <main className="content">{children}</main>

      <div
        className={
          isMessagingPage ? "layout-footer messaging-route" : "layout-footer"
        }
      >
        <Footer />
      </div>
    </>
  );
}
