import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants/routes';
import type { UserRole } from '@/types/database';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

// IMPORTANTE: esta proteção é apenas de UX (evita mostrar telas erradas).
// A segurança de verdade é garantida pelas políticas RLS no Supabase —
// nunca confiar somente nesta checagem do frontend.
export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface">
        <p className="text-sm text-capta-500">Carregando…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.COLABORADOR_HOME} replace />;
  }

  return <Outlet />;
}
