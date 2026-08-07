import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(process.cwd());
const candidateSources = [
  resolve(projectRoot, 'config', 'biome.shared.json'),
  resolve(projectRoot, 'formatter-common-config', 'biome.shared.json'),
  resolve(projectRoot, 'config', 'biome.json'),
  resolve(projectRoot, 'formatter-common-config', 'biome.json'),
];
const vscodeDir = resolve(projectRoot, '.vscode');
const biomeConfigTarget = resolve(projectRoot, 'biome.json');
const biomeConfigSource = candidateSources.find((path) => existsSync(path));

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

if (!biomeConfigSource) {
  throw new Error('Could not find a shared Biome config in config/ or formatter-common-config/.');
}

await mkdir(vscodeDir, {
  recursive: true,
});
await writeFile(resolve(vscodeDir, 'settings.json'), `${JSON.stringify(settings, null, 2)}\n`);
await writeFile(resolve(vscodeDir, 'extensions.json'), `${JSON.stringify(extensions, null, 2)}\n`);
await writeFile(biomeConfigTarget, await readFile(biomeConfigSource));

console.log('✅ VS Code workspace settings created for Biome');
