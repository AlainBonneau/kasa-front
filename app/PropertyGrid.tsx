"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";
import { listProperties } from "./services/properties.service";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import type { Property } from "./types/property";
import "./PropertyGrid.scss";

export default function PropertyGrid() {
  const { user, status } = useAuthContext();
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

  const handleAddFavorite = (e: React.MouseEvent, propertyId: string) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      `Ajouter la propriété ${propertyId} aux favoris pour l'utilisateur ${user?.id}`,
    );
  };

  return (
    <article className="property-grid">
      {properties.map((property) => (
        <Link
          key={property.id}
          href={`/properties/${property.id}`}
          className="property-link"
        >
          <section key={property.id} className="property-card">
            <div className="property-card-image">
              <Image
                src={property.cover}
                alt={property.title}
                height={376}
                width={300}
                className="property-image"
              />
              {user && (
                <button
                  className="favorite-button"
                  onClick={(e) => handleAddFavorite(e, property.id)}
                >
                  <Heart className="add-favorite-icon" />
                </button>
              )}
            </div>
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
        </Link>
      ))}
    </article>
  );
}
