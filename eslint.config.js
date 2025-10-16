import tsParser from '@typescript-eslint/parser';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      perfectionist,
    },
    rules: {
      'perfectionist/sort-modules': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          groups: [
            'declare-enum',
            'export-enum',
            'enum',
            ['declare-interface', 'declare-type'],
            ['export-interface', 'export-type'],
            ['interface', 'type'],
            'declare-class',
            'class',
            'export-class',
            'declare-function',
            'export-function',
            'function',
          ],
          customGroups: [],
        },
      ],
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          ignorePattern: [],
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          useConfigurationIf: {},
          groups: [],
          customGroups: {},
        },
      ],
      'perfectionist/sort-interfaces': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          sortBy: 'name',
          ignorePattern: [],
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          useConfigurationIf: {},
          groupKind: 'mixed',
          groups: [],
          customGroups: [],
        },
      ],
    },
  },
];
