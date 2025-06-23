export function decodeJWT<T = any>(token: string): T | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    // Decode payload
    const payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const decoded = atob(payload);
    return JSON.parse(decoded) as T;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const decoded = decodeJWT<{ exp?: number }>(token);
  if (!decoded || typeof decoded.exp !== 'number') return true;
  const now = Math.floor(Date.now() / 1000);
  return now >= decoded.exp;
}