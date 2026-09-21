// ═══════════════════════════════════════════════════════════════════════════
// MÓDULO: DETECÇÃO E CONVERSÃO DE ENCODING
// ═══════════════════════════════════════════════════════════════════════════

const EncodingHandler = {
  // ── DETECTAR ENCODING ──
  detectEncoding(buffer) {
    if (typeof jschardet !== 'undefined') {
      const detected = jschardet.detect(buffer);
      return detected.encoding || 'UTF-8';
    }
    return 'UTF-8'; // fallback
  },

  // ── CONVERTER PARA UTF-8 ──
  convertToUTF8(buffer, fromEncoding = null) {
    // Se não souber o encoding, detecta
    const encoding = fromEncoding || this.detectEncoding(buffer);

    try {
      if (typeof iconv !== 'undefined') {
        return iconv.decode(buffer, encoding);
      }
    } catch (e) {
      console.warn(`Erro ao converter de ${encoding}:`, e);
    }

    // Fallback: tentar como UTF-8
    return new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  },

  // ── CONVERTER DE UTF-8 PARA OUTRO ENCODING ──
  convertFromUTF8(text, toEncoding = 'UTF-8') {
    try {
      if (typeof iconv !== 'undefined') {
        return iconv.encode(text, toEncoding);
      }
    } catch (e) {
      console.warn(`Erro ao converter para ${toEncoding}:`, e);
    }

    // Fallback: retornar como UTF-8
    return new TextEncoder().encode(text);
  },

  // ── NORMALIZAR ARQUIVO ──
  normalizeFile(content) {
    // Remove BOM se existir
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }

    // Normaliza quebras de linha
    content = content.replace(/\r\n/g, '\n');

    return content;
  },

  // ── DETECTAR TIPO DE ARQUIVO ──
  detectFileType(filename) {
    const ext = filename.split('.').pop().toLowerCase();

    const types = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'html': 'html',
      'htm': 'html',
      'css': 'css',
      'scss': 'scss',
      'less': 'less',
      'json': 'json',
      'xml': 'xml',
      'md': 'markdown',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'sql': 'sql',
      'sh': 'shell',
      'yml': 'yaml',
      'yaml': 'yaml',
      'toml': 'toml',
      'ini': 'ini',
      'conf': 'conf',
      'txt': 'text'
    };

    return types[ext] || 'text';
  },

  // ── VALIDAR ARQUIVO ──
  isValidFile(filename) {
    // Extensões bloqueadas
    const blocked = ['exe', 'dll', 'so', 'dylib', 'bin', 'iso'];
    const ext = filename.split('.').pop().toLowerCase();

    return !blocked.includes(ext);
  },

  // ── SANITIZAR NOME DE ARQUIVO ──
  sanitizeFilename(filename) {
    // Remove caracteres perigosos
    return filename
      .replace(/[<>:"|?*]/g, '')
      .replace(/\s+/g, '_')
      .trim();
  }
};
