import { AppShell } from '@/components/layout/AppShell';
import { ROUTES } from '@/constants/routes';

const NAV_ITEMS = [
  { to: ROUTES.ADMIN_HOME, label: 'Dashboard' },
  { to: ROUTES.ADMIN_OPORTUNIDADES, label: 'Oportunidades' },
  { to: ROUTES.ADMIN_COLABORADORES, label: 'Colaboradores' },
];

export default function AdminLayout() {
  return <AppShell navItems={NAV_ITEMS} />;
}
