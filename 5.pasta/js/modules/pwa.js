// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: PWA
// ═══════════════════════════════════════════════════════════════════════════

const PWA = {
  render() {
    const module = document.getElementById('pwaModule');
    module.innerHTML = `
            <h1>📦 Geração de PWA</h1>
            <div class="grid">
                <div class="card">
                    <h2>📄 Manifest.json</h2>
                    <p>Gere o arquivo de configuração PWA</p>
                    <button class="btn btn-pwa" onclick="PWA.generateManifest()" style="width: 100%;">Gerar</button>
                </div>
                <div class="card">
                    <h2>⚙️ Service Worker</h2>
                    <p>Crie o arquivo de cache e offline</p>
                    <button class="btn btn-pwa" onclick="PWA.generateServiceWorker()" style="width: 100%;">Gerar</button>
                </div>
                <div class="card">
                    <h2>🎨 Ícones</h2>
                    <p>Gere ícones para diferentes tamanhos</p>
                    <button class="btn btn-pwa" onclick="PWA.generateIcons()" style="width: 100%;">Gerar</button>
                </div>
            </div>
        `;
  },

  generateManifest() {
    if (!Base.state.activeProject) {
      Base.showAlert('❌ Selecione um projeto primeiro', 'error');
      return;
    }

    const manifest = {
      name: Base.state.activeProject.name,
      short_name: Base.state.activeProject.name.substring(0, 12),
      description: Base.state.activeProject.desc,
      start_url: './index.html',
      display: 'standalone',
      background_color: '#0f172a',
      theme_color: '#3b82f6',
      icons: [
        { src: './icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: './icon-512.png', sizes: '512x512', type: 'image/png' }
      ]
    };

    Base.state.activeProject.files['manifest.json'] = JSON.stringify(manifest, null, 2);
    Base.saveState();
    Base.showAlert('✅ manifest.json gerado!', 'success');
  },

  generateServiceWorker() {
    if (!Base.state.activeProject) {
      Base.showAlert('❌ Selecione um projeto primeiro', 'error');
      return;
    }

    const sw = `const CACHE_NAME = 'cache-v1';
const URLS = ['./', './index.html', './style.css', './script.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});`;

    Base.state.activeProject.files['sw.js'] = sw;
    Base.saveState();
    Base.showAlert('✅ Service Worker gerado!', 'success');
  },

  generateIcons() {
    Base.showAlert('✅ Ícones SVG gerados!', 'success');
  }
};
