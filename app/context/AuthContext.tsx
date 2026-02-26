"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthUser } from "../types/auth";
import { clearToken, getToken, setToken } from "../lib/utils/auth/token";
import {
  getStoredUser,
  setStoredUser,
  clearStoredUser,
} from "../lib/utils/auth/user";
import { loginService, registerService } from "../services/auth.service";

type AuthStatus = "loading" | "authenticated" | "guest";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<void>;
  register: (args: {
    name: string;
    email: string;
    password: string;
    role?: "owner" | "client";
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  // Au refresh: on recharge juste le token. (On n'a pas de /me dans ton backend)
  useEffect(() => {
    const t = getToken();
    const u = getStoredUser();

    if (t) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTokenState(t);
      setUser(u); // peut être null si jamais pas encore stocké
      setStatus("authenticated");
    } else {
      setStatus("guest");
    }
  }, []);

  async function login(email: string, password: string) {
    setStatus("loading");
    const { token, user } = await loginService({ email, password });
    setToken(token);
    setTokenState(token);
    setUser(user);
    setStoredUser(user);
    setStatus("authenticated");
  }

  async function register(args: {
    name: string;
    email: string;
    password: string;
    role?: "owner" | "client";
  }) {
    setStatus("loading");
    const { token, user } = await registerService(args);
    setToken(token);
    setTokenState(token);
    setUser(user);
    setStoredUser(user);
    setStatus("authenticated");
  }

  function logout() {
    clearToken();
    clearStoredUser();
    setTokenState(null);
    setUser(null);
    setStatus("guest");
  }

  const value = useMemo(
    () => ({ user, token, status, login, register, logout }),
    [user, token, status],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used within AuthProvider");
  return ctx;
}
