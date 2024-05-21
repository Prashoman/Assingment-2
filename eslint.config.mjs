import eslint from '@eslint/js';
import globals from "globals";
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
        "no-unused-vars": "error",
        "no-undef": "error",
        "prefer-const": "error",
        "no-console": "warn",
    },
    ignores: [
        "!node_modules/",           // unignore `node_modules/` directory
        "node_modules/*",           // ignore its content
        "./dist/*"  // unignore `node_modules/mylibrary` directory
    ]
}
);