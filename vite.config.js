import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: '/VisualStructure/',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        stack: path.resolve(__dirname, 'stack.html'),
        queue: path.resolve(__dirname, 'queue.html'),
        tree: path.resolve(__dirname, 'tree.html'),
      },
    },
  },
});
