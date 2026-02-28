"use client";

import { useState, useEffect } from "react";
import { listProperties } from "./services/properties.service";
import Image from "next/image";
import type { Property } from "./types/property";
import "./PropertyGrid.scss";

export default function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const data = await listProperties();
        setProperties(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des propriétés:", error);
      }
    }

    fetchProperties();
  }, []);

  return (
    <article className="property-grid">
      {properties.map((property) => (
        <section key={property.id} className="property-card">
          <Image
            src={property.cover}
            alt={property.title}
            height={376}
            width={300}
            className="property-image"
          />
          <div className="property-card-description">
            <div className="card-description-content">
              <h2>{property.title}</h2>
              <p>{property.location}</p>
            </div>
            <p className="property-card-price">
              <span>{property.price_per_night}€</span> par nuit
            </p>
          </div>
        </section>
      ))}
    </article>
  );
}
