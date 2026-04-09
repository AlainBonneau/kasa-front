"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import {
  listProperties,
  getPropertyById,
  createPropertyService,
  updatePropertyService,
  deletePropertyService,
} from "../services/properties.service";
import type { Property, CreatePropertyPayload } from "../types/property";

type PropertiesContextValue = {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  getPropertyById: (id: string) => Promise<Property | null>;
  createProperty: (propertyData: CreatePropertyPayload) => Promise<Property>;
  updateProperty: (
    id: string,
    propertyData: CreatePropertyPayload,
  ) => Promise<Property>;
  deleteProperty: (id: string) => Promise<void>;
};

const PropertiesContext = createContext<PropertiesContextValue | null>(null);

export function PropertiesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Récupère les propriétés au chargement du composant
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

  // Créer une nouvelle propriété
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

  // Mettre à jour une propriété
  const updateProperty = useCallback(
    async (
      id: string,
      propertyData: CreatePropertyPayload,
    ): Promise<Property> => {
      try {
        const updatedProperty = await updatePropertyService(id, propertyData);
        await refresh();
        return updatedProperty;
      } catch (e: unknown) {
        throw new Error(
          (e as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || "Impossible de mettre à jour le logement",
        );
      }
    },
    [refresh],
  );

  // Supprimer une propriété
  const deleteProperty = useCallback(
    async (id: string): Promise<void> => {
      try {
        await deletePropertyService(id);
        router.push("/");
        await refresh();
      } catch (e: unknown) {
        throw new Error(
          (e as { response?: { data?: { message?: string } } })?.response?.data
            ?.message || "Impossible de supprimer le logement",
        );
      }
    },
    [refresh, router],
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
      updateProperty,
      deleteProperty,
    }),
    [
      properties,
      loading,
      error,
      refresh,
      createProperty,
      updateProperty,
      deleteProperty,
    ],
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
