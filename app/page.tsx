"use client";

import { useAuthContext } from "./context/AuthContext";
import "./page.scss";

export default function Home() {
  const { user, status } = useAuthContext();
  return (
    <div className="app-container">
      <h1>Kasa</h1>
      <p>Status: {status}</p>
      <p>user: {user ? user.name : "None"}</p>
    </div>
  );
}
