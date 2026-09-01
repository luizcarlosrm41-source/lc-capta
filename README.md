# LC CAPTA

Plataforma de captação, registro e validação de oportunidades imobiliárias via rede de colaboradores.

**Status:** Etapa 1 concluída — scaffold, autenticação (login/cadastro/recuperação de senha), proteção de rotas por papel (colaborador/admin) e shells de navegação. Funcionalidades de negócio (oportunidades, carteira, painel admin completo) chegam nas próximas etapas.

## Stack

React + TypeScript + Vite + Tailwind CSS + Supabase (Auth + Postgres).

## Como rodar localmente

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um projeto gratuito em [supabase.com](https://supabase.com) (New Project).
3. Copie `.env.example` para `.env` e preencha com a URL e a `anon key` do seu projeto (Project Settings > API):
   ```bash
   cp .env.example .env
   ```
4. Rode a migration inicial: abra o **SQL Editor** do seu projeto Supabase e execute o conteúdo de `supabase/migrations/0001_init_profiles_roles.sql`.
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Acesse `http://localhost:5173`, crie uma conta e faça login.

### Tornar um usuário administrador

Por segurança, ninguém vira admin sozinho pelo app. Após criar sua conta, no **SQL Editor** do Supabase:

```sql
update public.user_roles set role = 'admin' where user_id = 'SEU_USER_ID_AQUI';
```

(o `user_id` aparece em Authentication > Users, no painel do Supabase)

## Publicar gratuitamente (Vercel)

1. Suba este código para um repositório no GitHub.
2. Em [vercel.com](https://vercel.com), importe o repositório.
3. Em "Environment Variables", adicione `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com os mesmos valores do seu `.env`.
4. Deploy. Pronto — o Vercel publica automaticamente a cada push.

## Estrutura de pastas

```
src/
  components/   componentes reutilizáveis (layout, ui)
  context/      contexto global (AuthContext)
  constants/    rotas e outras constantes
  lib/          cliente Supabase
  pages/        páginas por área (auth, colaborador, admin)
  services/     chamadas ao Supabase isoladas por domínio
  types/        tipos do banco de dados
supabase/
  migrations/   migrations SQL, aplicadas manualmente no SQL Editor por ora
```

## Segurança

- A `service_role key` do Supabase **nunca** deve entrar neste repositório nem no frontend — apenas a `anon key` é usada aqui.
- A proteção de rotas no frontend (`ProtectedRoute`) é só uma camada de UX. A segurança real vem das políticas de **RLS** definidas nas migrations.
