// Tipos gerados/mantidos manualmente a partir do schema Supabase.
// Nesta Etapa 1 contém apenas o necessário para autenticação compilar.
// Será substituído/expandido na Etapa 3 (migrations completas: opportunities,
// wallets, wallet_transactions, consents, audit_logs etc.)

export type UserRole = 'colaborador' | 'admin';

export interface ProfileRow {
  id: string; // = auth.users.id
  full_name: string;
  phone: string | null;
  city: string | null;
  neighborhood: string | null;
  avatar_url: string | null;
  status: 'ativo' | 'bloqueado';
  created_at: string;
}

export interface UserRoleRow {
  user_id: string;
  role: UserRole;
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Partial<ProfileRow> & { id: string; full_name: string };
        Update: Partial<ProfileRow>;
      };
      user_roles: {
        Row: UserRoleRow;
        Insert: UserRoleRow;
        Update: Partial<UserRoleRow>;
      };
    };
  };
}
