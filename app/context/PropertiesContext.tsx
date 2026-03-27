"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  listProperties,
  getPropertyById,
  createPropertyService,
} from "../services/properties.service";
import type { Property, CreatePropertyPayload } from "../types/property";

type PropertiesContextValue = {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getPropertyById: (id: string) => Promise<Property | null>;
  createProperty: (propertyData: CreatePropertyPayload) => Promise<Property>;
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

  const refresh = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);

      const data = await listProperties();
      setProperties(data);
    } catch (e: unknown) {
      setError(
        (e as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Impossible de charger les logements",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const createProperty = useCallback(
    async (propertyData: CreatePropertyPayload): Promise<Property> => {
      try {
        const newProperty = await createPropertyService(propertyData);
        await refresh();
        return newProperty;
      } catch (e: unknown) {
        throw new Error(
          (e as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || "Impossible de créer le logement",
        );
      }
    },
    [refresh],
  );

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      properties,
      loading,
      error,
      refresh,
      getPropertyById,
      createProperty,
    }),
    [properties, loading, error, refresh, createProperty],
  );

  return (
    <PropertiesContext.Provider value={value}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function usePropertiesContext() {
  const ctx = useContext(PropertiesContext);

  if (!ctx) {
    throw new Error(
      "usePropertiesContext must be used within PropertiesProvider",
    );
  }

  return ctx;
}
