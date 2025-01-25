const globals = require('globals');
const react = require('eslint-plugin-react');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const vite = require('vite-plugin-eslint');
const reactHooks = require('eslint-plugin-react-hooks');

module.exports = [
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react,
      reactHooks,
      vite,
      eslintPluginPrettierRecommended, // last item
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
     },
  },
];
