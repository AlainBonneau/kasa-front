import Link from "next/link";
import "./page.scss";

export default function Login() {
  return (
    <div className="login-page-container">
      <div className="login-container">
        <h1>Heureux de vous revoir</h1>
        <p>
          Connectez-vous pour retrouver vos réservations, vos annonces et tout
          ce qui rend vos séjours uniques.
        </p>
        <form>
          <div className="form-input">
            <label htmlFor="email">Adresse e-mail</label>
            <input id="email" type="email" />
          </div>
          <div className="form-input">
            <label htmlFor="password">Mot de passe</label>
            <input id="password" type="password" />
          </div>
          <button type="submit">Se connecter</button>
        </form>
        <div className="login-link">
          <Link href="/forgot-password">Mot de passe oublié</Link>
          <Link href="/signup">Pas encore de compte ? Inscrivez-vous</Link>
        </div>
      </div>
    </div>
  );
}
