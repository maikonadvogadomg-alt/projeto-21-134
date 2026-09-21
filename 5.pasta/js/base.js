// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA BASE - GERENCIADOR CENTRAL
// ═══════════════════════════════════════════════════════════════════════════

const Base = {
  state: {
    projects: [],
    activeProject: null,
    currentModule: 'projetos',
    repoConnected: false,
    syncLog: []
  },

  // ── INICIALIZAR ──
  init() {
    this.loadState();
    this.renderHeader();
    this.renderSidebar();
    this.renderContent();
    this.setupNavigation();
    this.checkOnlineStatus();
    setInterval(() => this.checkOnlineStatus(), 5000);
  },

  // ── CARREGAR ESTADO ──
  loadState() {
    const saved = localStorage.getItem(CONFIG.storage.state);
    if (saved) {
      this.state = JSON.parse(saved);
    }
  },

  // ── SALVAR ESTADO ──
  saveState() {
    localStorage.setItem(CONFIG.storage.state, JSON.stringify(this.state));
  },

  // ── RENDERIZAR HEADER ──
  renderHeader() {
    const header = document.getElementById('header');
    header.innerHTML = `
            <div class="logo">
                <div class="logo-icon">&lt;/&gt;</div>
                <span>Hub Jurídico</span>
            </div>
            <nav id="mainNav">
                <button class="nav-btn active" data-module="projetos">📁 Projetos</button>
                <button class="nav-btn" data-module="editor">✏️ Editor</button>
                <button class="nav-btn" data-module="repositorio">🐙 Repositório</button>
                <button class="nav-btn" data-module="pwa">📦 PWA</button>
                <button class="nav-btn" data-module="sincronizacao">🔄 Sincronização</button>
            </nav>
            <div class="header-actions">
                <span id="statusBadge" class="status-badge offline">Offline</span>
                <button class="btn btn-base" onclick="Projetos.openNewProjectModal()">+ Novo</button>
                <button class="btn btn-base" onclick="Projetos.importZip()">📥 Importar</button>
            </div>
        `;
  },

  // ── RENDERIZAR SIDEBAR ──
  renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
            <div class="sidebar-section">
                <div class="sidebar-title">Projetos Recentes</div>
                <div id="recentProjects"></div>
            </div>
            <div class="sidebar-section">
                <div class="sidebar-title">Ações Rápidas</div>
                <button class="sidebar-item" onclick="Projetos.openNewProjectModal()">+ Novo Projeto</button>
                <button class="sidebar-item" onclick="Projetos.importZip()">📥 Importar ZIP</button>
                <button class="sidebar-item" onclick="Projetos.exportZip()">📤 Exportar ZIP</button>
                <button class="sidebar-item" onclick="Sincronizacao.syncAll()">🔄 Sincronizar</button>
            </div>
        `;
  },

  // ── RENDERIZAR CONTENT ── 
  renderContent() {
    const content = document.getElementById('content');
    content.innerHTML = `
            <div class="module active" data-module="projetos" id="projetosModule"></div>
            <div class="module" data-module="editor" id="editorModule"></div>
            <div class="module" data-module="repositorio" id="repositorioModule"></div>
            <div class="module" data-module="pwa" id="pwaModule"></div>
            <div class="module" data-module="sincronizacao" id="sincronizacaoModule"></div>
        `;

    // Renderizar cada módulo
    Projetos.render();
    Editor.render();
    Repositorio.render();
    PWA.render();
    Sincronizacao.render();
  },

  // ── SETUP NAVEGAÇÃO ──
  setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const module = btn.dataset.module;
        this.switchModule(module);
      });
    });
  },

  // ── TROCAR MÓDULO ──
  switchModule(module) {
    document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
    document.querySelector(`[data-module="${module}"]`).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-module="${module}"]`).closest('nav').querySelector(`[data-module="${module}"]`).classList.add('active');

    this.state.currentModule = module;
  },

  // ── VERIFICAR STATUS ONLINE ──
  checkOnlineStatus() {
    const badge = document.getElementById('statusBadge');
    if (navigator.onLine) {
      badge.textContent = 'Online';
      badge.className = 'status-badge online';
    } else {
      badge.textContent = 'Offline';
      badge.className = 'status-badge offline';
    }
  },

  // ── ABRIR/FECHAR MODAIS ──
  openModal(id) {
    document.getElementById(id).classList.add('active');
  },

  closeModal(id) {
    document.getElementById(id).classList.remove('active');
  },

  // ── MOSTRAR ALERTA ──
  showAlert(message, type = 'info') {
    const container = document.getElementById('alertContainer') || this.createAlertContainer();
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    container.appendChild(alert);

    setTimeout(() => alert.remove(), 3000);
  },

  createAlertContainer() {
    const container = document.createElement('div');
    container.id = 'alertContainer';
    document.querySelector('.module.active').insertAdjacentElement('afterbegin', container);
    return container;
  }
};
