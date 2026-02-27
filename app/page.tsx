"use client";

import Image from "next/image";
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
        <Image src="/images/homepage-header-image.jpg" alt="Image d'accueil de Kasa" width={1000} height={458} />
      </div>
    </div>
  );
}
