import { api } from "../api/axioxConfig";
import type { Property, CreatePropertyPayload } from "../types/property";

/**
 * Récupère la liste des propriétés depuis l'API.
 *
 * @returns {Promise<Property[]>} La liste des propriétés récupérées.
 * @throws {Error} Si la requête API échoue.
 */
export async function listProperties(): Promise<Property[]> {
  const response = await api.get<Property[]>("/api/properties");
  return response.data;
}

/**
 * Récupère les détails d'une propriété à partir de son identifiant.
 *
 * @param {string} id - L'identifiant de la propriété.
 * @returns {Promise<Property>} La propriété correspondante.
 * @throws {Error} Si la requête API échoue.
 */
export async function getPropertyById(id: string): Promise<Property> {
  const response = await api.get<Property>(`/api/properties/${id}`);
  return response.data;
}

/**
 * Crée une nouvelle propriété.
 *
 * @param {CreatePropertyPayload} propertyData - Les données de la propriété à créer.
 * @returns {Promise<Property>} La propriété créée.
 * @throws {Error} Si la requête API échoue.
 */
export async function createProperty(
  propertyData: CreatePropertyPayload,
): Promise<Property> {
  try {
    const response = await api.post<Property>("/api/properties", propertyData);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Create property status:", error?.response?.status);
    console.error("Create property data:", error?.response?.data);
    throw error;
  }
}
