// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSessionCookie(user: any): string {
  const sessionData = {
    id: user.id,
    nombre: user.nombre,
    userName: user.userName,
    role: user.role,
    socesId: user.socesId,    // <-- AÑADIR ESTA LÍNEA
  };

  return `session=${encodeURIComponent(JSON.stringify(sessionData))}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`;
}

export function clearSessionCookie(): string {
  return 'session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getUserFromRequest(request: Request): any | null {
  const sessionCookie = request.headers.get('cookie');

  if (!sessionCookie || !sessionCookie.includes('session=')) {
    return null;
  }

  try {
    const sessionData = sessionCookie.split('session=')[1].split(';')[0];
    return JSON.parse(decodeURIComponent(sessionData));
  } catch {
    return null;
  }
}
