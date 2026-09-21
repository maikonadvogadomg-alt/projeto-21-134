// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: PROJETOS
// ═══════════════════════════════════════════════════════════════════════════

const ProjetosModule = {
  label: '📁 Projetos',

  html: `
        <nav class="main-nav" id="mainNav"></nav>
        <div class="module-content">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h1>📁 Meus Projetos</h1>
                <button class="btn btn-primary" onclick="ProjetosModule.openNewProjectModal()">+ Novo</button>
            </div>
            <div class="list" id="projectsList"></div>
        </div>

        <div id="newProjectModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Novo Projeto</h2>
                    <button class="close-btn" onclick="ProjetosModule.closeModal()">×</button>
                </div>
                <form onsubmit="ProjetosModule.createProject(event)">
                    <div class="form-group">
                        <label>Nome do Projeto</label>
                        <input type="text" id="projectName" placeholder="Meu Projeto" required>
                    </div>
                    <div class="form-group">
                        <label>Descrição (opcional)</label>
                        <textarea id="projectDesc" placeholder="Descrição..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Criar Projeto</button>
                </form>
            </div>
        </div>
    `,

  init() {
    // Renderizar navegação
    const nav = ModuleSystem.renderNavigation();
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
      mainNav.replaceWith(nav);
    }

    // Marcar botão ativo
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.includes('Projetos'));
    });
  },

  render() {
    this.renderProjects();
  },

  renderProjects() {
    const list = document.getElementById('projectsList');
    const projects = ModuleSystem.state.projects;

    if (projects.length === 0) {
      list.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 40px;">Nenhum projeto. Clique em "+ Novo" para começar.</p>';
      return;
    }

    list.innerHTML = projects.map(p => `
            <div class="list-item" onclick="ProjetosModule.openProject('${p.id}')">
                <div class="list-item-avatar">${p.name.charAt(0).toUpperCase()}</div>
                <div class="list-item-info">
                    <div class="list-item-title">${p.name}</div>
                    <div class="list-item-meta">${p.files?.length || 0} arquivo(s) · ${new Date(p.updatedAt).toLocaleDateString('pt-BR')}</div>
                </div>
                <div class="list-item-actions">
                    <button onclick="ProjetosModule.editProject('${p.id}'); event.stopPropagation();">✏️</button>
                    <button onclick="ProjetosModule.deleteProject('${p.id}'); event.stopPropagation();">🗑️</button>
                </div>
            </div>
        `).join('');
  },

  openNewProjectModal() {
    document.getElementById('newProjectModal').classList.add('active');
  },

  closeModal() {
    document.getElementById('newProjectModal').classList.remove('active');
  },

  createProject(e) {
    e.preventDefault();

    const name = document.getElementById('projectName').value;
    const desc = document.getElementById('projectDesc').value;

    const project = {
      id: Date.now().toString(),
      name: name,
      desc: desc,
      files: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    ModuleSystem.state.projects.push(project);
    ModuleSystem.saveState();
    this.closeModal();

    document.getElementById('projectName').value = '';
    document.getElementById('projectDesc').value = '';

    alert(`✅ Projeto "${name}" criado!`);
    this.renderProjects();
  },

  openProject(id) {
    ModuleSystem.state.activeProject = ModuleSystem.state.projects.find(p => p.id === id);
    if (ModuleSystem.state.activeProject) {
      ModuleSystem.activate('editor');
    }
  },

  editProject(id) {
    const project = ModuleSystem.state.projects.find(p => p.id === id);
    if (project) {
      const newName = prompt('Novo nome:', project.name);
      if (newName) {
        project.name = newName;
        project.updatedAt = new Date().toISOString();
        ModuleSystem.saveState();
        this.renderProjects();
      }
    }
  },

  deleteProject(id) {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      ModuleSystem.state.projects = ModuleSystem.state.projects.filter(p => p.id !== id);
      ModuleSystem.saveState();
      this.renderProjects();
    }
  },

  destroy() {
    // Limpar listeners se necessário
  }
};

ModuleSystem.register('projetos', ProjetosModule);
