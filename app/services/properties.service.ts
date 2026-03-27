import { api } from "../api/axioxConfig";
import type { Property, CreatePropertyPayload } from "../types/property";

/**
 * Récupère la liste des propriétés depuis l'API.
 *
 * @returns {Promise<Property[]>} La liste des propriétés récupérées.
 * @throws {Error} Si la requête API échoue.
 */
export async function listProperties(): Promise<Property[]> {
  try {
    const response = await api.get<Property[]>("/api/properties");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Une erreur inconnue est survenue lors de la récupération des propriétés.",
    );
  }
}

/**
 * Récupère les détails d'une propriété à partir de son identifiant.
 *
 * @param {string} id - L'identifiant de la propriété.
 * @returns {Promise<Property>} La propriété correspondante.
 * @throws {Error} Si la requête API échoue.
 */
export async function getPropertyById(id: string): Promise<Property> {
  try {
    const response = await api.get<Property>(`/api/properties/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Une erreur inconnue est survenue lors de la récupération de la propriété.",
    );
  }
}

/**
 * Crée une nouvelle propriété.
 *
 * @param {CreatePropertyPayload} propertyData - Les données de la propriété à créer.
 * @returns {Promise<Property>} La propriété créée.
 * @throws {Error} Si la requête API échoue.
 */
export async function createPropertyService(
  propertyData: CreatePropertyPayload,
): Promise<Property> {
  try {
    const response = await api.post<Property>("/api/properties", propertyData);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Une erreur inconnue est survenue lors de la création de la propriété.",
    );
  }
}

/**
 * Supprime une propriété à partir de son identifiant.
 * @param {string} id - L'identifiant de la propriété à supprimer.
 * @returns {Promise<void>} Une promesse qui se résout lorsque la propriété est supprimée.
 * @throws {Error} Si la requête API échoue.
 */
export async function deletePropertyService(id: string): Promise<void> {
  try {
    await api.delete(`/api/properties/${id}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Une erreur inconnue est survenue lors de la suppression de la propriété.",
    );
  }
}
