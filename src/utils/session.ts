import { SignJWT, jwtVerify } from 'jose';

export interface User {
  id: number;
  nombre: string;
  userName: string;
  role: string;
  socesId: number;
  correo: string;
}

const getSecret = () => {
  const secret = import.meta.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET no definido');
  return new TextEncoder().encode(secret);
};

const isProduction = import.meta.env.PROD;

export async function createSessionCookie(user: User): Promise<string> {
  const secret = getSecret();

  const token = await new SignJWT({
    id: user.id,
    nombre: user.nombre,
    userName: user.userName,
    role: user.role,
    socesId: user.socesId,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return `session=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400${isProduction ? '; Secure' : ''}`;
}

export async function getUserFromRequest(request: Request): Promise<User | null> {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const match = cookieHeader.match(/session=([^;]+)/);
  if (!match) return null;

  try {
    const secret = getSecret();
    const { payload } = await jwtVerify(match[1], secret);
    return payload as unknown as User;
  } catch {
    return null;
  }
}

export function clearSessionCookie(): string {
  return `session=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${isProduction ? '; Secure' : ''}`;
}

export async function requireAuth(request: Request): Promise<{
  user: User | null;
  redirectResponse: Response | null;
}> {
  const user = await getUserFromRequest(request);

  if (!user) {
    return {
      user: null,
      redirectResponse: new Response(null, {
        status: 302,
        headers: { Location: '/login' },
      }),
    };
  }

  return { user, redirectResponse: null };
}

export function requireRole(user: User | null, allowedRoles: string[]): boolean {
  return user !== null && allowedRoles.includes(user.role);
}