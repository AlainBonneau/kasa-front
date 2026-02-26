export type JwtPayload = {
  id: number;
  role: "owner" | "client" | "admin";
  name: string;
  email: string | null;
  iat?: number;
  exp?: number;
};

function base64UrlToBase64(input: string) {
  return input.replace(/-/g, "+").replace(/_/g, "/");
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payloadBase64 = base64UrlToBase64(parts[1]);
    const json = atob(payloadBase64);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function isJwtExpired(payload: JwtPayload): boolean {
  if (!payload.exp) return false;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
}
