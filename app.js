// ═══════════════════════════════════════════════════════════════════════════
// INICIALIZAÇÃO DO APP
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    // Renderizar componentes
    HeaderComponent.render();
    SidebarComponent.render();
    PagesComponent.render();
    EditorComponent.render();
    ModalsComponent.render();

    // Inicializar app
    AppState.init();
});
