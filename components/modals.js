// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE: MODAIS
// ═══════════════════════════════════════════════════════════════════════════

const ModalsComponent = {
    html: `
        <div id="newProjectModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Novo Projeto</h2>
                    <button class="close-btn" onclick="ModalManager.closeModal('newProjectModal')">×</button>
                </div>
                <form onsubmit="ProjectManager.createProject(event)">
                    <div class="form-group">
                        <label>Nome do Projeto</label>
                        <input type="text" id="projectName" placeholder="Meu Projeto" required>
                    </div>
                    <div class="form-group">
                        <label>Descrição (opcional)</label>
                        <textarea class="form-input" id="projectDesc" placeholder="Descrição..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Criar Projeto</button>
                </form>
            </div>
        </div>
    `,

    render() {
        const container = document.getElementById('modalsContainer');
        container.insertAdjacentHTML('beforeend', this.html);
    }
};
