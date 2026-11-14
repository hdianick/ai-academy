#!/usr/bin/env node
/**
 * Crea un'anteprima web in UN SOLO file HTML (dist-preview/index.html),
 * con JavaScript, font e immagini incorporati.
 *
 * Serve per condividere l'app come pagina web navigabile (es. su un hosting statico
 * o come artifact) senza dipendere dai percorsi assoluti `/assets` e `/_expo`.
 *
 * Uso: npm run preview:build
 */
import { execSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const root = process.cwd();
const exportDir = join(root, 'dist-web');
const outDir = join(root, 'dist-preview');

const mimeTypes = {
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

rmSync(exportDir, { recursive: true, force: true });
execSync(`npx expo export --platform web --output-dir ${exportDir}`, {
  stdio: 'inherit',
  // L'anteprima statica non può contattare server esterni: resta sempre in modalità demo.
  env: {
    ...process.env,
    EXPO_NO_TELEMETRY: '1',
    EXPO_NO_DOTENV: '1',
    EXPO_PUBLIC_SUPABASE_URL: '',
    EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: '',
    EXPO_PUBLIC_SUPABASE_ANON_KEY: '',
  },
});

const html = readFileSync(join(exportDir, 'index.html'), 'utf8');

/** Sostituisce i riferimenti "/assets/..." con data URI. */
function inlineAssets(code) {
  return code.replace(/"(\/assets\/[^"]+)"/g, (match, assetPath) => {
    const mime = mimeTypes[extname(assetPath).toLowerCase()];
    if (!mime) return match;
    const data = readFileSync(join(exportDir, assetPath)).toString('base64');
    return `"data:${mime};base64,${data}"`;
  });
}

const scriptSrcs = [...html.matchAll(/<script src="([^"]+)"[^>]*><\/script>/g)].map((m) => m[1]);
if (scriptSrcs.length === 0) throw new Error('Nessuno script trovato nell’export web.');

const inlineScripts = scriptSrcs
  .map((src) => {
    const code = inlineAssets(readFileSync(join(exportDir, src), 'utf8'));
    return `<script>${code.replace(/<\/script/gi, '<\\/script')}</script>`;
  })
  .join('\n');

// L'anteprima può essere servita da un percorso qualunque: l'app parte sempre dalla Home.
const routerReset = `<script>try{history.replaceState(null,'','/')}catch(e){}</script>`;

const output = html
  .replace(/<script src="[^"]+"[^>]*><\/script>/g, '')
  .replace(/<link rel="icon"[^>]*>/, '')
  .replace('</body>', () => `${routerReset}\n${inlineScripts}\n</body>`)
  .replace('<html lang="en">', '<html lang="it">');

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'index.html'), output);
rmSync(exportDir, { recursive: true, force: true });

const sizeMb = (Buffer.byteLength(output) / 1024 / 1024).toFixed(2);
console.log(`\nAnteprima creata: dist-preview/index.html (${sizeMb} MB)`);
