import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { playwright } from "vite-plus/test/browser-playwright";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const browser = {
  enabled: true,
  headless: true,
  provider: playwright({}),
  instances: [{ browser: "chromium" }],
};

const screenshotComparatorOptions = {
  threshold: 0.2,
  allowedMismatchedPixelRatio: 0.02,
};

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  lint: {
    plugins: ["oxc", "typescript", "unicorn", "react"],
    categories: {
      correctness: "warn",
    },
    env: {
      builtin: true,
    },
    ignorePatterns: ["dist", "coverage", "storybook-static"],
    overrides: [
      {
        files: ["**/*.{ts,tsx}"],
        rules: {
          "constructor-super": "error",
          "for-direction": "error",
          "getter-return": "error",
          "no-async-promise-executor": "error",
          "no-case-declarations": "error",
          "no-class-assign": "error",
          "no-compare-neg-zero": "error",
          "no-cond-assign": "error",
          "no-const-assign": "error",
          "no-constant-binary-expression": "error",
          "no-constant-condition": "error",
          "no-control-regex": "error",
          "no-debugger": "error",
          "no-delete-var": "error",
          "no-dupe-class-members": "error",
          "no-dupe-else-if": "error",
          "no-dupe-keys": "error",
          "no-duplicate-case": "error",
          "no-empty": "error",
          "no-empty-character-class": "error",
          "no-empty-pattern": "error",
          "no-empty-static-block": "error",
          "no-ex-assign": "error",
          "no-extra-boolean-cast": "error",
          "no-fallthrough": "error",
          "no-func-assign": "error",
          "no-global-assign": "error",
          "no-import-assign": "error",
          "no-invalid-regexp": "error",
          "no-irregular-whitespace": "error",
          "no-loss-of-precision": "error",
          "no-misleading-character-class": "error",
          "no-new-native-nonconstructor": "error",
          "no-nonoctal-decimal-escape": "error",
          "no-obj-calls": "error",
          "no-prototype-builtins": "error",
          "no-redeclare": "error",
          "no-regex-spaces": "error",
          "no-self-assign": "error",
          "no-setter-return": "error",
          "no-shadow-restricted-names": "error",
          "no-sparse-arrays": "error",
          "no-this-before-super": "error",
          "no-undef": "error",
          "no-unexpected-multiline": "error",
          "no-unreachable": "error",
          "no-unsafe-finally": "error",
          "no-unsafe-negation": "error",
          "no-unsafe-optional-chaining": "error",
          "no-unused-labels": "error",
          "no-unused-private-class-members": "error",
          "no-unused-vars": "error",
          "no-useless-backreference": "error",
          "no-useless-catch": "error",
          "no-useless-escape": "error",
          "no-with": "error",
          "require-yield": "error",
          "use-isnan": "error",
          "valid-typeof": "error",
          "@typescript-eslint/ban-ts-comment": "error",
          "no-array-constructor": "error",
          "@typescript-eslint/no-duplicate-enum-values": "error",
          "@typescript-eslint/no-empty-object-type": "error",
          "@typescript-eslint/no-explicit-any": "error",
          "@typescript-eslint/no-extra-non-null-assertion": "error",
          "@typescript-eslint/no-misused-new": "error",
          "@typescript-eslint/no-namespace": "error",
          "@typescript-eslint/no-non-null-asserted-optional-chain": "error",
          "@typescript-eslint/no-require-imports": "error",
          "@typescript-eslint/no-this-alias": "error",
          "@typescript-eslint/no-unnecessary-type-constraint": "error",
          "@typescript-eslint/no-unsafe-declaration-merging": "error",
          "@typescript-eslint/no-unsafe-function-type": "error",
          "no-unused-expressions": "error",
          "@typescript-eslint/no-wrapper-object-types": "error",
          "@typescript-eslint/prefer-as-const": "error",
          "@typescript-eslint/prefer-namespace-keyword": "error",
          "@typescript-eslint/triple-slash-reference": "error",
          "react-hooks/rules-of-hooks": "error",
          "react-hooks/exhaustive-deps": "warn",
          "react/only-export-components": [
            "error",
            {
              allowConstantExport: true,
            },
          ],
        },
        env: {
          es2020: true,
          browser: true,
        },
        globals: {
          AudioWorkletGlobalScope: "readonly",
          AudioWorkletProcessor: "readonly",
          currentFrame: "readonly",
          currentTime: "readonly",
          registerProcessor: "readonly",
          sampleRate: "readonly",
          WorkletGlobalScope: "readonly",
        },
      },
      {
        files: ["**/*.stories.{ts,tsx,js,jsx,mjs,cjs}", "**/*.story.{ts,tsx,js,jsx,mjs,cjs}"],
        rules: {
          "react-hooks/rules-of-hooks": "off",
          "import-x/no-anonymous-default-export": "off",
          "storybook/await-interactions": "error",
          "storybook/context-in-play-function": "error",
          "storybook/default-exports": "error",
          "storybook/hierarchy-separator": "warn",
          "storybook/no-redundant-story-name": "warn",
          "storybook/no-renderer-packages": "error",
          "storybook/prefer-pascal-case": "warn",
          "storybook/story-exports": "error",
          "storybook/use-storybook-expect": "error",
          "storybook/use-storybook-testing-library": "error",
        },
        jsPlugins: ["eslint-plugin-storybook"],
        plugins: ["import"],
      },
      {
        files: [".storybook/main.{js,cjs,mjs,ts}"],
        rules: {
          "storybook/no-uninstalled-addons": "error",
        },
        jsPlugins: ["eslint-plugin-storybook"],
      },
    ],
    options: {
      typeAware: true,
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index",
    },
    rolldownOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react-aria-components",
        "lucide-react",
      ],
    },
  },
  test: {
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.stories.tsx",
        "src/**/*.test.tsx",
        "src/**/*.visual.test.tsx",
        "src/icons/**",
      ],
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          include: ["src/**/*.test.{ts,tsx}"],
          exclude: ["src/**/*.visual.test.{ts,tsx}"],
          setupFiles: ["src/test-setup.ts"],
          browser,
        },
      },
      {
        extends: true,
        test: {
          name: "visual",
          include: ["src/**/*.visual.test.{ts,tsx}"],
          setupFiles: ["src/test-setup.ts"],
          browser: {
            ...browser,
            expect: {
              toMatchScreenshot: {
                comparatorOptions: screenshotComparatorOptions,
              },
            },
          },
        },
      },
      {
        extends: true,
        test: {
          name: "visual-dark",
          include: ["src/**/*.visual.test.{ts,tsx}"],
          setupFiles: ["src/test-setup.ts", "src/test-setup-dark.ts"],
          browser: {
            ...browser,
            expect: {
              toMatchScreenshot: {
                comparatorOptions: screenshotComparatorOptions,
                resolveScreenshotPath: ({
                  root,
                  testFileDirectory,
                  screenshotDirectory,
                  testFileName,
                  arg,
                  browserName,
                  platform,
                  ext,
                }) => {
                  return `${root}/${testFileDirectory}/${screenshotDirectory}/${testFileName}/${arg}-dark-${browserName}-${platform}${ext}`;
                },
              },
            },
          },
        },
      },
    ],
  },
});
