"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import "./page.scss";

export default function Register() {
  const { register, status } = useAuthContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);

    const firstName = (formData.get("firstName") as string)?.trim();
    const lastName = (formData.get("lastName") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;
    const terms = formData.get("terms") === "on";

    if (!terms) {
      setError("Vous devez accepter les conditions d'utilisation.");
      return;
    }

    const name = `${firstName ?? ""} ${lastName ?? ""}`.trim();

    try {
      await register({ name, email, password, role: "client" });
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erreur d'inscription");
    }
  }

  return (
    <div className="register-page-container">
      <div className="register-container">
        <h1>Rejoignez la communauté Kasa</h1>
        <p>
          Créez votre compte et commencez à voyager autrement : réservez des
          logements uniques, découvrez de nouvelles destinations et partagez vos
          propres lieux avec d’autres voyageurs.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="register-form-input">
            <label htmlFor="lastName">Nom</label>
            <input id="lastName" name="lastName" type="text" required />
          </div>

          <div className="register-form-input">
            <label htmlFor="firstName">Prénom</label>
            <input id="firstName" name="firstName" type="text" required />
          </div>

          <div className="register-form-input">
            <label htmlFor="email">Adresse email</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="register-form-input">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
            />
          </div>

          <div className="checkbox-container">
            <input aria-label="J'accepte les termes" id="terms" name="terms" type="checkbox" required />
            <span>
              J&apos;accepte les{" "}
              <span className="underline">
                conditions générales d&apos;utilisation
              </span>
            </span>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        <div className="register-link">
          <Link href="/login">Déjà membre ? Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
