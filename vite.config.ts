/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => ({
  plugins: [react({
    babel: command === 'serve' ? {
      plugins: [['babel-plugin-react-compiler']]
    } : {}
  })],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-aria-components', 'lucide-react'],
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/**/*.visual.test.tsx', 'src/icons/**'],
    },
    projects: [{
      extends: true,
      test: {
        name: 'unit',
        include: ['src/**/*.test.{ts,tsx}'],
        exclude: ['src/**/*.visual.test.{ts,tsx}'],
        setupFiles: ['src/test-setup.ts'],
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium',
          }],
        },
      }
    }, {
      extends: true,
      test: {
        name: 'visual',
        include: ['src/**/*.visual.test.{ts,tsx}'],
        setupFiles: ['src/test-setup.ts'],
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium',
          }],
          expect: {
            toMatchScreenshot: {
              comparatorOptions: {
                threshold: 0.2,
                allowedMismatchedPixelRatio: 0.02,
              },
            },
          },
        },
      }
    }, {
      extends: true,
      test: {
        name: 'visual-dark',
        include: ['src/**/*.visual.test.{ts,tsx}'],
        setupFiles: ['src/test-setup.ts', 'src/test-setup-dark.ts'],
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium',
          }],
          expect: {
            toMatchScreenshot: {
              comparatorOptions: {
                threshold: 0.2,
                allowedMismatchedPixelRatio: 0.02,
              },
              resolveScreenshotPath: ({ root, testFileDirectory, screenshotDirectory, testFileName, arg, browserName, platform, ext }) => {
                return `${root}/${testFileDirectory}/${screenshotDirectory}/${testFileName}/${arg}-dark-${browserName}-${platform}${ext}`;
              },
            },
          },
        },
      }
    }]
  }
}));