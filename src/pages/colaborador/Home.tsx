import { useAuth } from '@/context/AuthContext';

export default function ColaboradorHome() {
  const { profile } = useAuth();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-capta-900">
        Olá, {profile?.full_name?.split(' ')[0] ?? 'colaborador'}
      </h1>
      <p className="mt-1 text-capta-500">
        Este é o painel do colaborador. O formulário de nova oportunidade e o histórico
        completo chegam na Etapa 4.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card">
          <p className="text-sm text-capta-500">Oportunidades enviadas</p>
          <p className="mt-2 font-display text-3xl font-bold text-capta-800">—</p>
        </div>
        <div className="card">
          <p className="text-sm text-capta-500">Aprovadas</p>
          <p className="mt-2 font-display text-3xl font-bold text-capta-800">—</p>
        </div>
        <div className="card">
          <p className="text-sm text-capta-500">Saldo disponível</p>
          <p className="mt-2 font-display text-3xl font-bold text-capta-800">—</p>
        </div>
      </div>
    </div>
  );
}
