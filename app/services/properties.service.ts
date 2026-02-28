import { api } from "../api/axioxConfig";
import type { Property } from "../types/property";

export async function listProperties() {
  const response = await api.get<Property[]>("/api/properties");
  return response.data;
}
