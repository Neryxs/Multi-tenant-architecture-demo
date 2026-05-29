import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,ts,tsx,mjs,cjs}'],
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: [
      '**/dist/',
      '**/build/',
      '**/node_modules/',
      '**/.next/',
      'coverage/',
      '**/*.d.ts',
      '**/*.config.mjs',
      '**/*.config.cjs',
      'jest.config.mjs',
    ],
  },
);
