// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE: HEADER
// ═══════════════════════════════════════════════════════════════════════════

const HeaderComponent = {
    html: `
        <div class="logo">
            <div class="logo-icon">&lt;/&gt;</div>
            <span>Hub Jurídico</span>
        </div>
        <nav id="mainNav">
            <button class="nav-btn active" data-page="projetos">📁 Projetos</button>
            <button class="nav-btn" data-page="editor">✏️ Editor</button>
            <button class="nav-btn" data-page="terminal">⌨️ Terminal</button>
            <button class="nav-btn" data-page="ia">🤖 IA</button>
            <button class="nav-btn" data-page="github">🐙 GitHub</button>
            <button class="nav-btn" data-page="apk">📦 APK</button>
        </nav>
        <div class="header-actions">
            <button class="btn btn-primary" onclick="AppState.openNewProjectModal()">+ Novo</button>
        </div>
    `,

    render() {
        const header = document.getElementById('header');
        header.innerHTML = this.html;
    }
};
