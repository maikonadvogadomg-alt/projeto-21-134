// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: IMPORT/EXPORT
// ═══════════════════════════════════════════════════════════════════════════

const ImportExport = {
    importZip() {
        if (!AppState.activeProject) {
            alert('❌ Selecione um projeto primeiro');
            return;
        }
        alert('📥 Importar ZIP será implementado aqui');
    },

    exportZip() {
        if (!AppState.activeProject) {
            alert('❌ Selecione um projeto primeiro');
            return;
        }
        alert(`📤 Exportar "${AppState.activeProject.name}" será implementado aqui`);
    },

    exportJSON() {
        if (!AppState.activeProject) {
            alert('❌ Selecione um projeto primeiro');
            return;
        }

        const json = JSON.stringify(AppState.activeProject, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${AppState.activeProject.name}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
};
