// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: TERMINAL
// ═══════════════════════════════════════════════════════════════════════════

const TerminalModule = {
    label: '⌨️ Terminal',
    
    html: `
        <nav class="main-nav" id="mainNav"></nav>
        <div class="module-content">
            <h1>⌨️ Terminal</h1>
            <div style="background-color: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 16px; font-family: 'Courier New', monospace; font-size: 14px; color: #22c55e; min-height: 400px; max-height: 600px; overflow-y: auto;" id="terminalOutput">
                <div>$ Terminal pronto...</div>
            </div>
            <div style="margin-top: 16px; display: flex; gap: 10px;">
                <input type="text" id="terminalInput" placeholder="Digite um comando..." style="flex: 1;">
                <button class="btn btn-primary" onclick="TerminalModule.executeCommand()">Executar</button>
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
            btn.classList.toggle('active', btn.textContent.includes('Terminal'));
        });

        document.getElementById('terminalInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand();
            }
        });
    },

    render() {
        // Renderizado no init
    },

    executeCommand() {
        const input = document.getElementById('terminalInput');
        const output = document.getElementById('terminalOutput');
        const command = input.value;

        if (!command) return;

        output.innerHTML += `<div>$ ${command}</div>`;
        output.innerHTML += `<div style="color: #f59e0b;">Comando será implementado aqui</div>`;
        
        input.value = '';
        output.scrollTop = output.scrollHeight;
    },

    destroy() {
        // Limpar
    }
};

ModuleSystem.register('terminal', TerminalModule);
