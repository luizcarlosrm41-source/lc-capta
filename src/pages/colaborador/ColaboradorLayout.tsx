import { AppShell } from '@/components/layout/AppShell';
import { ROUTES } from '@/constants/routes';

const NAV_ITEMS = [
  { to: ROUTES.COLABORADOR_HOME, label: 'Início' },
  { to: ROUTES.COLABORADOR_NOVA_OPORTUNIDADE, label: 'Nova oportunidade' },
  { to: ROUTES.COLABORADOR_MINHAS_OPORTUNIDADES, label: 'Minhas oportunidades' },
  { to: ROUTES.COLABORADOR_PERFIL, label: 'Meu perfil' },
];

export default function ColaboradorLayout() {
  return <AppShell navItems={NAV_ITEMS} />;
}
