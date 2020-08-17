const { rules, overrides } = require('../index');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: 'airbnb-typescript',
  rules,
  overrides,
};
