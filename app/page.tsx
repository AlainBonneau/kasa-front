import Image from "next/image";
import PropertyGrid from "./PropertyGrid";
import "./page.scss";

export default function Home() {
  return (
    <div className="home-page-container">
      <div className="home-page-header">
        <h1>Chez vous, partout et ailleurs</h1>
        <p>
          Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux,
          sélectionnés avec soin par nos hôtes.
        </p>
        <Image
          src="/images/homepage-header-image.jpg"
          alt="Image d'accueil de Kasa"
          className="homepage-img"
          width={1000}
          height={458}
        />
      </div>

      {/* Composant qui affiche la grille de propriétés */}
      <section className="home-page-property-grid">
        <PropertyGrid />
      </section>

      {/* Section "Comment ça marche ?" */}
      <section className="how-work">
        <h2>Comment ça marche ?</h2>
        <p>
          Que vous partiez pour un week-end improvisé, des vacances en famille
          ou un voyage professionnel, Kasa vous aide à trouver un lieu qui vous
          ressemble.
        </p>
        <div className="how-container">
          <div className="how-item">
            <h4>Recherchez</h4>
            <p>
              Entrez votre destination, vos dates et laissez Kasa faire le reste
            </p>
          </div>
          <div className="how-item">
            <h4>Réservez</h4>
            <p>
              Profitez d’une plateforme sécurisée et de profils d’hôtes
              vérifiés.
            </p>
          </div>
          <div className="how-item">
            <h4>Vivez l&apos;expérience</h4>
            <p>
              Installez-vous, profitez de votre séjour, et sentez-vous chez
              vous, partout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
