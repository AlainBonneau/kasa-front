"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar/Navbar";

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
          isMessagingPage ? "navbar-wrapper messaging-route" : "navbar-wrapper"
        }
      >
        <Navbar />
      </div>
      {children}
    </>
  );
}
