import { api } from "../api/axioxConfig";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth";

export async function loginService(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
}

export async function registerService(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/auth/register", payload);
  return data;
}
