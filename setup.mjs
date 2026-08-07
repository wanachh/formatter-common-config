import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const thisFile = fileURLToPath(import.meta.url);
const projectRoot = resolve(process.cwd());
const candidateSources = [
  resolve(projectRoot, 'config', 'biome.shared.json'),
  resolve(projectRoot, 'formatter-common-config', 'biome.shared.json'),
  resolve(projectRoot, 'config', 'biome.json'),
  resolve(projectRoot, 'formatter-common-config', 'biome.json'),
];
const vscodeDir = resolve(projectRoot, '.vscode');
const scriptsDir = resolve(projectRoot, 'scripts');
const biomeConfigTarget = resolve(projectRoot, 'biome.json');
const biomeConfigSource = candidateSources.find((path) => existsSync(path));
const watcherTemplate = resolve(dirname(thisFile), 'watch-format.template.mjs');
const watcherTarget = resolve(scriptsDir, 'watch-format.mjs');

const settings = {
  'emeraldwalk.runonsave': {
    commands: [
      {
        match: '.*',
        isAsync: false,
        cmd: 'npx biome format --write ${file}',
      },
    ],
  },
};

const extensions = {
  recommendations: [
    'emeraldwalk.runonsave',
  ],
};

if (!biomeConfigSource) {
  throw new Error('Could not find a shared Biome config in config/ or formatter-common-config/.');
}

await mkdir(vscodeDir, {
  recursive: true,
});
await mkdir(scriptsDir, {
  recursive: true,
});
await writeFile(resolve(vscodeDir, 'settings.json'), `${JSON.stringify(settings, null, 2)}\n`);
await writeFile(resolve(vscodeDir, 'extensions.json'), `${JSON.stringify(extensions, null, 2)}\n`);
await writeFile(biomeConfigTarget, await readFile(biomeConfigSource));

if (existsSync(watcherTemplate)) {
  await writeFile(watcherTarget, await readFile(watcherTemplate));
  console.log('✅ scripts/watch-format.mjs created (optional alternative: "npm run watch", zero VS Code extensions)');
}

console.log('✅ VS Code workspace configured: install "emeraldwalk.runonsave" once, then Biome formats every file automatically on save');
