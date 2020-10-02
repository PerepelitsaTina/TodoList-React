module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['airbnb-base', 'plugin:react/recommended'],
  plugins: ['react', 'styled-components-config'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.13.1'
    }
  },
  parser: 'babel-eslint',
  rules: {
    'react/prop-types': 2,
    'react/no-unused-prop-types': 2,
    'react/no-unused-state': 2,
    'react/require-default-props': 2,
    'react/default-props-match-prop-types': 2,
    'react/no-access-state-in-setstate': 2,
    'react/no-direct-mutation-state': 2,
    'styled-components-config/rule-name': 2,
    'eol-last': ['error', 'always'],
    semi: ['error', 'always'],
    'no-plusplus': 'off',
    'operator-linebreak': 'off',
    'comma-dangle': ['error', 'never'],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'prefer-destructuring': 'off',
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'space-before-function-paren': 'off',
    'no-restricted-syntax': 'off',
    'styled-components-config/rule-name': 'off',
    camelcase: 'off',
    'guard-for-in': 'off',
    CssSyntaxError: 'off',
    'no-continue': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/display-name': 'off',
    'consistent-return': 'off'
  }
};