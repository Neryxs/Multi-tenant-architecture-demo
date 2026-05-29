import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default tseslint.config(
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
