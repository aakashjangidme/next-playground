import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Use base Next.js and TypeScript configurations along with Prettier
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  eslintConfigPrettier, // Disable conflicting Prettier rules in ESLint

  {
    files: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js'],
    rules: {
      semi: ['error', 'always'], // Enforce semicolons
      quotes: ['error', 'single'], // Enforce single quotes for strings
      'no-console': ['warn'], // Warn on console.log usage
      'react/jsx-uses-react': 'off', // Next.js handles React automatically
      'react/react-in-jsx-scope': 'off', // React automatically in scope in Next.js
      'prettier/prettier': ['error', { endOfLine: 'auto' }], // Ensure Prettier rules are followed
    },
  },

  // Example of a rule to ignore config files or non-JS files
  {
    files: ['**/*.config.js'],
    rules: {
      'no-unused-vars': 'off',
    },
  },
];

export default eslintConfig;
