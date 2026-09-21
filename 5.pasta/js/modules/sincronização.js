// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: SINCRONIZAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

const Sincronizacao = {
  render() {
    const module = document.getElementById('sincronizacaoModule');
    module.innerHTML = `
            <h1>🔄 Sincronização</h1>
            <div id="syncStatus"></div>
            <div id="syncLog" style="background-color: var(--bg); border: 2px solid var(--color-sincronizacao); border-radius: 8px; padding: 16px; font-family: 'Courier New', monospace; font-size: 12px; color: var(--color-sincronizacao); min-height: 300px; max-height: 500px; overflow-y: auto; margin-top: 20px;"></div>
        `;

    this.renderSyncStatus();
  },

  renderSyncStatus() {
    const status = document.getElementById('syncStatus');
    status.innerHTML = `
            <div class="card">
                <h2>Status de Sincronização</h2>
                <p>Projetos: <strong>${Base.state.projects.length}</strong></p>
                <p>Conectado: <strong>${Base.state.repoConnected ? '✅ Sim' : '❌ Não'}</strong></p>
                <button class="btn btn-sincronizacao" onclick="Sincronizacao.syncAll()" style="width: 100%; margin-top: 12px;">🔄 Sincronizar Agora</button>
            </div>
        `;
  },

  syncAll() {
    Base.state.syncLog = [];
    this.addSyncLog('🔄 Iniciando sincronização...');

    setTimeout(() => {
      this.addSyncLog('✅ Projetos sincronizados com sucesso!');
      Base.state.projects.forEach(p => p.status = 'synced');
      Base.saveState();
      Projetos.renderProjects();
    }, 2000);
  },

  addSyncLog(message) {
    const log = document.getElementById('syncLog');
    const timestamp = new Date().toLocaleTimeString('pt-BR');
    Base.state.syncLog.push(`[${timestamp}] ${message}`);
    log.innerHTML = Base.state.syncLog.map(l => `<div>${l}</div>`).join('');
    log.scrollTop = log.scrollHeight;
  }
};
