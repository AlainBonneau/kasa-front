import { api } from "../api/axioxConfig";

export async function getFavorites(userId: number) {
  const res = await api.get(`/api/users/${userId}/favorites`);
  return res.data;
}

export async function addFavorite(userId: number, propertyId: string) {
  const res = await api.post(`/api/properties/${propertyId}/favorite`, {
    userId,
  });
  return res.data;
}

export async function removeFavorite(userId: number, propertyId: string) {
  const res = await api.delete(`/api/properties/${propertyId}/favorite`, {
    data: { userId },
  });
  return res.data;
}
