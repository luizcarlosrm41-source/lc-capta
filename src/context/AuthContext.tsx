import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { getMyProfile, getMyRole } from '@/services/profileService';
import type { ProfileRow, UserRole } from '@/types/database';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: ProfileRow | null;
  role: UserRole | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfileAndRole(userId: string) {
    const [profileData, roleData] = await Promise.all([
      getMyProfile(userId),
      getMyRole(userId),
    ]);
    setProfile(profileData);
    setRole(roleData);
  }

  async function refreshProfile() {
    if (session?.user) await loadProfileAndRole(session.user.id);
  }

  useEffect(() => {
    let isMounted = true;

    // Carrega sessão inicial (ex.: refresh de página).
    supabase.auth.getSession().then(async ({ data }) => {
      if (!isMounted) return;
      setSession(data.session);
      if (data.session?.user) {
        await loadProfileAndRole(data.session.user.id);
      }
      setLoading(false);
    });

    // Mantém sessão sincronizada em login/logout/refresh de token.
    const { data: subscription } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (!isMounted) return;
      setSession(newSession);
      if (newSession?.user) {
        await loadProfileAndRole(newSession.user.id);
      } else {
        setProfile(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value: AuthContextValue = {
    user: session?.user ?? null,
    session,
    profile,
    role,
    loading,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth precisa ser usado dentro de <AuthProvider>');
  return ctx;
}
