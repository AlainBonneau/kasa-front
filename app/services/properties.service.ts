import { api } from "../api/axioxConfig";
import type { Property } from "../types/property";

export async function listProperties() {
  const response = await api.get<Property[]>("/api/properties");
  return response.data;
}

export async function getPropertyById(id: string) {
  const response = await api.get<Property>(`/api/properties/${id}`);
  return response.data;
}

export async function createProperty(propertyData: {
  title: string;
  description: string;
  location: string;
  price_per_night: number;
  host_id: string | number;
  cover: string | null;
  pictures: string[];
  equipments: string[];
  tags: string[];
}) {
  try {
    const response = await api.post("/api/properties", propertyData);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Create property status:", error?.response?.status);
    console.error("Create property data:", error?.response?.data);
    throw error;
  }
}
