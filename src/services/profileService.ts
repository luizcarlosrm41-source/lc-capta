import { supabase } from '@/lib/supabaseClient';
import type { ProfileRow, UserRole } from '@/types/database';

export async function getMyProfile(userId: string): Promise<ProfileRow | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single<ProfileRow>();

  // RLS garante que só é possível buscar o próprio perfil (colaborador) ou
  // qualquer perfil (admin) — ver política em Etapa 3.
  if (error) {
    if (error.code === 'PGRST116') return null; // nenhuma linha encontrada
    throw error;
  }
  return data;
}

export async function getMyRole(userId: string): Promise<UserRole> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single<{ role: UserRole }>();

  if (error) {
    // Sem registro em user_roles => trata como colaborador (perfil padrão).
    // Nunca assumir admin por ausência de dado.
    return 'colaborador';
  }
  return data.role;
}
