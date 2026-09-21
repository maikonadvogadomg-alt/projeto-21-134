// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: PROJETOS
// ═══════════════════════════════════════════════════════════════════════════

const Projetos = {
  render() {
    const module = document.getElementById('projetosModule');
    module.innerHTML = `
            <h1>📁 Meus Projetos</h1>
            <div id="alertContainer"></div>
            <div class="projects-list" id="projectsList"></div>
            <div id="newProjectModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Novo Projeto</h2>
                        <button class="close-btn" onclick="Base.closeModal('newProjectModal')">×</button>
                    </div>
                    <form onsubmit="Projetos.createProject(event)">
                        <div class="form-group">
                            <label>Nome do Projeto</label>
                            <input type="text" id="projectName" placeholder="Meu Projeto" required>
                        </div>
                        <div class="form-group">
                            <label>Descrição</label>
                            <textarea id="projectDesc" placeholder="Descrição..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Tipo</label>
                            <select id="projectType">
                                <option value="html">HTML/CSS/JS</option>
                                <option value="react">React</option>
                                <option value="vue">Vue</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-projetos" style="width: 100%;">Criar Projeto</button>
                    </form>
                </div>
            </div>
        `;

    this.renderProjects();
  },

  renderProjects() {
    const list = document.getElementById('projectsList');
    const recent = document.getElementById('recentProjects');

    if (Base.state.projects.length === 0) {
      list.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 40px;">Nenhum projeto. Clique em "+ Novo" para começar.</p>';
      recent.innerHTML = '';
      return;
    }

    list.innerHTML = Base.state.projects.map(p => `
            <div class="project-item" onclick="Editor.openProject('${p.id}')">
                <div class="project-avatar">${p.name.charAt(0).toUpperCase()}</div>
                <div class="project-info">
                    <div class="project-name">${p.name}</div>
                    <div class="project-meta">${Object.keys(p.files || {}).length} arquivo(s) · ${new Date(p.updatedAt).toLocaleDateString('pt-BR')}</div>
                </div>
                <div class="project-actions">
                    <button onclick="Projetos.editProject('${p.id}'); event.stopPropagation();">✏️</button>
                    <button onclick="Projetos.deleteProject('${p.id}'); event.stopPropagation();">🗑️</button>
                </div>
            </div>
        `).join('');

    recent.innerHTML = Base.state.projects.slice(0, 3).map(p => `
            <button class="sidebar-item" onclick="Editor.openProject('${p.id}')">${p.name}</button>
        `).join('');
  },

  openNewProjectModal() {
    Base.openModal('newProjectModal');
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

    Base.state.projects.push(project);
    Base.saveState();
    Base.closeModal('newProjectModal');

    document.getElementById('projectName').value = '';
    document.getElementById('projectDesc').value = '';

    Base.showAlert(`✅ Projeto "${name}" criado!`, 'success');
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

  editProject(id) {
    const project = Base.state.projects.find(p => p.id === id);
    if (project) {
      const newName = prompt('Novo nome:', project.name);
      if (newName) {
        project.name = newName;
        project.updatedAt = new Date().toISOString();
        Base.saveState();
        this.renderProjects();
      }
    }
  },

  deleteProject(id) {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      Base.state.projects = Base.state.projects.filter(p => p.id !== id);
      Base.saveState();
      this.renderProjects();
      Base.showAlert('✅ Projeto deletado!', 'success');
    }
  },

  importZip() {
    Base.showAlert('📥 Importar ZIP será implementado aqui', 'info');
  },

  exportZip() {
    Base.showAlert('📤 Exportar ZIP será implementado aqui', 'info');
  }
};
