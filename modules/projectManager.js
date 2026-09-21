// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: PROJECT MANAGER
// ═══════════════════════════════════════════════════════════════════════════

const ProjectManager = {
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

        AppState.projects.push(project);
        AppState.saveProjects();
        ModalManager.closeModal('newProjectModal');

        document.getElementById('projectName').value = '';
        document.getElementById('projectDesc').value = '';

        alert(`✅ Projeto "${name}" criado!`);
        this.renderProjects();
    },

    renderProjects() {
        const list = document.getElementById('projectsList');
        const recent = document.getElementById('recentProjects');

        if (AppState.projects.length === 0) {
            list.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 40px;">Nenhum projeto. Clique em "+ Novo" para começar.</p>';
            recent.innerHTML = '';
            return;
        }

        list.innerHTML = AppState.projects.map(p => `
            <div class="project-item" onclick="ProjectManager.openProject('${p.id}')">
                <div class="project-avatar">${p.name.charAt(0).toUpperCase()}</div>
                <div class="project-info">
                    <div class="project-name">${p.name}</div>
                    <div class="project-meta">${p.files.length} arquivo(s) · ${new Date(p.updatedAt).toLocaleDateString('pt-BR')}</div>
                </div>
                <div class="project-actions">
                    <button onclick="ProjectManager.editProject('${p.id}'); event.stopPropagation();">✏️</button>
                    <button onclick="ProjectManager.deleteProject('${p.id}'); event.stopPropagation();">🗑️</button>
                </div>
            </div>
        `).join('');

        recent.innerHTML = AppState.projects.slice(0, 3).map(p => `
            <button class="sidebar-item" onclick="ProjectManager.openProject('${p.id}')">${p.name}</button>
        `).join('');
    },

    openProject(id) {
        AppState.activeProject = AppState.projects.find(p => p.id === id);
        if (AppState.activeProject) {
            AppState.currentPage = 'editor';
            NavigationManager.switchPage('editor');
            EditorManager.renderEditor();
        }
    },

    editProject(id) {
        const project = AppState.projects.find(p => p.id === id);
        if (project) {
            const newName = prompt('Novo nome:', project.name);
            if (newName) {
                project.name = newName;
                project.updatedAt = new Date().toISOString();
                AppState.saveProjects();
                this.renderProjects();
            }
        }
    },

    deleteProject(id) {
        if (confirm('Tem certeza que deseja excluir este projeto?')) {
            AppState.projects = AppState.projects.filter(p => p.id !== id);
            AppState.saveProjects();
            this.renderProjects();
        }
    }
};
