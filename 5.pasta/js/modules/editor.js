// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: EDITOR
// ═══════════════════════════════════════════════════════════════════════════

const Editor = {
  render() {
    const module = document.getElementById('editorModule');
    module.innerHTML = `
            <h1>✏️ Editor de Código</h1>
            <div id="editorContent"></div>
        `;
  },

  openProject(id) {
    Base.state.activeProject = Base.state.projects.find(p => p.id === id);
    if (Base.state.activeProject) {
      Base.switchModule('editor');
      this.renderEditor();
    }
  },

  renderEditor() {
    if (!Base.state.activeProject) return;

    const content = document.getElementById('editorContent');
    const project = Base.state.activeProject;

    content.innerHTML = `
            <div style="display: flex; gap: 20px; height: calc(100% - 40px);">
                <div style="width: 200px; background-color: var(--card); border: 2px solid var(--color-editor); border-radius: 8px; padding: 16px; overflow-y: auto;">
                    <h3 style="margin-bottom: 12px; color: var(--color-editor);">Arquivos</h3>
                    <div id="fileList"></div>
                    <button class="btn btn-editor" onclick="Editor.addFile()" style="width: 100%; margin-top: 12px;">+ Arquivo</button>
                </div>
                <div style="flex: 1; display: flex; flex-direction: column;">
                    <textarea id="codeEditor" placeholder="Selecione um arquivo..." style="flex: 1; padding: 16px; background-color: var(--bg); color: var(--text); border: 2px solid var(--color-editor); border-radius: 8px; font-family: 'Courier New', monospace; font-size: 14px; resize: none; outline: none;"></textarea>
                    <div style="margin-top: 12px; display: flex; gap: 10px;">
                        <button class="btn btn-editor" onclick="Editor.saveFile()">💾 Salvar</button>
                        <button class="btn btn-base" onclick="Base.switchModule('projetos')">← Voltar</button>
                    </div>
                </div>
            </div>
        `;

    this.renderFileList();
  },

  renderFileList() {
    const fileList = document.getElementById('fileList');
    const project = Base.state.activeProject;

    fileList.innerHTML = Object.keys(project.files || {}).map(filename => `
            <div style="padding: 8px; background-color: var(--bg); border: 1px solid var(--color-editor); border-radius: 6px; margin-bottom: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="Editor.selectFile('${filename}')">
                <span style="font-size: 12px;">${filename}</span>
                <button onclick="Editor.deleteFile('${filename}'); event.stopPropagation();" style="background: none; border: none; color: #ef4444; cursor: pointer;">×</button>
            </div>
        `).join('');
  },

  selectFile(filename) {
    const editor = document.getElementById('codeEditor');
    editor.value = Base.state.activeProject.files[filename] || '';
    editor.dataset.filename = filename;
  },

  saveFile() {
    const editor = document.getElementById('codeEditor');
    const filename = editor.dataset.filename;

    if (!filename) {
      Base.showAlert('❌ Selecione um arquivo primeiro', 'error');
      return;
    }

    Base.state.activeProject.files[filename] = editor.value;
    Base.state.activeProject.updatedAt = new Date().toISOString();
    Base.saveState();
    Base.showAlert(`✅ Arquivo "${filename}" salvo!`, 'success');
  },

  addFile() {
    const filename = prompt('Nome do arquivo:');
    if (filename && Base.state.activeProject) {
      Base.state.activeProject.files[filename] = '';
      Base.saveState();
      this.renderFileList();
    }
  },

  deleteFile(filename) {
    if (confirm(`Deletar "${filename}"?`)) {
      delete Base.state.activeProject.files[filename];
      Base.saveState();
      this.renderFileList();
    }
  }
};
