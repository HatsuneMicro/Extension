# Hatsune Micro

[![CI](https://github.com/HatsuneMicro/Extension/actions/workflows/ci.yml/badge.svg)](https://github.com/HatsuneMicro/Extension/actions/workflows/ci.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Firefox Only](https://img.shields.io/badge/Platform-Firefox-orange.svg)](https://www.mozilla.org/firefox/)

**Hatsune Micro** is a high-performance, lightweight extension built exclusively for **Firefox**. It is designed to automatically strip tracking parameters from URLs at the network level, ensuring a cleaner, faster, and more private browsing experience.

## Key Features

- **Hybrid Cleaning Engine**:
  - **DNR (Declarative Net Request)**: Handles standard query parameters (`?utm_source=...`) at the network layer for maximum speed and zero latency.
  - **Fragment Processing**: Cleans tracking parameters even when they are hidden inside URL fragments (`#section?fbclid=...`), which standard blockers often miss.
- **Zero Overhead**: No background bloat, no logging, and no unnecessary CPU usage.
- **Privacy First**: Minimal permissions required. No data collection, no telemetry.
- **Auto-Sync**: Automatically updates its internal rules when user settings or global defaults change.

## Architecture

Hatsune Micro uses a two-tier approach to URL cleaning:
1. **Network Tier (DNR)**: Uses the browser's built-in filtering engine to remove parameters before the request even leaves your computer.
2. **Navigation Tier**: Uses `webNavigation` hooks to intercept and redirect URLs containing hash-based tracking parameters that the DNR engine cannot reach.

## Development

### Prerequisites
- Node.js (v22+ recommended)
- Firefox (Stable, Developer Edition, or Nightly)

### Setup
```bash
npm install
```

### Running Tests
We use [Vitest](https://vitest.dev/) for unit testing our core logic and rules engine.
```bash
npm test           # Run tests once
npm run test:watch # Run tests in watch mode
```

### Loading in Firefox
1. Open `about:debugging` in Firefox.
2. Click **"This Firefox"**.
3. Click **"Load Temporary Add-on..."**.
4. Select the `manifest.json` file inside the `src/` directory.

## CI/CD Pipeline

The project features a robust GitHub Actions pipeline:
- **Linting**: Automated code quality checks using `web-ext lint`.
- **Testing**: Every PR is validated against our test suite.
- **Release**: Automatic version bumping and AMO (Add-ons Mozilla Org) signing upon tagging a new release.

## Supported Trackers (Partial List)
The extension currently handles a wide range of tracking parameters, including:
- **Google**: `utm_*`, `gclid`, `dclid`
- **Facebook**: `fbclid`
- **Yandex**: `yclid`, `ymclid`, `ysclid`
- **TikTok/Twitter**: `ttclid`, `twclid`
- **HubSpot**: `_hsenc`, `_hsmi`, `hsa_`
- ...and many more (see `src/shared/rules.js` for the full list).
