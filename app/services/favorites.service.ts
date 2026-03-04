import { api } from "../api/axioxConfig";
// import type { Property } from "../types/property";

export async function getFavorites(userId: number) {
  const res = await api.get(`/api/users/${userId}/favorites`);
  return res.data;
}