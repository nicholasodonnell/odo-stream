import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import nextVitals from 'eslint-config-next/core-web-vitals'
import perfectionist from 'eslint-plugin-perfectionist'
import prettier from 'eslint-plugin-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

export default defineConfig([
  ...nextVitals,

  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ),

  perfectionist.configs['recommended-natural'],

  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslintEslintPlugin,
      prettier,
    },

    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',

      '@typescript-eslint/no-explicit-any': 'off',

      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
          imports: 'always-multiline',
          objects: 'always-multiline',
        },
      ],

      'import/no-anonymous-default-export': 'off',

      'no-unused-expressions': 2,
      'object-curly-spacing': ['error', 'always'],

      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'all', // Match your comma-dangle: "always-multiline"
        },
      ],

      quotes: [
        'error',
        'single',
        {
          allowTemplateLiterals: true,
        },
      ],

      'react-hooks/exhaustive-deps': 'error',

      'react-hooks/rules-of-hooks': 'off',
      'react/display-name': 'off',
      'react/jsx-curly-spacing': [
        'error',
        {
          children: true,
        },
      ],
      'react/jsx-no-undef': 'error',

      'react/jsx-uses-react': 'error',

      'react/jsx-uses-vars': 'error',
      'react/no-unescaped-entities': [
        'error',
        {
          forbid: ['>', '"', '}'],
        },
      ],
      'react/prop-types': 'off',

      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true,
        },
      ],

      semi: ['error', 'never'],
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  globalIgnores(['node_modules/*', 'dist/*']),
])
