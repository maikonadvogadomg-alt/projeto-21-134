// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: APP STATE
// ═══════════════════════════════════════════════════════════════════════════

const AppState = {
    projects: JSON.parse(localStorage.getItem('projects')) || [],
    activeProject: null,
    currentPage: 'projetos',

    saveProjects() {
        localStorage.setItem('projects', JSON.stringify(this.projects));
    },

    openNewProjectModal() {
        ModalManager.openModal('newProjectModal');
    },

    init() {
        this.renderAll();
    },

    renderAll() {
        ProjectManager.renderProjects();
        NavigationManager.setupNavigation();
    }
};
