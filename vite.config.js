import { defineConfig } from 'vite'

export default defineConfig({
  // HTML entry points live in web/; TypeScript stays in src/ (referenced as ../src).
  root: 'web',
  base: '/inat-tools/', // replace with your repository name
  build: {
    // Output back to the repo-root dist/ that the Pages workflow uploads.
    outDir: '../dist',
    emptyOutDir: true,
    // Multi-page: list every HTML entry (relative to root), including the home page.
    rollupOptions: { input: ['index.html', 'rarest.html', 'tree.html', 'trending.html', 'grid_viewer.html', 'range_viewer.html'] },
  },
})
