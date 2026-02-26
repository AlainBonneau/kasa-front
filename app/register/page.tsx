import Link from "next/link";
import "./page.scss";

export default function Register() {
  return (
    <div className="register-page-container">
      <div className="register-container">
        <h1>Rejoignez la communauté Kasa</h1>
        <p>
          Créez votre compte et commencez à voyager autrement : réservez des
          logements uniques, découvrez de nouvelles destinations et partagez vos
          propres lieux avec d’autres voyageurs.
        </p>
        <form>
          <div className="register-form-input">
            <label htmlFor="lastName">Nom</label>
            <input id="lastName" type="text" />
          </div>
          <div className="register-form-input">
            <label htmlFor="firstName">Prénom</label>
            <input id="firstName" type="text" />
          </div>
          <div className="register-form-input">
            <label htmlFor="email">Adresse email</label>
            <input id="email" type="email" />
          </div>
          <div className="register-form-input">
            <label htmlFor="password">Mot de passe</label>
            <input id="password" type="password" />
          </div>
          <div className="checkbox-container">
            {/* <label htmlFor="terms"></label> */}
            <input id="terms" type="checkbox" />
            <span>
              J&apos;accepte les{" "}
              <span className="underline">conditions générales d&apos;utilisation</span>
            </span>
          </div>
          <button type="submit">S&apos;inscrire</button>
        </form>
        <div className="register-link">
            <Link href="/login">Déjà membre ? Se connecter</Link>
        </div>
      </div>
    </div>
  );
}
