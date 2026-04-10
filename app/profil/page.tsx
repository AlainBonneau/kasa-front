"use client";

import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import "./page.scss";

export default function Profil() {
  const { user, getUserProfile } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUserProfile();
    }
  }, [user, getUserProfile]);

  return (
    <ProtectedRoute>
      <div className="profil">
        <h1>Profil</h1>
        {user && (
          <div>
            <p>ID: {user.id}</p>
            <p>Nom: {user.name}</p>
            <p>Rôle: {user.role}</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
