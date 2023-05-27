// Remember to reload VSC after changing this file.
// TODO: Publish this as a package, and update other repos to import from npm.
// Inspired by https://github.com/NEAR-Edu/eslint-config-near/blob/21db3ac89ec7f307b9c5e1bc09da2e5d43a4bd94/src/lib/default.ts

import path from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import nextPlugin from '@next/eslint-plugin-next';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import functional from 'eslint-plugin-functional';
import globals from 'globals';
// import imprt from 'eslint-plugin-import'; // 'import' is ambiguous & prettier has trouble

// mimic CommonJS variables -- not needed if using CommonJS
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
});

console.log({ compat });

const overrides = {
  rules: {
    '@babel/object-curly-spacing': 'off',
    'array-bracket-newline': 'off',
    'array-element-newline': 'off',
    'func-style': 'off',
    'line-comment-position': 'off',
    'no-console': 'off',
    'no-inline-comments': 'off',
    'no-warning-comments': 'off',
    'object-curly-newline': 'off',
    'object-property-newline': 'off',
    // "unicorn/expiring-todo-comments": "off", // TODO: Why did this need to be disabled temporarily?
  },
};

export default [
  ...compat.extends('canonical', 'canonical/prettier'),
  {
    files: ['{**/{index,_app}.tsx,next.config.js}'],
    rules: {
      'canonical/filename-match-exported': 'off',
    },
  },
  {
    // TODO: Figure out:
    //   overrides: [
    //     {
    //       extends: ['canonical/typescript', 'canonical/prettier'],
    //       files: '*.ts',
    //       parserOptions: {
    //         project: './tsconfig.json',
    //       },
    //     },
    //     {
    //       extends: ['canonical/json', 'canonical/prettier'],
    //       files: '*.json',
    //     },
    //     {
    //       extends: ['canonical/yaml', 'canonical/prettier'],
    //       files: '*.yaml',
    //     },

    //   ],
    //   root: true,
    rules: {
      'canonical/destructuring-property-newline': 'off',
      'canonical/import-specifier-newline': 'off',
      'import/extensions': [
        'error',
        {
          css: 'always',
          js: 'never',
          json: 'always',
          jsx: 'never',
          mjs: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-unassigned-import': [
        'error',
        {
          allow: ['**/*.css'],
        },
      ],
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: false,
            order: 'asc',
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          warnOnUnassignedImports: false,
        },
      ],
      'jsdoc/valid-types': 'off',
    },
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
  {
    ignores: ['.next/*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          modules: true,
        },
        ecmaVersion: 'latest',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      functional,
      // import: imprt,
      ts,
    },
    rules: {
      ...ts.configs['eslint-recommended'].rules,
      ...ts.configs.recommended.rules,
      'ts/return-await': 2,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        // myCustomGlobal: "readonly"
      },
    },
    rules: {
      ...overrides.rules,
    },
  },
];
