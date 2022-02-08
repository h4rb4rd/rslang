module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'airbnb',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.js'] }],
    'no-param-reassign': [2, { props: false }],
    'no-unused-expressions': 'off',
    'no-unused-vars': 'warn',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'import/prefer-default-export': 'off',
    'require-jsdoc': 'off',
    'import/extensions': 'off',
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/button-has-type': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-plusplus': 'off',
  },
};
