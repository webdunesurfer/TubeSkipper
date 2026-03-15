# TubeSkipper

A simple Firefox extension that automatically clicks the "Skip Ad" button on YouTube.

## Features
- **Automatic Clicking:** Detects the skip button using `MutationObserver` for zero-latency detection.
- **Robustness:** Multiple selectors used for both old and modern YouTube UIs.
- **Lightweight:** No external dependencies.

## Local Development & Testing

### 1. Manual Loading (Recommended)
1. Open Firefox and navigate to `about:debugging`.
2. Click on **"This Firefox"** in the left sidebar.
3. Click **"Load Temporary Add-on..."**.
4. Navigate to your project folder (`TubeSkipper/`) and select `manifest.json`.

The extension is now active. Open any YouTube video with an ad and watch it skip!

### 2. Automatic Loading (Developer Tooling)
If you have `web-ext` installed via npm, you can run:
```bash
npx web-ext run
```
This will open a fresh Firefox profile with the extension pre-loaded.

## Publishing to Firefox (AMO)

1. **Package your extension:**
   ```bash
   npx web-ext build
   ```
   Or manually zip all files in the root folder (except the `.git` and `web-ext-artifacts` folders).

2. **Submit for Review:**
   - Create a developer account at [AMO (Add-ons for Mozilla)](https://addons.mozilla.org/developers/).
   - Click "Submit your first add-on".
   - Upload your packaged `.zip` or `.xpi` file.
   - Fill in the metadata (name, description, etc.).
   - Submit for validation.

## License
MIT
