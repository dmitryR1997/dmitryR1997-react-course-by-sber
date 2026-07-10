import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import boundaries from 'eslint-plugin-boundaries'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),

  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      import: importPlugin,
      boundaries: boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'shared', pattern: 'src/shared/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'app', pattern: 'src/app/*' },
      ],
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      semi: 'off',
      '@typescript-eslint/semi': 'off',

      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          policies: [
            {
              from: { element: { type: 'app' } },
              allow: [
                { to: { element: { type: 'shared' } } },
                { to: { element: { type: 'entities' } } },
                { to: { element: { type: 'features' } } },
                { to: { element: { type: 'widgets' } } },
                { to: { element: { type: 'pages' } } },
              ],
            },
            {
              from: { element: { type: 'pages' } },
              allow: [
                { to: { element: { type: 'widgets' } } },
                { to: { element: { type: 'features' } } },
                { to: { element: { type: 'entities' } } },
                { to: { element: { type: 'shared' } } },
              ],
            },
            {
              from: { element: { type: 'widgets' } },
              allow: [
                { to: { element: { type: 'shared' } } },
                { to: { element: { type: 'features' } } },
                { to: { element: { type: 'entities' } } },
              ],
            },
            {
              from: { element: { type: 'features' } },
              allow: [
                { to: { element: { type: 'shared' } } },
                { to: { element: { type: 'entities' } } },
              ],
            },
            {
              from: { element: { type: 'entities' } },
              allow: [{ to: { element: { type: 'shared' } } }],
            },
            {
              from: { element: { type: 'shared' } },
              allow: [],
            },
          ],
        },
      ],

      'import/no-unresolved': 'off',
      'import/no-relative-parent-imports': 'off',
    },
  },
])
