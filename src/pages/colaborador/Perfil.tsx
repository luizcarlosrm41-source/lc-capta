import { useAuth } from '@/context/AuthContext';

export default function Perfil() {
  const { profile } = useAuth();
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-capta-900">Meu perfil</h1>
      <div className="card mt-6 max-w-lg space-y-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-capta-400">Nome</p>
          <p className="text-capta-900">{profile?.full_name ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-capta-400">Telefone</p>
          <p className="text-capta-900">{profile?.phone ?? '—'}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-capta-400">Status</p>
          <p className="text-capta-900">{profile?.status ?? '—'}</p>
        </div>
      </div>
    </div>
  );
}
