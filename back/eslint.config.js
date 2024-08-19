import eslint from "@eslint/js";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginJest from "eslint-plugin-jest";
import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  eslint.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      import: eslintPluginImport,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": ["error"],
      indent: ["error", 2],
      "linebreak-style": ["error", "unix"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "no-unused-vars": "warn",
      "no-console": "off",
      camelcase: "error",
      eqeqeq: ["error", "always"],
      strict: ["error", "global"],
      "max-len": ["warn", { code: 100 }],
      "no-param-reassign": "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-throw-literal": "error",
      "no-use-before-define": "error",
      "prefer-destructuring": ["error", { object: true, array: false }],
      "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
      "no-underscore-dangle": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "always",
          mjs: "never",
          jsx: "never",
        },
      ],
      "import/prefer-default-export": "off",
    },
  },
  {
    files: ["**/*.test.js", "**/*.spec.js"],
    plugins: {
      jest: eslintPluginJest,
    },
    languageOptions: {
      globals: {
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    rules: {
      ...eslintPluginJest.configs.recommended.rules,
    },
  },
];
