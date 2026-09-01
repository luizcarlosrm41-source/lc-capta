import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { TextField } from '@/components/ui/TextField';
import { signIn } from '@/services/authService';
import { ROUTES } from '@/constants/routes';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email, password);
      navigate(ROUTES.COLABORADOR_HOME);
    } catch {
      // Nunca expor detalhes técnicos do erro de auth ao usuário.
      setError('E-mail ou senha inválidos.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Entrar" subtitle="Acesse sua conta de colaborador">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="E-mail"
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          name="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
      <div className="mt-5 flex items-center justify-between text-sm">
        <Link to={ROUTES.FORGOT_PASSWORD} className="text-capta-500 hover:underline">
          Esqueci minha senha
        </Link>
        <Link to={ROUTES.REGISTER} className="font-medium text-capta-600 hover:underline">
          Criar conta
        </Link>
      </div>
    </AuthLayout>
  );
}
