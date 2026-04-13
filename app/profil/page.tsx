"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useAuthContext } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import "./page.scss";

export default function Profil() {
  const { user, getUserProfile, logout, status } = useAuthContext();

  useEffect(() => {
    if (status === "authenticated" && !user) {
      getUserProfile();
    }
  }, [status, user, getUserProfile]);

  return (
    <ProtectedRoute>
      <div className="profile-page">
        <div className="profile-card">
          {user && (
            <>
              <Image
                src={user.picture || "/images/default-avatar.jpg"}
                alt="Avatar"
                width={120}
                height={120}
                className="avatar"
              />

              <h1>{user.name}</h1>

              <p className="info">ID: {user.id}</p>
              <p className="info">Rôle: {user.role}</p>

              <button onClick={logout} className="logout-btn">
                Se déconnecter
              </button>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
