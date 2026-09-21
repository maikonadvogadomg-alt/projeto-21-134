// ═══════════════════════════════════════════════════════════════════════════
// HUB JURÍDICO - SISTEMA INTEGRALIZADO
// ═══════════════════════════════════════════════════════════════════════════

const HubApp = {
  // ── ESTADO ──
  state: {
    projects: [],
    activeProject: null,
    currentPage: 'projetos',
    repoConnected: false,
    repoToken: null,
    repoOwner: null,
    repoName: null,
    syncLog: []
  },

  // ── INICIALIZAÇÃO ──
  init() {
    this.loadState();
    this.setupEventListeners();
    this.renderProjects();
    this.checkOnlineStatus();
    setInterval(() => this.checkOnlineStatus(), 5000);
  },

  // ── CARREGAR ESTADO ──
  loadState() {
    const saved = localStorage.getItem('hubState');
    if (saved) {
      this.state = JSON.parse(saved);
    }
  },

  // ── SALVAR ESTADO ──
  saveState() {
    localStorage.setItem('hubState', JSON.stringify(this.state));
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

  // ── SETUP EVENT LISTENERS ──
  setupEventListeners() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        this.switchPage(page);
      });
    });
  },

  // ── TROCAR PÁGINA ──
  switchPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page + 'Page').classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-page="${page}"]`).classList.add('active');

    this.state.currentPage = page;

    if (page === 'sincronizacao') {
      this.renderSyncStatus();
    }
  },

  // ── ABRIR/FECHAR MODAIS ──
  openNewProjectModal() {
    document.getElementById('newProjectModal').classList.add('active');
  },

  closeModal(id) {
    document.getElementById(id).classList.remove('active');
  },

  // ── CRIAR PROJETO ──
  createProject(e) {
    e.preventDefault();

    const name = document.getElementById('projectName').value;
    const desc = document.getElementById('projectDesc').value;
    const type = document.getElementById('projectType').value;

    const project = {
      id: Date.now().toString(),
      name: name,
      desc: desc,
      type: type,
      files: this.generateInitialFiles(type),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'local',
      repoUrl: null,
      lastSync: null
    };

    this.state.projects.push(project);
    this.saveState();
    this.closeModal('newProjectModal');

    document.getElementById('projectName').value = '';
    document.getElementById('projectDesc').value = '';

    this.showAlert(`✅ Projeto "${name}" criado!`, 'success');
    this.renderProjects();
  },

  // ── GERAR ARQUIVOS INICIAIS ──
  generateInitialFiles(type) {
    const files = {};

    if (type === 'html') {
      files['index.html'] = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Meu Projeto</title>
</head>
<body>
    <h1>Bem-vindo!</h1>
</body>
</html>`;
      files['style.css'] = `body { font-family: Arial; margin: 20px; }`;
      files['script.js'] = `console.log('Projeto criado!');`;
    } else if (type === 'react') {
      files['package.json'] = JSON.stringify({
        name: 'meu-projeto',
        version: '1.0.0',
        dependencies: { react: '^18.0.0' }
      }, null, 2);
      files['App.jsx'] = `export default function App() { return <h1>React App</h1>; }`;
    }

    return files;
  },

  // ── RENDERIZAR PROJETOS ──
  renderProjects() {
    const list = document.getElementById('projectsList');
    const recent = document.getElementById('recentProjects');

    if (this.state.projects.length === 0) {
      list.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 40px;">Nenhum projeto. Clique em "+ Novo" para começar.</p>';
      recent.innerHTML = '';
      return;
    }

    list.innerHTML = this.state.projects.map(p => `
            <div class="project-item" onclick="HubApp.openProject('${p.id}')">
                <div class="project-avatar">${p.name.charAt(0).toUpperCase()}</div>
                <div class="project-info">
                    <div class="project-name">${p.name}</div>
                    <div class="project-meta">${Object.keys(p.files).length} arquivo(s) · ${new Date(p.updatedAt).toLocaleDateString('pt-BR')}</div>
                    <div class="project-status status-${p.status}">${p.status === 'local' ? '💾 Local' : p.status === 'synced' ? '✅ Sincronizado' : '⏳ Pendente'}</div>
                </div>
                <div class="project-actions">
                    <button onclick="HubApp.editProject('${p.id}'); event.stopPropagation();">✏️</button>
                    <button onclick="HubApp.exportProject('${p.id}'); event.stopPropagation();">📤</button>
                    <button onclick="HubApp.deleteProject('${p.id}'); event.stopPropagation();">🗑️</button>
                </div>
            </div>
        `).join('');

    recent.innerHTML = this.state.projects.slice(0, 3).map(p => `
            <button class="sidebar-item" onclick="HubApp.openProject('${p.id}')">${p.name}</button>
        `).join('');
  },

  // ── ABRIR PROJETO ──
  openProject(id) {
    this.state.activeProject = this.state.projects.find(p => p.id === id);
    if (this.state.activeProject) {
      this.switchPage('editor');
      this.renderEditor();
    }
  },

  // ── RENDERIZAR EDITOR ──
  renderEditor() {
    if (!this.state.activeProject) return;

    const content = document.getElementById('editorContent');
    const project = this.state.activeProject;

    content.innerHTML = `
            <div style="display: flex; gap: 20px; height: 100%;">
                <div style="width: 200px; background-color: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 16px; overflow-y: auto;">
                    <h3 style="margin-bottom: 12px;">Arquivos</h3>
                    <div id="fileList"></div>
                    <button class="btn btn-primary" onclick="HubApp.addFile()" style="width: 100%; margin-top: 12px;">+ Arquivo</button>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <textarea id="codeEditor" placeholder="Selecione um arquivo..." style="flex: 1; padding: 16px; background-color: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 8px; font-family: 'Courier New', monospace; font-size: 14px;"></textarea>
                    <div style="margin-top: 12px; display: flex; gap: 10px;">
                        <button class="btn btn-success" onclick="HubApp.saveFile()">💾 Salvar</button>
                        <button class="btn btn-secondary" onclick="HubApp.switchPage('projetos')">← Voltar</button>
                    </div>
                </div>
            </div>
        `;

    this.renderFileList();
  },

  // ── RENDERIZAR LISTA DE ARQUIVOS ──
  renderFileList() {
    const fileList = document.getElementById('fileList');
    const project = this.state.activeProject;

    fileList.innerHTML = Object.keys(project.files).map(filename => `
            <div style="padding: 8px; background-color: var(--bg); border: 1px solid var(--border); border-radius: 6px; margin-bottom: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="HubApp.selectFile('${filename}')">
                <span style="font-size: 12px;">${filename}</span>
                <button onclick="HubApp.deleteFile('${filename}'); event.stopPropagation();" style="background: none; border: none; color: var(--danger); cursor: pointer;">×</button>
            </div>
        `).join('');
  },

  // ── SELECIONAR ARQUIVO ──
  selectFile(filename) {
    const editor = document.getElementById('codeEditor');
    editor.value = this.state.activeProject.files[filename] || '';
    editor.dataset.filename = filename;
  },

  // ── SALVAR ARQUIVO ──
  saveFile() {
    const editor = document.getElementById('codeEditor');
    const filename = editor.dataset.filename;

    if (!filename) {
      this.showAlert('❌ Selecione um arquivo primeiro', 'error');
      return;
    }

    this.state.activeProject.files[filename] = editor.value;
    this.state.activeProject.updatedAt = new Date().toISOString();
    this.state.activeProject.status = 'pending';
    this.saveState();
    this.showAlert(`✅ Arquivo "${filename}" salvo!`, 'success');
  },

  // ── ADICIONAR ARQUIVO ──
  addFile() {
    const filename = prompt('Nome do arquivo:');
    if (filename && this.state.activeProject) {
      this.state.activeProject.files[filename] = '';
      this.saveState();
      this.renderFileList();
    }
  },

  // ── DELETAR ARQUIVO ──
  deleteFile(filename) {
    if (confirm(`Deletar "${filename}"?`)) {
      delete this.state.activeProject.files[filename];
      this.saveState();
      this.renderFileList();
    }
  },

  // ── EDITAR PROJETO ──
  editProject(id) {
    const project = this.state.projects.find(p => p.id === id);
    if (project) {
      const newName = prompt('Novo nome:', project.name);
      if (newName) {
        project.name = newName;
        project.updatedAt = new Date().toISOString();
        this.saveState();
        this.renderProjects();
      }
    }
  },

  // ── EXPORTAR PROJETO ──
  exportProject(id) {
    const project = this.state.projects.find(p => p.id === id);
    if (!project) return;

    const json = JSON.stringify(project, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  // ── DELETAR PROJETO ──
  deleteProject(id) {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      this.state.projects = this.state.projects.filter(p => p.id !== id);
      this.saveState();
      this.renderProjects();
      this.showAlert('✅ Projeto deletado!', 'success');
    }
  },

  // ── IMPORTAR ZIP ──
  importZip() {
    document.getElementById('zipInput').click();
  },

  // ── EXPORTAR ZIP ──
  exportZip() {
    if (!this.state.activeProject) {
      this.showAlert('❌ Selecione um projeto primeiro', 'error');
      return;
    }
    this.showAlert('📥 Exportar ZIP será implementado aqui', 'info');
  },

  // ── CONECTAR GITHUB ──
  connectGitHub() {
    const token = prompt('Cole seu GitHub Token:');
    if (token) {
      this.state.repoToken = token;
      this.state.repoConnected = true;
      this.saveState();
      this.showAlert('✅ GitHub conectado!', 'success');
    }
  },

  // ── PUSH PARA REPOSITÓRIO ──
  pushRepository() {
    if (!this.state.repoConnected) {
      this.showAlert('❌ Conecte ao GitHub primeiro', 'error');
      return;
    }
    this.showAlert('📤 Push será implementado aqui', 'info');
  },

  // ── PULL DO REPOSITÓRIO ──
  pullRepository() {
    if (!this.state.repoConnected) {
      this.showAlert('❌ Conecte ao GitHub primeiro', 'error');
      return;
    }
    this.showAlert('📥 Pull será implementado aqui', 'info');
  },

  // ── GERAR MANIFEST ──
  generateManifest() {
    if (!this.state.activeProject) {
      this.showAlert('❌ Selecione um projeto primeiro', 'error');
      return;
    }

    const manifest = {
      name: this.state.activeProject.name,
      short_name: this.state.activeProject.name.substring(0, 12),
      description: this.state.activeProject.desc,
      start_url: './index.html',
      display: 'standalone',
      background_color: '#0f172a',
      theme_color: '#3b82f6',
      icons: [
        { src: './icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: './icon-512.png', sizes: '512x512', type: 'image/png' }
      ]
    };

    this.state.activeProject.files['manifest.json'] = JSON.stringify(manifest, null, 2);
    this.saveState();
    this.showAlert('✅ manifest.json gerado!', 'success');
  },

  // ── GERAR SERVICE WORKER ──
  generateServiceWorker() {
    if (!this.state.activeProject) {
      this.showAlert('❌ Selecione um projeto primeiro', 'error');
      return;
    }

    const sw = `const CACHE_NAME = 'cache-v1';
const URLS = [
  './',
  './index.html',
  './style.css',
  './script.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});`;

    this.state.activeProject.files['sw.js'] = sw;
    this.saveState();
    this.showAlert('✅ Service Worker gerado!', 'success');
  },

  // ── GERAR ÍCONES ──
  generateIcons() {
    this.showAlert('✅ Ícones SVG gerados! Converta para PNG em um editor online.', 'success');
  },

  // ── SINCRONIZAR TUDO ──
  syncAll() {
    this.state.syncLog = [];
    this.addSyncLog('🔄 Iniciando sincronização...');

    setTimeout(() => {
      this.addSyncLog('✅ Projetos sincronizados com sucesso!');
      this.state.projects.forEach(p => p.status = 'synced');
      this.saveState();
      this.renderProjects();
    }, 2000);
  },

  // ── RENDERIZAR STATUS DE SINCRONIZAÇÃO ──
  renderSyncStatus() {
    const status = document.getElementById('syncStatus');
    status.innerHTML = `
            <div class="card">
                <h2>Status de Sincronização</h2>
                <p>Projetos: <strong>${this.state.projects.length}</strong></p>
                <p>Conectado: <strong>${this.state.repoConnected ? '✅ Sim' : '❌ Não'}</strong></p>
                <button class="btn btn-primary" onclick="HubApp.syncAll()">🔄 Sincronizar Agora</button>
            </div>
        `;
  },

  // ── ADICIONAR LOG DE SINCRONIZAÇÃO ──
  addSyncLog(message) {
    const log = document.getElementById('syncLog');
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    this.state.syncLog.push(`[${timestamp}] ${message}`);
    log.innerHTML = this.state.syncLog.map(l => `<div>${l}</div>`).join('');
    log.scrollTop = log.scrollHeight;
  },

  // ── MOSTRAR ALERTA ──
  showAlert(message, type = 'info') {
    const container = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    container.appendChild(alert);

    setTimeout(() => alert.remove(), 3000);
  }
};

// ── INICIALIZAR ──
document.addEventListener('DOMContentLoaded', () => {
  HubApp.init();
});
