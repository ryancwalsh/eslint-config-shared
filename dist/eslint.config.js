// Remember: after changing this file, you need to transpile it to javascript and then either run `yarn eslint .` again or reload VSC.
// TODO: Publish this as a package, and update other repos to import from npm.
// https://eslint.org/blog/2022/08/new-config-system-part-2/
// https://stackoverflow.com/a/74819187/
// Inspired by https://github.com/NEAR-Edu/eslint-config-near/blob/21db3ac89ec7f307b9c5e1bc09da2e5d43a4bd94/src/lib/default.ts
import path from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import typeScriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import functional from 'eslint-plugin-functional';
import globals from 'globals';
// import eslintPluginImport from 'eslint-plugin-import'; // Seems unnecessary. Maybe it's included in the 'canonical'?
// mimic CommonJS variables -- not needed if using CommonJS
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
    baseDirectory: dirname,
});
const customRules = {
    '@babel/object-curly-spacing': 'off',
    // TODO: '@typescript-eslint/no-explicit-any': ['warn'],
    'array-bracket-newline': 'off',
    'array-element-newline': 'off',
    'func-style': 'off',
    'line-comment-position': 'off',
    // https://eslint.org/docs/latest/rules/max-len
    'max-len': ['warn', { code: 150, ignoreComments: false, ignoreRegExpLiterals: true, ignoreStrings: true, ignoreTemplateLiterals: true }],
    // https://eslint.org/docs/rules/max-lines
    'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    // https://eslint.org/docs/rules/max-lines-per-function
    'max-lines-per-function': ['error', { max: 30, skipBlankLines: true, skipComments: true }],
    // https://eslint.org/docs/latest/rules/no-console
    // 'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-console': ['warn'],
    'no-inline-comments': 'off',
    'no-warning-comments': 'off',
    'object-curly-newline': 'off',
    'object-property-newline': 'off',
    // TODO: Does this come from 'next/core-web-vitals'?
    // 'react-hooks/exhaustive-deps': [
    //   'warn',
    //   {
    //     additionalHooks: '(useRecoilCallback|useRecoilTransaction_UNSTABLE)', // https://recoiljs.org/docs/introduction/installation#eslint
    //   },
    // ],
};
const config = [
    ...compat.extends('canonical', 'canonical/prettier'),
    ...compat.extends('canonical/json', 'canonical/prettier').map((item) => {
        return {
            ...item,
            files: ['*.json'],
        };
    }),
    ...compat.extends('canonical/yaml', 'canonical/prettier').map((item) => {
        return {
            ...item,
            files: ['*.yaml'],
        };
    }),
    // TODO: Figure out how to uncomment:
    // ...compat.extends('canonical/typescript', 'canonical/prettier').map((item: Linter.Config) => {
    //   return {
    //     ...item,
    //     files: ['*.ts'],
    //     languageOptions: {
    //       parserOptions: {
    //         project: './tsconfig.json',
    //       },
    //     },
    //   };
    // }),
    {
        files: ['{**/{index,_app}.tsx,next.config.js,**/eslint.config.js,**/eslint.config.ts,pages/*.tsx}'],
        rules: {
            'canonical/filename-match-exported': 'off',
        },
    },
    {
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
        rules: {
            'import/extensions': [
                // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md#importextensions
                'off',
                {
                    'nextauth]': 'never',
                },
            ],
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
            '@typescript-eslint': typeScriptEslintPlugin,
            functional,
            // import: eslintPluginImport,
            ts: typeScriptEslintPlugin,
        },
        rules: {
            ...typeScriptEslintPlugin.configs['eslint-recommended'].rules,
            ...typeScriptEslintPlugin.configs.recommended.rules,
            'ts/return-await': 'error', // https://typescript-eslint.io/rules/return-await/
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            ...customRules,
        },
    },
];
export default config;
