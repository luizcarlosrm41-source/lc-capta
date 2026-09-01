import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { TextField } from '@/components/ui/TextField';
import { signUp } from '@/services/authService';
import { ROUTES } from '@/constants/routes';

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    setSubmitting(true);
    try {
      await signUp({ fullName, phone, email, password });
      navigate(ROUTES.COLABORADOR_HOME);
    } catch {
      setError('Não foi possível concluir o cadastro. Verifique os dados e tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Criar conta de colaborador" subtitle="Cadastre-se para começar a enviar oportunidades">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Nome completo"
          name="fullName"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          label="Telefone"
          name="phone"
          type="tel"
          placeholder="(00) 00000-0000"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
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
          autoComplete="new-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? 'Criando conta…' : 'Criar conta'}
        </button>
      </form>
      <p className="mt-5 text-center text-sm">
        Já tem conta?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-capta-600 hover:underline">
          Entrar
        </Link>
      </p>
    </AuthLayout>
  );
}
