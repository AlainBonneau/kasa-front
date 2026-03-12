"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import Link from "next/link";
import {
  getFavorites,
  removeFavorite,
  type Favorite,
} from "@/app/services/favorites.service";
import Image from "next/image";
import Loader from "@/app/components/ui/Loader/Loader";
import { getImageUrl } from "@/app/lib/utils/backend-picture";
import { Heart } from "lucide-react";
import "./FavoritesComponent.scss";

export default function FavoritesComponent() {
  const { user, status } = useAuthContext();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    if (status !== "authenticated" || !user?.id) return;

    const userId = user.id;

    async function fetchFavorites() {
      try {
        const data = await getFavorites(userId);
        if (isMounted) setFavorites(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchFavorites();
    return () => {
      isMounted = false;
    };
  }, [status, user?.id]);

  if (isLoading) {
    return <Loader fullscreen={true} label="Chargement de vos favoris..." />;
  }

  const handleRemoveFavorite = (e: React.MouseEvent, propertyId: string) => {
    e.preventDefault();
    e.stopPropagation();

    removeFavorite(user!.id, propertyId).then(() => {
      setFavorites((prev) => prev.filter((f) => f.id !== propertyId));
    });
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
            <Link
              key={favorite.id}
              href={`/properties/${favorite.id}`}
              className="property-link"
            >
              <section className="property-card">
                <div className="property-card-image">
                  <Image
                    src={getImageUrl(favorite.cover)}
                    alt={favorite.title}
                    height={376}
                    width={300}
                    className="property-image"
                    unoptimized
                  />

                  {user && (
                    <button
                      type="button"
                      className="remove-favorite-button"
                      aria-label="Retirez des favories"
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
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
