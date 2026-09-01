import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { TextField } from '@/components/ui/TextField';
import { requestPasswordReset } from '@/services/authService';
import { ROUTES } from '@/constants/routes';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await requestPasswordReset(email);
    } finally {
      // Sempre mostrar a mesma mensagem, exista ou não o e-mail —
      // evita vazar quais e-mails estão cadastrados na plataforma.
      setSent(true);
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout title="Recuperar senha" subtitle="Enviaremos um link de redefinição para seu e-mail">
      {sent ? (
        <p className="text-sm text-capta-700">
          Se o e-mail informado estiver cadastrado, você receberá um link para redefinir sua senha em instantes.
        </p>
      ) : (
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
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting ? 'Enviando…' : 'Enviar link'}
          </button>
        </form>
      )}
      <p className="mt-5 text-center text-sm">
        <Link to={ROUTES.LOGIN} className="font-medium text-capta-600 hover:underline">
          Voltar ao login
        </Link>
      </p>
    </AuthLayout>
  );
}
