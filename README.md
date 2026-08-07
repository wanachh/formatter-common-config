# formatter-common-config

This repository contains the standard formatting configurations for the entire company/team.
It is designed to be used as a **Git Submodule** in both `.NET` and `JavaScript/Node.js` projects.

## Contents
* `.editorconfig` - Standard rules for C# / .NET projects.
* `.prettierrc.json` - Standard rules for JavaScript, TypeScript, HTML, JSON, etc.

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
   Create a `.prettierrc.js` file at your project root that extends the configuration:
   ```javascript
   module.exports = {
     ...require('./formatter-common-config/.prettierrc.json')
   };
   ```
