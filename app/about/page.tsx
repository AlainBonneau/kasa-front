import Image from "next/image";
import "./page.scss";

export default function About() {
  return (
    <div className="about-page-container">
      <section className="about-header">
        <h1>À propos</h1>
        <p>
          Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se
          sentir bien.
        </p>
        <p>
          Depuis notre création, nous mettons en relation des voyageurs en quête
          d’authenticité avec des hôtes passionnés qui aiment partager leur
          région et leurs bonnes adresses.
        </p>
        <Image
          src="/images/about-header-picture.png"
          alt="Image d'accueil"
          className="header-picture"
          width={1100}
          height={450}
        />
      </section>

      <section className="about-section">
        <div className="about-left">
          <h2>Notre mission est simple :</h2>
          <ol>
            <li>1. Offrir une plateforme fiable et simple d’utilisation</li>
            <li>2. Proposer des hébergements variés et de qualité</li>
            <li>
              3. Favoriser des échanges humains et chaleureux entre hôtes et
              voyageurs
            </li>
          </ol>
          <h3 className="desktop-text">
            Que vous cherchiez un appartement cosy en centre-ville, une maison
            en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour
            que chaque séjour devienne un souvenir inoubliable.
          </h3>
        </div>
        <div className="about-right">
          <Image
            src="/images/about-section-picture.png"
            alt="Image de la section"
            className="section-image"
            width={500}
            height={450}
          />
          <h3 className="mobile-text">
            Que vous cherchiez un appartement cosy en centre-ville, une maison
            en bord de mer ou un chalet à la montagne, Kasa vous accompagne pour
            que chaque séjour devienne un souvenir inoubliable.
          </h3>
        </div>
      </section>
    </div>
  );
}
