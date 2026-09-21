// ═══════════════════════════════════════════════════════════════════════════
// SISTEMA CORE - GERENCIADOR DE MÓDULOS
// ═══════════════════════════════════════════════════════════════════════════

const ModuleSystem = {
  modules: {},
  activeModule: null,
  state: {
    projects: JSON.parse(localStorage.getItem('projects')) || [],
    activeProject: null,
    currentModule: 'projetos'
  },

  // ── REGISTRAR MÓDULO ──
  register(name, module) {
    if (!module.html || !module.init || !module.render) {
      console.error(`❌ Módulo "${name}" incompleto. Precisa de: html, init, render`);
      return false;
    }

    this.modules[name] = module;
    console.log(`✅ Módulo "${name}" registrado`);
    return true;
  },

  // ── ATIVAR MÓDULO ──
  activate(name) {
    if (!this.modules[name]) {
      console.error(`❌ Módulo "${name}" não encontrado`);
      return false;
    }

    // Desativar módulo anterior
    if (this.activeModule && this.modules[this.activeModule].destroy) {
      this.modules[this.activeModule].destroy();
    }

    this.activeModule = name;
    this.state.currentModule = name;

    const module = this.modules[name];

    // Renderizar HTML do módulo
    const app = document.getElementById('app');
    app.innerHTML = module.html;

    // Inicializar módulo
    if (module.init) {
      module.init();
    }

    // Renderizar conteúdo
    if (module.render) {
      module.render();
    }

    console.log(`🔄 Módulo "${name}" ativado`);
    return true;
  },

  // ── OBTER MÓDULO ──
  get(name) {
    return this.modules[name] || null;
  },

  // ── LISTAR MÓDULOS ──
  list() {
    return Object.keys(this.modules);
  },

  // ── SALVAR ESTADO ──
  saveState() {
    localStorage.setItem('projects', JSON.stringify(this.state.projects));
  },

  // ── RENDERIZAR NAVEGAÇÃO ──
  renderNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'main-nav';

    Object.keys(this.modules).forEach(name => {
      const btn = document.createElement('button');
      btn.className = 'nav-btn';
      btn.textContent = this.modules[name].label || name;
      btn.onclick = () => this.activate(name);
      nav.appendChild(btn);
    });

    return nav;
  },

  // ── INJETAR ESTILOS GLOBAIS ──
  injectStyles() {
    const styles = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :root {
                --bg: #0f172a;
                --card: #1e293b;
                --border: #334155;
                --text: #f1f5f9;
                --muted: #94a3b8;
                --primary: #3b82f6;
                --success: #22c55e;
                --danger: #ef4444;
                --warning: #f59e0b;
                --accent: #7c3aed;
            }

            body {
                background-color: var(--bg);
                color: var(--text);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
            }

            #app {
                min-height: 100vh;
                display: flex;
                flex-direction: column;
            }

            .main-nav {
                display: flex;
                gap: 10px;
                padding: 16px 20px;
                background-color: var(--card);
                border-bottom: 1px solid var(--border);
                overflow-x: auto;
            }

            .nav-btn {
                background: none;
                border: 1px solid var(--border);
                color: var(--muted);
                padding: 8px 16px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s;
                white-space: nowrap;
            }

            .nav-btn:hover {
                background-color: var(--border);
                color: var(--text);
            }

            .nav-btn.active {
                background-color: var(--primary);
                color: white;
                border-color: var(--primary);
            }

            .module-content {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
            }

            .btn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 10px 16px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.2s;
            }

            .btn-primary {
                background-color: var(--primary);
                color: white;
            }

            .btn-primary:hover {
                background-color: #2563eb;
            }

            .btn-success {
                background-color: var(--success);
                color: white;
            }

            .btn-success:hover {
                background-color: #16a34a;
            }

            .btn-danger {
                background-color: var(--danger);
                color: white;
            }

            .btn-danger:hover {
                background-color: #dc2626;
            }

            .modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 1000;
                align-items: center;
                justify-content: center;
            }

            .modal.active {
                display: flex;
            }

            .modal-content {
                background-color: var(--card);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 20px;
                border-bottom: 1px solid var(--border);
            }

            .modal-header h2 {
                font-size: 20px;
            }

            .close-btn {
                background: none;
                border: none;
                color: var(--muted);
                font-size: 24px;
                cursor: pointer;
                padding: 0;
            }

            .form-group {
                margin-bottom: 16px;
            }

            label {
                display: block;
                margin-bottom: 6px;
                font-size: 13px;
                font-weight: 600;
                color: var(--muted);
            }

            input, textarea {
                width: 100%;
                padding: 10px 12px;
                border: 1px solid var(--border);
                border-radius: 8px;
                background-color: var(--bg);
                color: var(--text);
                font-size: 14px;
                font-family: inherit;
                transition: border-color 0.2s;
            }

            input:focus, textarea:focus {
                outline: none;
                border-color: var(--primary);
            }

            textarea {
                resize: vertical;
                min-height: 100px;
                font-family: 'Courier New', monospace;
            }

            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 20px;
            }

            .card {
                background-color: var(--card);
                border: 1px solid var(--border);
                border-radius: 12px;
                padding: 20px;
                transition: all 0.2s;
            }

            .card:hover {
                border-color: var(--primary);
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.1);
            }

            .card h3 {
                font-size: 16px;
                margin-bottom: 10px;
            }

            .card p {
                color: var(--muted);
                font-size: 14px;
            }

            .list {
                display: flex;
                flex-direction: column;
                gap: 12px;
            }

            .list-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px;
                background-color: var(--bg);
                border: 1px solid var(--border);
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .list-item:hover {
                background-color: var(--card);
                border-color: var(--primary);
            }

            .list-item-avatar {
                width: 40px;
                height: 40px;
                border-radius: 8px;
                background: linear-gradient(135deg, #3b82f6, #22c55e);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: 700;
                font-size: 14px;
            }

            .list-item-info {
                flex: 1;
            }

            .list-item-title {
                font-size: 15px;
                font-weight: 600;
                color: var(--text);
            }

            .list-item-meta {
                font-size: 12px;
                color: var(--muted);
                margin-top: 2px;
            }

            .list-item-actions {
                display: flex;
                gap: 6px;
            }

            .list-item-actions button {
                background: none;
                border: none;
                color: var(--muted);
                cursor: pointer;
                padding: 4px;
                transition: color 0.2s;
            }

            .list-item-actions button:hover {
                color: var(--text);
            }

            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }

            ::-webkit-scrollbar-track {
                background: var(--bg);
            }

            ::-webkit-scrollbar-thumb {
                background: var(--border);
                border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: var(--muted);
            }
        `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
};

// Injetar estilos ao carregar
ModuleSystem.injectStyles();
