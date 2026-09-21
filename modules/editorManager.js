// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: EDITOR MANAGER
// ═══════════════════════════════════════════════════════════════════════════

const EditorManager = {
    renderEditor() {
        if (!AppState.activeProject) return;

        const tabs = document.getElementById('editorTabs');
        const content = document.getElementById('editorContent');

        if (AppState.activeProject.files.length === 0) {
            tabs.innerHTML = '<button class="editor-tab active">Novo Arquivo</button>';
            content.innerHTML = '<textarea placeholder="Comece a digitar..."></textarea>';
            return;
        }

        tabs.innerHTML = AppState.activeProject.files.map((f, i) => `
            <button class="editor-tab ${i === 0 ? 'active' : ''}" onclick="EditorManager.switchTab(${i})">
                ${f.name}
                <span class="close" onclick="EditorManager.deleteFile(${i}); event.stopPropagation();">×</span>
            </button>
        `).join('');

        content.innerHTML = AppState.activeProject.files.map((f, i) => `
            <textarea class="editor-panel ${i === 0 ? 'active' : ''}" onchange="EditorManager.updateFile(${i}, this.value)" placeholder="Código...">${f.content}</textarea>
        `).join('');
    },

    switchTab(index) {
        document.querySelectorAll('.editor-tab').forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
        document.querySelectorAll('.editor-panel').forEach((p, i) => {
            p.classList.toggle('active', i === index);
        });
    },

    updateFile(index, content) {
        if (AppState.activeProject) {
            AppState.activeProject.files[index].content = content;
            AppState.activeProject.updatedAt = new Date().toISOString();
            AppState.saveProjects();
        }
    },

    deleteFile(index) {
        if (AppState.activeProject && confirm('Excluir arquivo?')) {
            AppState.activeProject.files.splice(index, 1);
            AppState.activeProject.updatedAt = new Date().toISOString();
            AppState.saveProjects();
            this.renderEditor();
        }
    },

    addFile(name, content = '') {
        if (AppState.activeProject) {
            AppState.activeProject.files.push({
                name: name,
                content: content
            });
            AppState.activeProject.updatedAt = new Date().toISOString();
            AppState.saveProjects();
            this.renderEditor();
        }
    }
};
