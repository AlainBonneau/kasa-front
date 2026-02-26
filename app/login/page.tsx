"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../context/AuthContext";
import "./page.scss";

export default function Login() {
  const { login, status } = useAuthContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await login(email, password);
      router.push("/"); // redirection après login
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erreur de connexion");
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h1>Heureux de vous revoir</h1>
        <p>
          Connectez-vous pour retrouver vos réservations, vos annonces et tout
          ce qui rend vos séjours uniques.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="login-form-input">
            <label htmlFor="email">Adresse e-mail</label>
            <input id="email" name="email" type="email" required />
          </div>

          <div className="login-form-input">
            <label htmlFor="password">Mot de passe</label>
            <input id="password" name="password" type="password" required />
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="login-link">
          <Link href="/forgot-password">Mot de passe oublié</Link>
          <Link href="/register">Pas encore de compte ? Inscrivez-vous</Link>
        </div>
      </div>
    </div>
  );
}
