"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "./context/AuthContext";
import { listProperties } from "./services/properties.service";
import { addFavorite } from "./services/favorites.service";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "./lib/utils/backend-picture";
import Loader from "./components/ui/Loader/Loader";
import { Heart } from "lucide-react";
import type { Property } from "./types/property";
import toast from "react-hot-toast";
import "./PropertyGrid.scss";

export default function PropertyGrid() {
  const { user } = useAuthContext();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProperties() {
      try {
        const data = await listProperties();
        if (isMounted) setProperties(data);
      } catch {
        toast.error("Erreur lors du chargement des propriétés.");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchProperties();
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <Loader label="Chargement des propriétés..." />;
  }

  if (properties.length === 0) {
    return <p>Aucune propriété disponible.</p>;
  }

  const handleAddFavorite = (e: React.MouseEvent, propertyId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user?.id) {
      toast.error(
        "Vous devez être connecté pour ajouter une propriété aux favoris.",
      );
      return;
    }

    addFavorite(user.id, propertyId);
  };

  return (
    <article className="property-grid">
      {properties.map((property) => (
        <Link
          key={property.id}
          href={`/properties/${property.id}`}
          className="property-link"
        >
          <section className="property-card">
            <div className="property-card-image">
              <Image
                src={getImageUrl(property.cover)}
                alt={property.title}
                height={376}
                width={300}
                className="property-image"
                unoptimized
              />
              {user && (
                <button
                  type="button"
                  className="favorite-button"
                  onClick={(e) => handleAddFavorite(e, property.id)}
                  aria-label="Ajouter aux favoris"
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
