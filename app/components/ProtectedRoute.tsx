"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";

type Props = {
  children: ReactNode;
  redirectTo?: string;
};

// Composant qui protège les routes qui nécessitent une authentification.
export default function ProtectedRoute({
  children,
  redirectTo = "/login",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useAuthContext();

  useEffect(() => {
    if (status === "guest") {
      // on garde le chemin actuel pour revenir après login
      const next = encodeURIComponent(pathname || "/");
      router.replace(`${redirectTo}?next=${next}`);
    }
  }, [status, router, redirectTo, pathname]);

  if (status === "loading") return null;

  if (status !== "authenticated") return null;

  return <>{children}</>;
}
