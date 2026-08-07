# formatter-common-config

This repository contains the standard formatting configurations for the entire company/team.
It is designed to be used as a **Git Submodule** in both `.NET` and `JavaScript/Node.js` projects.

## Contents
* `.editorconfig` - Standard rules for C# / .NET projects.
* `biome.json` - Standard rules for JavaScript, TypeScript, HTML, JSON, etc.
* `setup.mjs` - Creates VS Code workspace settings for Biome in the consuming repo.

## How to use

1. Add this repo as a submodule to your project:
   ```bash
   git submodule add https://github.com/wanachh/formatter-common-config.git
   ```

2. **For C# (.NET) Projects:**
   Create a symbolic link (or copy) the `.editorconfig` to your project root so the IDE can read it.
   ```bash
   ln -s ./formatter-common-config/.editorconfig .editorconfig
   ```

3. **For JavaScript Projects:**
   Use the shared `biome.json` from this submodule and run the shared setup script from the consuming repo root:
   ```bash
   node ./formatter-common-config/setup.mjs
   ```

   This creates `.vscode/settings.json`, `.vscode/extensions.json`, and copies `biome.json` to the consuming repo root so save-time formatting follows Biome.
