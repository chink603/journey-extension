# Private / Internal Distribution

## Package a VSIX (no public publishing)
1. Install deps
   ```bash
   npm install
   npm i -g @vscode/vsce
   ```
2. Package
   ```bash
   npm run pack
   # -> creates journey-extension-0.0.1.vsix
   ```

## Install for yourself
- VS Code: Command Palette → "Extensions: Install from VSIX..." → select the .vsix

or CLI:
```bash
code --install-extension journey-extension-0.0.1.vsix --force
```

## Update
- Bump version in package.json
- `npm run pack`
- Reinstall the new .vsix (users overwrite existing).

