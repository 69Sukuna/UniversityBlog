import type { APIRoute } from 'astro';
import { db, Usuarios, eq, or } from 'astro:db';
import { AuthService } from '../../../../utils/auth';
import { getUserFromRequest } from '../../../../utils/session';
import { requireRole } from '../../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const user = getUserFromRequest(request);

    if (!user || !requireRole(user, ['admin'])) {
      return redirect('/login');
    }

    const formData = await request.formData();
    const nombre = formData.get('nombre')?.toString();
    const userName = formData.get('userName')?.toString();
    const correo = formData.get('correo')?.toString();
    const role = formData.get('role')?.toString();
    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();

    // Validaciones
    if (!nombre || !userName || !correo || !role || !password || !confirmPassword) {
      return redirect('/admin/users/create?error=validation');
    }

    if (password !== confirmPassword) {
      return redirect('/admin/users/create?error=validation');
    }

    if (password.length < 6) {
      return redirect('/admin/users/create?error=validation');
    }

    // Verificar si el usuario ya existe
    const existingUsers = await db
      .select()
      .from(Usuarios)
      .where(or(eq(Usuarios.userName, userName), eq(Usuarios.correo, correo)));

    if (existingUsers.length > 0) {
      return redirect('/admin/users/create?error=exists');
    }

    // Hashear contraseña
    const hashedPassword = await AuthService.hashPassword(password);

    // Crear usuario
    await db.insert(Usuarios).values({
      nombre,
      userName,
      correo,
      role,
      password: hashedPassword,
      socesId: parseInt(formData.get('socesId')?.toString() || '0'),
    });

    return redirect('/admin/users?message=created');
  } catch (error) {
    console.error('Error creating user:', error);
    return redirect('/admin/users/create?error=server');
  }
};
