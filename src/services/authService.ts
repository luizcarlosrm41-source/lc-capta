import { supabase } from '@/lib/supabaseClient';

// Camada de serviço: isola chamadas ao Supabase do resto da app.
// Se um dia trocarmos de provedor de auth, só este arquivo muda.

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(params: {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email: params.email,
    password: params.password,
    options: {
      data: {
        full_name: params.fullName,
        phone: params.phone,
      },
    },
  });
  if (error) throw error;
  // O perfil (tabela profiles) é criado automaticamente por um trigger no
  // banco (definido na Etapa 3) a partir dos metadados acima — o frontend
  // nunca insere diretamente em `profiles` no cadastro.
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function requestPasswordReset(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/recuperar-senha/nova`,
  });
  if (error) throw error;
}

export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}
