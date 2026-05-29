const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
  // Use ESLint recommended rules
  eslint.configs.recommended,
  
  // Use TypeScript recommended rules
  ...tseslint.configs.recommended,
  
  // Use Prettier integration (sets up plugin:prettier and extends eslint-config-prettier)
  eslintPluginPrettierRecommended,
  
  // Custom Rules & Options
  {
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
  },
  
  // Global ignores for compilation and dependencies
  {
    ignores: [
      "**/dist/",
      "**/build/",
      "**/node_modules/",
      "**/.next/",
      "coverage/"
    ]
  }
);
