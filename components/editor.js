// ═══════════════════════════════════════════════════════════════════════════
// COMPONENTE: EDITOR
// ═══════════════════════════════════════════════════════════════════════════

const EditorComponent = {
    html: `
        <div class="editor-area">
            <div class="editor-tabs" id="editorTabs"></div>
            <div class="editor-content" id="editorContent"></div>
        </div>
    `,

    render() {
        const main = document.getElementById('main');
        main.insertAdjacentHTML('beforeend', this.html);
    }
};
