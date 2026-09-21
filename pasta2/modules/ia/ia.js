// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: IA
// ═══════════════════════════════════════════════════════════════════════════

const IAModule = {
    label: '🤖 IA',
    
    html: `
        <nav class="main-nav" id="mainNav"></nav>
        <div class="module-content">
            <h1>🤖 Assistente IA</h1>
            <div style="background-color: var(--bg); border: 1px solid var(--border); border-radius: 8px; padding: 16px; min-height: 400px; max-height: 600px; overflow-y: auto; margin-bottom: 16px;" id="iaChat">
                <div style="color: var(--muted); text-align: center; padding: 40px;">Comece uma conversa...</div>
            </div>
            <div style="display: flex; gap: 10px;">
                <input type="text" id="iaInput" placeholder="Faça uma pergunta..." style="flex: 1;">
                <button class="btn btn-primary" onclick="IAModule.sendMessage()">Enviar</button>
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
            btn.classList.toggle('active', btn.textContent.includes('IA'));
        });

        document.getElementById('iaInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    },

    render() {
        // Renderizado no init
    },

    sendMessage() {
        const input = document.getElementById('iaInput');
        const chat = document.getElementById('iaChat');
        const message = input.value;

        if (!message) return;

        chat.innerHTML += `<div style="margin-bottom: 12px; padding: 12px; background-color: var(--primary); border-radius: 8px; color: white;">Você: ${message}</div>`;
        chat.innerHTML += `<div style="margin-bottom: 12px; padding: 12px; background-color: var(--card); border-radius: 8px; color: var(--muted);">IA: Resposta será implementada aqui...</div>`;
        
        input.value = '';
        chat.scrollTop = chat.scrollHeight;
    },

    destroy() {
        // Limpar
    }
};

ModuleSystem.register('ia', IAModule);
