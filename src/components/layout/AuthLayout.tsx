import type { ReactNode } from 'react';

export function AuthLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-capta-800 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="font-display text-2xl font-bold tracking-tight text-white">
            LC <span className="text-capta-300">CAPTA</span>
          </span>
        </div>
        <div className="card">
          <h1 className="font-display text-xl font-semibold text-capta-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-capta-500">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
