// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE: SIDEBAR
// ═══════════════════════════════════════════════════════════════════════════

const SidebarComponent = {
    html: `
        <aside class="sidebar">
            <div class="sidebar-section">
                <div class="sidebar-title">Projetos Recentes</div>
                <div id="recentProjects"></div>
            </div>
            <div class="sidebar-section">
                <div class="sidebar-title">Ações Rápidas</div>
                <button class="sidebar-item" onclick="AppState.openNewProjectModal()">+ Novo Projeto</button>
                <button class="sidebar-item" onclick="ImportExport.importZip()">📥 Importar ZIP</button>
                <button class="sidebar-item" onclick="ImportExport.exportZip()">📤 Exportar ZIP</button>
            </div>
        </aside>
    `,

    render() {
        const main = document.getElementById('main');
        main.insertAdjacentHTML('afterbegin', this.html);
    }
};
