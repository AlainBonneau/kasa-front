import { api } from "../api/axioxConfig";

export type Favorite = {
  id: string;
  title: string;
  location: string;
  cover: string;
  price_per_night: number;
};

/**
 * Récupère la liste des propriétés favorites d'un utilisateur.
 *
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise<Favorite[]>} La liste des propriétés favorites.
 * @throws {Error} Si la requête API échoue.
 */
export async function getFavorites(userId: number): Promise<Favorite[]> {
  const res = await api.get<Favorite[]>(`/api/users/${userId}/favorites`);
  return res.data;
}

/**
 * Ajoute une propriété aux favoris d'un utilisateur.
 *
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @param {string} propertyId - L'identifiant de la propriété.
 * @returns {Promise<Favorite>} La propriété ajoutée aux favoris.
 * @throws {Error} Si la requête API échoue.
 */
export async function addFavorite(
  userId: number,
  propertyId: string,
): Promise<Favorite> {
  const res = await api.post<Favorite>(
    `/api/properties/${propertyId}/favorite`,
    { userId },
  );
  return res.data;
}

/**
 * Supprime une propriété des favoris d'un utilisateur.
 *
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @param {string} propertyId - L'identifiant de la propriété.
 * @returns {Promise<Favorite>} La propriété supprimée des favoris.
 * @throws {Error} Si la requête API échoue.
 */
export async function removeFavorite(
  userId: number,
  propertyId: string,
): Promise<Favorite> {
  const res = await api.delete<Favorite>(
    `/api/properties/${propertyId}/favorite`,
    { data: { userId } },
  );
  return res.data;
}
