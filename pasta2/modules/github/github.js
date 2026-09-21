// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: GITHUB
// ═══════════════════════════════════════════════════════════════════════════

const GitHubModule = {
    label: '🐙 GitHub',
    
    html: `
        <nav class="main-nav" id="mainNav"></nav>
        <div class="module-content">
            <h1>🐙 GitHub</h1>
            <div class="grid">
                <div class="card">
                    <h3>Conectar Repositório</h3>
                    <p>Sincronize seu projeto com um repositório GitHub</p>
                    <button class="btn btn-primary" onclick="GitHubModule.connectRepo()" style="width: 100%; margin-top: 12px;">Conectar</button>
                </div>
                <div class="card">
                    <h3>Push para GitHub</h3>
                    <p>Envie suas alterações para o repositório</p>
                    <button class="btn btn-success" onclick="GitHubModule.pushRepo()" style="width: 100%; margin-top: 12px;">Push</button>
                </div>
                <div class="card">
                    <h3>Pull do GitHub</h3>
                    <p>Baixe as alterações do repositório</p>
                    <button class="btn btn-primary" onclick="GitHubModule.pullRepo()" style="width: 100%; margin-top: 12px;">Pull</button>
                </div>
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
            btn.classList.toggle('active', btn.textContent.includes('GitHub'));
        });
    },

    render() {
        // Renderizado no init
    },

    connectRepo() {
        alert('🐙 Conectar ao GitHub será implementado aqui');
    },

    pushRepo() {
        alert('📤 Push será implementado aqui');
    },

    pullRepo() {
        alert('📥 Pull será implementado aqui');
    },

    destroy() {
        // Limpar
    }
};

ModuleSystem.register('github', GitHubModule);
