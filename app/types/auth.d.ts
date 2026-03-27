export type Role = "owner" | "client" | "admin";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  picture: string | null;
  role: Role;
};

export type AuthResponse = {
  token: string;
  user: AuthUser;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  picture?: string | null;
  role?: "owner" | "client" | "admin";
};
