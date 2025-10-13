import tsParser from '@typescript-eslint/parser';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';

export default [
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
