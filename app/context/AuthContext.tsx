"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { decodeJwtPayload, isJwtExpired } from "../lib/utils/auth/jwt";
import {
  clearToken,
  getToken,
  setToken as persistToken,
} from "../lib/utils/auth/token";
import {
  getUserProfileService,
  loginService,
  registerService,
} from "../services/auth.service";
import type { AuthUser } from "../types/auth";

type AuthStatus = "loading" | "authenticated" | "guest";

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  status: AuthStatus;
  role: "owner" | "client" | "admin" | null;
  login: (email: string, password: string) => Promise<void>;
  register: (args: {
    name: string;
    email: string;
    password: string;
    role?: "owner" | "client" | "admin";
  }) => Promise<void>;
  getUserProfile: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setUser(null);
    setStatus("guest");
  }, []);

  const getUserProfile = useCallback(async () => {
    const currentToken = getToken();

    if (!currentToken) {
      logout();
      return;
    }

    const payload = decodeJwtPayload(currentToken);

    if (!payload || isJwtExpired(payload)) {
      logout();
      return;
    }

    setStatus("loading");

    try {
      const profile = await getUserProfileService({ id: payload.id });
      setUser(profile);
      setStatus("authenticated");
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const t = getToken();

    if (!t) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("guest");
      return;
    }

    const payload = decodeJwtPayload(t);

    if (!payload || isJwtExpired(payload)) {
      logout();
      return;
    }

    setTokenState(t);
    setUser({
      id: payload.id,
      name: payload.name,
      email: payload.email ?? "",
      picture: null,
      role: payload.role,
    });
    setStatus("authenticated");
  }, [logout]);

  const login = useCallback(async (email: string, password: string) => {
    setStatus("loading");

    try {
      const { token, user } = await loginService({ email, password });
      persistToken(token);
      setTokenState(token);
      setUser(user);
      setStatus("authenticated");
    } catch (error) {
      setTokenState(null);
      setUser(null);
      setStatus("guest");
      throw error;
    }
  }, []);

  const register = useCallback(
    async (args: {
      name: string;
      email: string;
      password: string;
      role?: "owner" | "client" | "admin";
    }) => {
      setStatus("loading");

      try {
        const { token, user } = await registerService(args);
        persistToken(token);
        setTokenState(token);
        setUser(user);
        setStatus("authenticated");
      } catch (error) {
        setTokenState(null);
        setUser(null);
        setStatus("guest");
        throw error;
      }
    },
    [],
  );

  const role = user?.role ?? null;

  const value = useMemo(
    () => ({
      user,
      token,
      status,
      login,
      register,
      logout,
      getUserProfile,
      role,
    }),
    [user, token, status, login, register, logout, getUserProfile, role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return ctx;
}
