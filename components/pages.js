// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE: PÁGINAS
// ═══════════════════════════════════════════════════════════════════════════

const PagesComponent = {
    html: `
        <div id="projetosPage" class="page active">
            <div style="padding: 20px; overflow-y: auto; flex: 1;">
                <h1 style="margin-bottom: 20px;">📁 Meus Projetos</h1>
                <div class="projects-list" id="projectsList"></div>
            </div>
        </div>

        <div id="editorPage" class="page">
            <!-- Renderizado dinamicamente -->
        </div>

        <div id="terminalPage" class="page">
            <div style="padding: 20px; color: var(--muted);">
                ⌨️ Terminal será implementado aqui
            </div>
        </div>

        <div id="iaPage" class="page">
            <div style="padding: 20px; color: var(--muted);">
                🤖 IA será implementada aqui
            </div>
        </div>

        <div id="githubPage" class="page">
            <div style="padding: 20px; color: var(--muted);">
                🐙 GitHub será implementado aqui
            </div>
        </div>

        <div id="apkPage" class="page">
            <div style="padding: 20px; color: var(--muted);">
                📦 APK será implementado aqui
            </div>
        </div>
    `,

    render() {
        const main = document.getElementById('main');
        main.insertAdjacentHTML('beforeend', this.html);
    }
};
