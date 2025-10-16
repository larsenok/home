# 1. Create project files directly in the current folder
npm create vite@latest . -- --template react-ts --yes

# 2. Install Tailwind and its dependencies
npm install -D tailwindcss@3.4.14 postcss autoprefixer

# ⚠️ Note:
# Tailwind v4.x removes its CLI binary and changes configuration behavior.
# This setup uses v3.4.14 — the last version with a working `npx tailwindcss init -p`
# and smooth compatibility with Vite + PostCSS setups.

# 3. Initialize Tailwind configs
npx tailwindcss init -p

# 4. Configure Tailwind
# In `tailwind.config.cjs`, set:
# content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]
sed -i 's|content: \[\]|content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]|' tailwind.config.js

# 5. Replace index.css with Tailwind directives
echo -e "@tailwind base;\n@tailwind components;\n@tailwind utilities;" > src/index.css

# 6. Remove unused style
rm src/App.css
sed -i '/import.*App.css/d;/^$/N;/^\n$/d' src/App.tsx

# 6. Run the dev server
npm run dev
