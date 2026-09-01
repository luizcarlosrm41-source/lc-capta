import { Link } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <p className="font-display text-6xl font-bold text-capta-300">404</p>
      <p className="mt-2 text-capta-600">Esta página não existe.</p>
      <Link to={ROUTES.LOGIN} className="btn-primary mt-6">
        Voltar ao início
      </Link>
    </div>
  );
}
