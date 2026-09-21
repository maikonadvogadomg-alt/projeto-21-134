// ═══════════════════════════════════════════════════════════════════════════
// CONFIGURAÇÕES GLOBAIS
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
  // Cores dos módulos
  colors: {
    base: '#3b82f6',
    projetos: '#22c55e',
    editor: '#7c3aed',
    repositorio: '#f97316',
    pwa: '#ec4899',
    sincronizacao: '#eab308'
  },

  // Módulos disponíveis
  modules: [
    'projetos',
    'editor',
    'repositorio',
    'pwa',
    'sincronizacao'
  ],

  // Storage keys
  storage: {
    state: 'hubState',
    projects: 'hubProjects',
    repo: 'hubRepo'
  }
};
