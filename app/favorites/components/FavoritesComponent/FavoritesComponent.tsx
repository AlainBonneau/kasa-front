"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { getFavorites } from "@/app/services/favorites.service";
import Image from "next/image";
import { Heart } from "lucide-react";
import "./FavoritesComponent.scss";

type Favorite = {
  id: number;
  title: string;
  location: string;
  cover: string;
  price_per_night: number;
};

export default function FavoritesComponent() {
  const { user, status } = useAuthContext();
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    if (status !== "authenticated" || !user?.id) return;

    const userId = user.id;

    async function fetchFavorites() {
      try {
        const data = await getFavorites(userId);
        console.log("Favoris récupérés:", data);
        setFavorites(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchFavorites();
  }, [status, user?.id]);

  const handleRemoveFavorite = (e: React.MouseEvent, propertyId: number) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("remove favorite", propertyId);
    // TODO: appeler ton endpoint toggle / remove puis update state
  };

  return (
    <section className="favorites-list-container">
      {favorites.length === 0 ? (
        <p className="no-favorites-message">
          Vous n&apos;avez pas encore de favoris.
        </p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <section key={favorite.id} className="property-card">
              <div className="property-card-image">
                <Image
                  src={favorite.cover}
                  alt={favorite.title}
                  height={376}
                  width={300}
                  className="property-image"
                />

                {user && (
                  <button
                    type="button"
                    className="remove-favorite-button"
                    onClick={(e) => handleRemoveFavorite(e, favorite.id)}
                  >
                    <Heart className="remove-favorite-icon" />
                  </button>
                )}
              </div>

              <div className="property-card-description">
                <div className="card-description-content">
                  <h2>{favorite.title}</h2>
                  <p>{favorite.location}</p>
                </div>

                <p className="property-card-price">
                  <span>{favorite.price_per_night}€</span> par nuit
                </p>
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}
