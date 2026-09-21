// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: NAVIGATION MANAGER
// ═══════════════════════════════════════════════════════════════════════════

const NavigationManager = {
    setupNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchPage(btn.dataset.page);
            });
        });
    },

    switchPage(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page + 'Page').classList.add('active');

        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        AppState.currentPage = page;
    }
};
