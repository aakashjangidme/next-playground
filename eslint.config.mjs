import { dirname } from 'path';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
    rules: {
      'no-console': ['warn'], // Warn on console.log usage
      'prettier/prettier': ['error', { endOfLine: 'auto' }], // Prettier rules
      '@typescript-eslint/consistent-type-imports': 'error', // Enforce consistent import of types
    },
  }),
  eslintConfigPrettier,
];

export default eslintConfig;
