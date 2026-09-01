// Centraliza todos os caminhos da aplicação — nunca hardcode strings de rota
// em componentes. Facilita renomear/reorganizar sem quebrar links.
export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/cadastro',
  FORGOT_PASSWORD: '/recuperar-senha',

  COLABORADOR_HOME: '/app',
  COLABORADOR_NOVA_OPORTUNIDADE: '/app/nova-oportunidade',
  COLABORADOR_MINHAS_OPORTUNIDADES: '/app/minhas-oportunidades',
  COLABORADOR_PERFIL: '/app/perfil',

  ADMIN_HOME: '/admin',
  ADMIN_OPORTUNIDADES: '/admin/oportunidades',
  ADMIN_COLABORADORES: '/admin/colaboradores',
} as const;
