-- LC CAPTA — Migration 0001
-- Escopo: perfis de usuário, papéis (role) e as políticas RLS mínimas para
-- a Etapa 1/2 (auth) funcionarem de ponta a ponta. As tabelas de negócio
-- (opportunities, wallets, consents, audit_logs etc.) entram na Etapa 3.

-- 1) Tabela de perfis, 1:1 com auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone text,
  city text,
  neighborhood text,
  avatar_url text,
  status text not null default 'ativo' check (status in ('ativo', 'bloqueado')),
  created_at timestamptz not null default now()
);

-- 2) Papéis de usuário — tabela separada (nunca um campo "is_admin" em profiles,
-- que seria editável indiretamente). Um usuário tem no máximo um papel aqui.
create table if not exists public.user_roles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('colaborador', 'admin')),
  created_at timestamptz not null default now()
);

-- 3) Trigger: ao criar um usuário no Supabase Auth, criar automaticamente o
-- perfil (a partir dos metadados enviados no signUp) e o papel padrão
-- "colaborador". Promover a admin é uma ação manual (SQL editor / futuro
-- painel), nunca algo que o próprio usuário controla.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.raw_user_meta_data ->> 'phone'
  );

  insert into public.user_roles (user_id, role)
  values (new.id, 'colaborador');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4) RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;

-- Helper: usuário autenticado atual é admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = 'admin'
  );
$$;

-- profiles: colaborador vê/edita só o próprio; admin vê todos.
create policy "profiles_select_own_or_admin"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles_update_own_or_admin"
  on public.profiles for update
  using (id = auth.uid() or public.is_admin());

-- Nenhuma policy de INSERT/DELETE em profiles: a criação é feita apenas
-- pelo trigger (security definer), nunca diretamente pelo cliente.

-- user_roles: usuário vê só o próprio papel; admin vê todos. Escrita é
-- restrita a admin (promover/rebaixar usuários).
create policy "user_roles_select_own_or_admin"
  on public.user_roles for select
  using (user_id = auth.uid() or public.is_admin());

create policy "user_roles_write_admin_only"
  on public.user_roles for all
  using (public.is_admin())
  with check (public.is_admin());
