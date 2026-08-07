import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
const configRoot = resolve(projectRoot, 'config');
const vscodeDir = resolve(projectRoot, '.vscode');
const biomeConfigSource = resolve(configRoot, 'biome.shared.json');
const biomeConfigTarget = resolve(projectRoot, 'biome.json');

const settings = {
  'editor.formatOnSave': true,
  'editor.defaultFormatter': 'biomejs.biome',
  '[json]': {
    'editor.defaultFormatter': 'biomejs.biome',
  },
  '[jsonc]': {
    'editor.defaultFormatter': 'biomejs.biome',
  },
};

const extensions = {
  recommendations: [
    'biomejs.biome',
  ],
};

await mkdir(vscodeDir, {
  recursive: true,
});
await writeFile(resolve(vscodeDir, 'settings.json'), `${JSON.stringify(settings, null, 2)}\n`);
await writeFile(resolve(vscodeDir, 'extensions.json'), `${JSON.stringify(extensions, null, 2)}\n`);
await writeFile(biomeConfigTarget, await readFile(biomeConfigSource));

console.log('✅ VS Code workspace settings created for Biome');
