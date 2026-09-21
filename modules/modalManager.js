// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: MODAL MANAGER
// ═══════════════════════════════════════════════════════════════════════════

const ModalManager = {
    openModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.add('active');
    },

    closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    },

    closeAll() {
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    }
};
