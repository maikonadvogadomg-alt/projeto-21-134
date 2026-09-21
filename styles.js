// ═══════════════════════════════════════════════════════════════════════════
// ESTILOS GLOBAIS
// ═══════════════════════════════════════════════════════════════════════════

const styles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :root {
        --bg: #0f172a;
        --card: #1e293b;
        --border: #334155;
        --text: #f1f5f9;
        --muted: #94a3b8;
        --primary: #3b82f6;
        --success: #22c55e;
        --danger: #ef4444;
        --warning: #f59e0b;
        --accent: #7c3aed;
    }

    body {
        background-color: var(--bg);
        color: var(--text);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        overflow-x: hidden;
    }

    .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0;
        display: flex;
        height: 100vh;
        flex-direction: column;
    }

    /* ── HEADER ── */
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        background-color: var(--card);
        border-bottom: 1px solid var(--border);
        gap: 20px;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 20px;
        font-weight: 800;
    }

    .logo-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #3b82f6, #22c55e);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
    }

    nav {
        display: flex;
        gap: 20px;
        flex: 1;
    }

    nav button {
        background: none;
        border: none;
        color: var(--muted);
        cursor: pointer;
        font-size: 14px;
        padding: 8px 16px;
        border-radius: 6px;
        transition: all 0.2s;
        font-weight: 500;
    }

    nav button:hover {
        background-color: var(--border);
        color: var(--text);
    }

    nav button.active {
        background-color: var(--primary);
        color: white;
    }

    .header-actions {
        display: flex;
        gap: 10px;
    }

    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px 16px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.2s;
    }

    .btn-primary {
        background-color: var(--primary);
        color: white;
    }

    .btn-primary:hover {
        background-color: #2563eb;
    }

    .btn-secondary {
        background-color: var(--border);
        color: var(--text);
    }

    .btn-secondary:hover {
        background-color: #475569;
    }

    .btn-success {
        background-color: var(--success);
        color: white;
    }

    .btn-success:hover {
        background-color: #16a34a;
    }

    /* ── MAIN CONTENT ── */
    main {
        flex: 1;
        display: flex;
        overflow: hidden;
    }

    /* ── SIDEBAR ── */
    .sidebar {
        width: 280px;
        background-color: var(--card);
        border-right: 1px solid var(--border);
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .sidebar-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .sidebar-title {
        font-size: 11px;
        font-weight: 700;
        color: var(--muted);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .sidebar-item {
        padding: 10px 12px;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s;
        font-size: 14px;
        color: var(--muted);
        border: none;
        background: none;
        text-align: left;
        border-left: 3px solid transparent;
    }

    .sidebar-item:hover {
        background-color: var(--border);
        color: var(--text);
    }

    .sidebar-item.active {
        background-color: var(--primary);
        color: white;
        border-left-color: var(--success);
    }

    /* ── EDITOR AREA ── */
    .editor-area {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

    .editor-tabs {
        display: flex;
        gap: 0;
        background-color: var(--card);
        border-bottom: 1px solid var(--border);
        overflow-x: auto;
        padding: 0 16px;
    }

    .editor-tab {
        padding: 12px 16px;
        border: none;
        background: none;
        color: var(--muted);
        cursor: pointer;
        font-size: 13px;
        border-bottom: 2px solid transparent;
        transition: all 0.2s;
        white-space: nowrap;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .editor-tab:hover {
        color: var(--text);
    }

    .editor-tab.active {
        color: var(--primary);
        border-bottom-color: var(--primary);
    }

    .editor-tab .close {
        margin-left: 6px;
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.2s;
    }

    .editor-tab .close:hover {
        opacity: 1;
    }

    .editor-content {
        flex: 1;
        display: flex;
        overflow: hidden;
    }

    .editor-panel {
        flex: 1;
        display: none;
        flex-direction: column;
        overflow: hidden;
    }

    .editor-panel.active {
        display: flex;
    }

    textarea {
        flex: 1;
        background-color: var(--bg);
        color: var(--text);
        border: none;
        padding: 16px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        resize: none;
        outline: none;
    }

    /* ── MODALS ── */
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    }

    .modal.active {
        display: flex;
    }

    .modal-content {
        background-color: var(--card);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 30px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--border);
    }

    .modal-header h2 {
        font-size: 20px;
    }

    .close-btn {
        background: none;
        border: none;
        color: var(--muted);
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-btn:hover {
        color: var(--text);
    }

    .form-group {
        margin-bottom: 16px;
    }

    label {
        display: block;
        margin-bottom: 6px;
        font-size: 13px;
        font-weight: 600;
        color: var(--muted);
    }

    input, textarea.form-input {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid var(--border);
        border-radius: 8px;
        background-color: var(--bg);
        color: var(--text);
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.2s;
    }

    input:focus, textarea.form-input:focus {
        outline: none;
        border-color: var(--primary);
    }

    textarea.form-input {
        resize: vertical;
        min-height: 100px;
    }

    /* ── PROJECTS LIST ── */
    .projects-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .project-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px;
        background-color: var(--bg);
        border: 1px solid var(--border);
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .project-item:hover {
        background-color: var(--card);
        border-color: var(--primary);
    }

    .project-avatar {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        background: linear-gradient(135deg, #3b82f6, #22c55e);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        font-size: 14px;
    }

    .project-info {
        flex: 1;
    }

    .project-name {
        font-size: 15px;
        font-weight: 600;
        color: var(--text);
    }

    .project-meta {
        font-size: 12px;
        color: var(--muted);
        margin-top: 2px;
    }

    .project-actions {
        display: flex;
        gap: 6px;
    }

    .project-actions button {
        background: none;
        border: none;
        color: var(--muted);
        cursor: pointer;
        padding: 4px;
        transition: color 0.2s;
    }

    .project-actions button:hover {
        color: var(--text);
    }

    .page {
        display: none;
        flex: 1;
        overflow: hidden;
        flex-direction: column;
    }

    .page.active {
        display: flex;
    }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
        .sidebar {
            display: none;
        }

        nav {
            flex-wrap: wrap;
        }
    }

    /* ── SCROLLBAR ── */
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-track {
        background: var(--bg);
    }

    ::-webkit-scrollbar-thumb {
        background: var(--border);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--muted);
    }
`;

// Injetar estilos
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
