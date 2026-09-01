import type { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { signOut } from '@/services/authService';
import { ROUTES } from '@/constants/routes';

interface NavItem {
  to: string;
  label: string;
}

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
    isActive ? 'bg-capta-700 text-white' : 'text-capta-100 hover:bg-capta-700/60',
  ].join(' ');
}

export function AppShell({ navItems, children }: { navItems: NavItem[]; children?: ReactNode }) {
  const { profile } = useAuth();

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="flex w-64 shrink-0 flex-col bg-capta-800 px-4 py-6">
        <span className="mb-8 px-2 font-display text-lg font-bold text-white">
          LC <span className="text-capta-300">CAPTA</span>
        </span>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-capta-700 pt-4">
          <p className="truncate px-2 text-sm text-capta-200">{profile?.full_name ?? '—'}</p>
          <button
            onClick={() => signOut()}
            className="mt-2 w-full rounded-lg px-2 py-2 text-left text-sm text-capta-300 hover:text-white"
          >
            Sair
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 md:p-10">{children ?? <Outlet />}</main>
    </div>
  );
}

export { ROUTES };
