// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: REPOSITÓRIO
// ═══════════════════════════════════════════════════════════════════════════

const Repositorio = {
    render() {
        const module = document.getElementById('repositorioModule');
        module.innerHTML = `
            <h1>🐙 Conexão com Repositório</h1>
            <div class="grid">
                <div class="card">
                    <h2>🔗 Conectar GitHub</h2>
                    <p>Sincronize seus projetos com um repositório GitHub</p>
                    <button class="btn btn-repositorio" onclick="Repositorio.connectGitHub()" style="width: 100%;">Conectar</button>
                </div>
                <div class="card">
                    <h2>📤 Push para Repositório</h2>
                    <p>Envie suas alterações para o repositório</p>
                    <button class="btn btn-repositorio" onclick="Repositorio.pushRepository()" style="width: 100%;">Push</button>
                </div>
                <div class="card">
                    <h2>📥 Pull do Repositório</h2>
                    <p>Sincronize com as alterações remotas</p>
                    <button class="btn btn-repositorio" onclick="Repositorio.pullRepository()" style="width: 100%;">Pull</button>
                </div>
            </div>
        `;
    },

    connectGitHub() {
        const token = prompt('Cole seu GitHub Token:');
        if (token) {
            Base.state.repoConnected = true;
            Base.saveState();
            Base.showAlert('✅ GitHub conectado!', 'success');
        }
    },

    pushRepository() {
        if (!Base.state.repoConnected) {
            Base.showAlert('❌ Conecte ao GitHub primeiro', 'error');
            return;
        }
        Base.showAlert('📤 Push será implementado aqui', 'info');
    },

    pullRepository() {
        if (!Base.state.repoConnected) {
            Base.showAlert('❌ Conecte ao GitHub primeiro', 'error');
            return;
        }
        Base.showAlert('📥 Pull será implementado aqui', 'info');
    }
};
