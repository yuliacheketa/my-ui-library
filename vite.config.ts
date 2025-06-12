import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'MyUILibrary',
      fileName: (format) => `my-ui-library.${format}.js`,
    },
    rollupOptions: {
      // Externalize deps, щоб не пакувати їх у фінальний bundle
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
