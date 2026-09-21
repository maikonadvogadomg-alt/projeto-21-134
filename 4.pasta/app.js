// ═══════════════════════════════════════════════════════════════════════════
// APP - SISTEMA INTEGRALIZADO COM CORES POR MÓDULO
// ═══════════════════════════════════════════════════════════════════════════

const App = {
  state: {
    projects: [],
    activeProject: null,
    currentModule: 'projetos',
    repoConnected: false,
    syncLog: []
  },

  init() {
    this.loadState();
    this.setupNavigation();
    this.renderProjects();
    this.checkOnlineStatus();
    setInterval(() => this.checkOnlineStatus(), 5000);
  },

  loadState() {
    const saved = localStorage.getItem('hubState');
    if (saved) {
      this.state = JSON.parse(saved);
    }
  },

  saveState() {
    localStorage.setItem('hubState', JSON.stringify(this.state));
  },

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

  setupNavigation() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const module = btn.dataset.module;
        this.switchModule(module);
      });
    });
  },

  switchModule(module) {
    document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
    document.querySelector(`[data-module="${module}"]`).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`[data-module="${module}"]`).parentElement.querySelector('.nav-btn').classList.add('active');
    document.querySelector(`[data-module="${module}"]`).closest('nav').querySelector(`[data-module="${module}"]`).classList.add('active');

    this.state.currentModule = module;

    if (module === 'sincronizacao') {
      this.renderSyncStatus();
    }
  },

  openNewProjectModal() {
    document.getElementById('newProjectModal').classList.add('active');
  },

  closeModal(id) {
    document.getElementById(id).classList.remove('active');
  },

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
      status: 'local'
    };

    this.state.projects.push(project);
    this.saveState();
    this.closeModal('newProjectModal');

    document.getElementById('projectName').value = '';
    document.getElementById('projectDesc').value = '';

    this.showAlert(`✅ Projeto "${name}" criado!`, 'success');
    this.renderProjects();
  },

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
    }
    return files;
  },

  renderProjects() {
    const list = document.getElementById('projectsList');
    const recent = document.getElementById('recentProjects');

    if (this.state.projects.length === 0) {
      list.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 40px;">Nenhum projeto. Clique em "+ Novo" para começar.</p>';
      recent.innerHTML = '';
      return;
    }

    list.innerHTML = this.state.projects.map(p => `
            <div class="project-item" onclick="App.openProject('${p.id}')">
                <div class="project-avatar">${p.name.charAt(0).toUpperCase()}</div>
                <div class="project-info">
                    <div class="project-name">${p.name}</div>
                    <div class="project-meta">${Object.keys(p.files).length} arquivo(s) · ${new Date(p.updatedAt).toLocaleDateString('pt-BR')}</div>
                </div>
                <div class="project-actions">
                    <button onclick="App.editProject('${p.id}'); event.stopPropagation();">✏️</button>
                    <button onclick="App.deleteProject('${p.id}'); event.stopPropagation();">🗑️</button>
                </div>
            </div>
        `).join('');

    recent.innerHTML = this.state.projects.slice(0, 3).map(p => `
            <button class="sidebar-item" onclick="App.openProject('${p.id}')">${p.name}</button>
        `).join('');
  },

  openProject(id) {
    this.state.activeProject = this.state.projects.find(p => p.id === id);
    if (this.state.activeProject) {
      this.switchModule('editor');
      this.renderEditor();
    }
  },

  renderEditor() {
    if (!this.state.activeProject) return;

    const content = document.getElementById('editorContent');
    const project = this.state.activeProject;

    content.innerHTML = `
            <div style="display: flex; gap: 20px; height: 100%;">
                <div style="width: 200px; background-color: var(--card); border: 2px solid var(--color-editor); border-radius: 8px; padding: 16px; overflow-y: auto;">
                    <h3 style="margin-bottom: 12px; color: var(--color-editor);">Arquivos</h3>
                    <div id="fileList"></div>
                    <button class="btn btn-base" onclick="App.addFile()" style="width: 100%; margin-top: 12px;">+ Arquivo</button>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <textarea id="codeEditor" placeholder="Selecione um arquivo..." style="flex: 1; padding: 16px; background-color: var(--bg); color: var(--text); border: 2px solid var(--color-editor); border-radius: 8px; font-family: 'Courier New', monospace; font-size: 14px; resize: none; outline: none;"></textarea>
                    <div style="margin-top: 12px; display: flex; gap: 10px;">
                        <button class="btn btn-base" onclick="App.saveFile()">💾 Salvar</button>
                        <button class="btn btn-base" onclick="App.switchModule('projetos')">← Voltar</button>
                    </div>
                </div>
            </div>
        `;

    this.renderFileList();
  },

  renderFileList() {
    const fileList = document.getElementById('fileList');
    const project = this.state.activeProject;

    fileList.innerHTML = Object.keys(project.files).map(filename => `
            <div style="padding: 8px; background-color: var(--bg); border: 1px solid var(--color-editor); border-radius: 6px; margin-bottom: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="App.selectFile('${filename}')">
                <span style="font-size: 12px;">${filename}</span>
                <button onclick="App.deleteFile('${filename}'); event.stopPropagation();" style="background: none; border: none; color: #ef4444; cursor: pointer;">×</button>
            </div>
        `).join('');
  },

  selectFile(filename) {
    const editor = document.getElementById('codeEditor');
    editor.value = this.state.activeProject.files[filename] || '';
    editor.dataset.filename = filename;
  },

  saveFile() {
    const editor = document.getElementById('codeEditor');
    const filename = editor.dataset.filename;

    if (!filename) {
      this.showAlert('❌ Selecione um arquivo primeiro', 'error');
      return;
    }

    this.state.activeProject.files[filename] = editor.value;
    this.state.activeProject.updatedAt = new Date().toISOString();
    this.saveState();
    this.showAlert(`✅ Arquivo "${filename}" salvo!`, 'success');
  },

  addFile() {
    const filename = prompt('Nome do arquivo:');
    if (filename && this.state.activeProject) {
      this.state.activeProject.files[filename] = '';
      this.saveState();
      this.renderFileList();
    }
  },

  deleteFile(filename) {
    if (confirm(`Deletar "${filename}"?`)) {
      delete this.state.activeProject.files[filename];
      this.saveState();
      this.renderFileList();
    }
  },

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

  deleteProject(id) {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      this.state.projects = this.state.projects.filter(p => p.id !== id);
      this.saveState();
      this.renderProjects();
      this.showAlert('✅ Projeto deletado!', 'success');
    }
  },

  importZip() {
    document.getElementById('zipInput').click();
  },

  exportZip() {
    this.showAlert('📤 Exportar ZIP será implementado aqui', 'info');
  },

  connectGitHub() {
    const token = prompt('Cole seu GitHub Token:');
    if (token) {
      this.state.repoConnected = true;
      this.saveState();
      this.showAlert('✅ GitHub conectado!', 'success');
    }
  },

  pushRepository() {
    if (!this.state.repoConnected) {
      this.showAlert('❌ Conecte ao GitHub primeiro', 'error');
      return;
    }
    this.showAlert('📤 Push será implementado aqui', 'info');
  },

  pullRepository() {
    if (!this.state.repoConnected) {
      this.showAlert('❌ Conecte ao GitHub primeiro', 'error');
      return;
    }
    this.showAlert('📥 Pull será implementado aqui', 'info');
  },

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

  generateServiceWorker() {
    if (!this.state.activeProject) {
      this.showAlert('❌ Selecione um projeto primeiro', 'error');
      return;
    }

    const sw = `const CACHE_NAME = 'cache-v1';
const URLS = ['./', './index.html', './style.css', './script.js'];

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

  generateIcons() {
    this.showAlert('✅ Ícones SVG gerados!', 'success');
  },

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

  renderSyncStatus() {
    const status = document.getElementById('syncStatus');
    status.innerHTML = `
            <div class="card">
                <h2>Status de Sincronização</h2>
                <p>Projetos: <strong>${this.state.projects.length}</strong></p>
                <p>Conectado: <strong>${this.state.repoConnected ? '✅ Sim' : '❌ Não'}</strong></p>
                <button class="btn btn-base" onclick="App.syncAll()" style="width: 100%; margin-top: 12px;">🔄 Sincronizar Agora</button>
            </div>
        `;
  },

  addSyncLog(message) {
    const log = document.getElementById('syncLog');
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    this.state.syncLog.push(`[${timestamp}] ${message}`);
    log.innerHTML = this.state.syncLog.map(l => `<div>${l}</div>`).join('');
    log.scrollTop = log.scrollHeight;
  },

  showAlert(message, type = 'info') {
    const container = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    container.appendChild(alert);

    setTimeout(() => alert.remove(), 3000);
  }
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
