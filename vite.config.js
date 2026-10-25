import { defineConfig } from 'vite'

export default defineConfig({
  base: '/inat-tools/', // replace with your repository name
  build: {
    // Multi-page: list every HTML entry, including the home page.
    rollupOptions: { input: ['index.html', 'rarest.html', 'tree.html', 'trending.html', 'grid_viewer.html', 'range_viewer.html'] },
  },
})