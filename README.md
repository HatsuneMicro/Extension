# Hatsune Micro

**Hatsune Micro** is a lightweight extension built exclusively for **Firefox**, designed to strip tracking parameters and speed up web browsing by removing unnecessary bloat.

> [!IMPORTANT]
> This extension is developed exclusively for Firefox and is deeply optimized for the Gecko engine.

## Key Features
- **DNR (Declarative Net Request)**: Network-level parameter cleaning for maximum speed.
- **Hash Cleaning**: Removal of tracking parameters even within URL fragments (`#`).
- **Zero Logging & Stats**: Zero-overhead design with no unnecessary CPU or disk usage.
- **Privacy Focused**: Requires only the minimum necessary permissions.

## Installation (Dev)
1. Clone the repository.
2. Open `about:debugging` in Firefox.
3. Click "This Firefox" -> "Load Temporary Add-on...".
4. Select the `manifest.json` file inside the `src/` directory.
