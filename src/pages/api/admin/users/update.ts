import type { APIRoute } from 'astro';
import { db, Usuarios, eq, or, and } from 'astro:db';
import { AuthService } from '../../../../utils/auth';
import { getUserFromRequest } from '../../../../utils/session';
import { requireRole } from '../../../../utils/auth';
import { sql } from 'astro:db';

export const POST: APIRoute = async ({ request, redirect }) => {
  let userId = 0;
  try {
    const user = getUserFromRequest(request);

    if (!user || !requireRole(user, ['admin'])) {
      return redirect('/login');
    }

    const formData = await request.formData();
    userId = parseInt(formData.get('userId')?.toString() || '0');
    const nombre = formData.get('nombre')?.toString();
    const userName = formData.get('userName')?.toString();
    const correo = formData.get('correo')?.toString();
    const role = formData.get('role')?.toString();
    const password = formData.get('password')?.toString();
    const confirmPassword = formData.get('confirmPassword')?.toString();
    const socesId = parseInt(formData.get('socesId')?.toString() || '0');

    if (!userId || !nombre || !userName || !correo || !role) {
      return redirect(`/admin/users/${userId}/edit?error=validation`);
    }

    // Si se proporciona contraseña, validar
    if (password && password !== confirmPassword) {
      return redirect(`/admin/users/${userId}/edit?error=validation`);
    }

    if (password && password.length < 6) {
      return redirect(`/admin/users/${userId}/edit?error=validation`);
    }

    // Verificar si userName o correo ya existen (excluyendo el usuario actual)
    const existingUsers = await db
      .select()
      .from(Usuarios)
      .where(
        and(
          or(eq(Usuarios.userName, userName), eq(Usuarios.correo, correo)),
          // Excluir el usuario actual
          sql`${Usuarios.id} != ${userId}`
        )
      );

    if (existingUsers.length > 0) {
      return redirect(`/admin/users/${userId}/edit?error=exists`);
    }

    // Preparar datos para actualizar
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {
      nombre,
      userName,
      correo,
      role,
    };

    // Solo actualizar contraseña si se proporciona
    if (password) {
      updateData.password = await AuthService.hashPassword(password);
    }
    
    if (socesId) {
      updateData.socesId = socesId;
    }

    // Actualizar usuario
    await db.update(Usuarios).set(updateData).where(eq(Usuarios.id, userId));

    return redirect('/admin/users?message=updated');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return redirect(`/admin/users/${userId}/edit?error=server`);
  }
};
