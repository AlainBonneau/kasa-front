"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { listProperties } from "../services/properties.service";
import type { Property } from "../types/property";

type PropertiesContextValue = {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const PropertiesContext = createContext<PropertiesContextValue | null>(null);

export function PropertiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      setError(null);
      setLoading(true);
      const data = await listProperties();
      setProperties(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "Impossible de charger les logements",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(
    () => ({ properties, loading, error, refresh }),
    [properties, loading, error],
  );

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const ctx = useContext(PropertiesContext);
  if (!ctx)
    throw new Error("useProperties must be used within PropertiesProvider");
  return ctx;
}
