"use client";

import { useState, useEffect } from "react";
import { useAuthContext } from "@/app/context/AuthContext";
import { getFavorites } from "@/app/services/favorites.service";
import "./FavoritesComponent.scss";

export default function FavoritesComponent() {
  const { user, status } = useAuthContext();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (status !== "authenticated" || !user?.id) return;

    const userId = user.id;

    async function fetchFavorites() {
      try {
        const data = await getFavorites(userId);
        setFavorites(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchFavorites();
  }, [status, user?.id]);

  return (
    <section className="favorites-list-container">
      {favorites.length === 0 ? (
        <p className="no-favorites-message">
          Vous n&apos;avez pas encore de favoris.
        </p>
      ) : (
        <div className="favorites-grid">
          <p>Vous avez {favorites.length} favoris</p>
        </div>
      )}
    </section>
  );
}
