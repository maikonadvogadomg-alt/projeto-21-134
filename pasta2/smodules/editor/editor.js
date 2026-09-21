// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: EDITOR
// ═══════════════════════════════════════════════════════════════════════════

const EditorModule = {
  label: '✏️ Editor',

  html: `
        <nav class="main-nav" id="mainNav"></nav>
        <div style="display: flex; flex: 1; overflow: hidden;">
            <div style="flex: 1; display: flex; flex-direction: column; overflow: hidden;">
                <div style="display: flex; gap: 10px; padding: 16px; background-color: var(--card); border-bottom: 1px solid var(--border); overflow-x: auto;" id="editorTabs"></div>
                <div style="flex: 1; overflow: hidden;" id="editorContent"></div>
            </div>
        </div>
    `,

  init() {
    const nav = ModuleSystem.renderNavigation();
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
      mainNav.replaceWith(nav);
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.textContent.includes('Editor'));
    });
  },

  render() {
    if (!ModuleSystem.state.activeProject) {
      document.getElementById('editorContent').innerHTML = '<p style="padding: 20px; color: var(--muted);">Selecione um projeto primeiro</p>';
      return;
    }

    this.renderEditor();
  },

  renderEditor() {
    const project = ModuleSystem.state.activeProject;
    const tabs = document.getElementById('editorTabs');
    const content = document.getElementById('editorContent');

    if (!project.files || project.files.length === 0) {
      tabs.innerHTML = '<button class="btn btn-primary" onclick="EditorModule.addFile()">+ Novo Arquivo</button>';
      content.innerHTML = '<div style="padding: 20px; color: var(--muted);">Nenhum arquivo. Clique em "+ Novo Arquivo"</div>';
      return;
    }

    tabs.innerHTML = project.files.map((f, i) => `
            <button style="padding: 8px 12px; background: ${i === 0 ? 'var(--primary)' : 'var(--border)'}; color: white; border: none; border-radius: 6px; cursor: pointer;" onclick="EditorModule.switchTab(${i})">
                ${f.name} <span style="margin-left: 6px; cursor: pointer;" onclick="EditorModule.deleteFile(${i}); event.stopPropagation();">×</span>
            </button>
        `).join('');

    content.innerHTML = project.files.map((f, i) => `
            <textarea style="display: ${i === 0 ? 'block' : 'none'}; width: 100%; height: 100%; padding: 16px; background-color: var(--bg); color: var(--text); border: none; font-family: 'Courier New', monospace; font-size: 14px; resize: none; outline: none;" onchange="EditorModule.updateFile(${i}, this.value)" placeholder="Código...">${f.content}</textarea>
        `).join('');
  },

  switchTab(index) {
    document.querySelectorAll('#editorContent textarea').forEach((t, i) => {
      t.style.display = i === index ? 'block' : 'none';
    });

    document.querySelectorAll('#editorTabs button').forEach((b, i) => {
      b.style.background = i === index ? 'var(--primary)' : 'var(--border)';
    });
  },

  updateFile(index, content) {
    const project = ModuleSystem.state.activeProject;
    if (project && project.files[index]) {
      project.files[index].content = content;
      project.updatedAt = new Date().toISOString();
      ModuleSystem.saveState();
    }
  },

  deleteFile(index) {
    const project = ModuleSystem.state.activeProject;
    if (project && confirm('Excluir arquivo?')) {
      project.files.splice(index, 1);
      project.updatedAt = new Date().toISOString();
      ModuleSystem.saveState();
      this.renderEditor();
    }
  },

  addFile() {
    const name = prompt('Nome do arquivo:');
    if (name && ModuleSystem.state.activeProject) {
      ModuleSystem.state.activeProject.files.push({
        name: name,
        content: ''
      });
      ModuleSystem.saveState();
      this.renderEditor();
    }
  },

  destroy() {
    // Limpar
  }
};

ModuleSystem.register('editor', EditorModule);
