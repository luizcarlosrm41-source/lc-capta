import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // Falha alto e cedo em dev: evita bugs silenciosos de auth/dados.
  // eslint-disable-next-line no-console
  console.error(
    '[LC CAPTA] Variáveis VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY não configuradas. ' +
      'Copie .env.example para .env e preencha com os dados do seu projeto Supabase.'
  );
}

// Cliente único e compartilhado — nunca instanciar outro em outros arquivos.
// Usa apenas a anon key (segura para o frontend); toda operação sensível
// depende das políticas de RLS configuradas no banco.
export const supabase = createClient<Database>(
  supabaseUrl ?? '',
  supabaseAnonKey ?? ''
);
