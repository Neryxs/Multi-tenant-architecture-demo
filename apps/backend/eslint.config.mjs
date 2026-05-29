import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  // Use ESLint recommended rules
  eslint.configs.recommended,

  // Use TypeScript recommended rules
  ...tseslint.configs.recommended,

  // Use Prettier integration
  eslintPluginPrettierRecommended,

  // Custom Rules
  {
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Ignore patterns for the backend
  {
    ignores: ['dist/', 'node_modules/', 'coverage/'],
  },
);
