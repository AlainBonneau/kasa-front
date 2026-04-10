import { api } from "../api/axioxConfig";
import type {
  AuthUser,
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth";

/**
 * Authentifie un utilisateur.
 *
 * @param {LoginPayload} payload - Les informations de connexion de l'utilisateur.
 * @returns {Promise<AuthResponse>} Les données d'authentification retournées par l'API.
 * @throws {Error} Si la requête API échoue.
 */
export async function loginService(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

/**
 * Inscrit un nouvel utilisateur.
 *
 * @param {RegisterPayload} payload - Les informations nécessaires à l'inscription.
 * @returns {Promise<AuthResponse>} Les données d'authentification retournées par l'API.
 * @throws {Error} Si la requête API échoue.
 */
export async function registerService(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function getUserProfileService(user: { id: number }): Promise<AuthUser> {
  const { data } = await api.get<AuthUser>(`/api/users/${user.id}`);
  return data;
}
