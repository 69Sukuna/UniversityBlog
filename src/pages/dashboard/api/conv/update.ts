import type { APIRoute } from 'astro';
import { db, Convocatorias, eq } from 'astro:db';
import { getUserFromRequest } from '../../../../utils/session';
import { requireRole } from '../../../../utils/auth';

export const POST: APIRoute = async ({ request, redirect }) => {
  let convocatoriaId = 0;

  try {
    const user = getUserFromRequest(request);

    if (!user || !requireRole(user, ['user'])) {
      return redirect('/login');
    }

    const formData = await request.formData();

    // Cambiado de 'ConvocatoriaId' a 'convocatoriaId' para coincidir con el formulario
    convocatoriaId = parseInt(formData.get('convocatoriaId')?.toString() || '0');
    const titulo = formData.get('titulo')?.toString();
    const contenido = formData.get('contenido')?.toString();
    const link = formData.get('link')?.toString() || '';
    const link2 = formData.get('link2')?.toString() || '';

    // Validación mejorada
    if (!convocatoriaId || !titulo?.trim() || !contenido?.trim()) {
      return redirect(`/dashboard/conv/${convocatoriaId}/edit?error=validation`);
    }

    // Verificar que la convocatoria existe antes de actualizar
    const existingConvocatoria = await db
      .select()
      .from(Convocatorias)
      .where(eq(Convocatorias.id, convocatoriaId));

    if (existingConvocatoria.length === 0) {
      return redirect(`/dashboard/conv?error=not_found`);
    }

    // Actualizar directamente sin variable intermedia
    await db
      .update(Convocatorias)
      .set({
        titulo: titulo.trim(),
        contenido: contenido.trim(),
        link: link?.trim() || '',
        link2: link2?.trim() || '',
      })
      .where(eq(Convocatorias.id, convocatoriaId));

    return redirect('/dashboard/conv?message=updated');
  } catch (error) {
    console.error('Error updating convocatoria:', error);
    return redirect(`/dashboard/conv/${convocatoriaId}/edit?error=server`);
  }
};