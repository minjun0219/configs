/* eslint-env node */
module.exports = {
  extends: 'airbnb',
  plugins: [
    'jest',
  ],
  rules: {
    // React 컴포넌트 작성 시 Hooks를 이용해 확장을 할 수 있으므로 해당 Rule을 Off한다.
    // https://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': 'off',

    // 경우에 따라 named-export만 사용하는 것이 확장이 용이하다고 판단됩니다.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // named-export와 default-export가 모두 존재할 경우에는 default-export를 우선 사용합니다.
    // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-named-as-default.md
    'import/no-named-as-default': 'off',

    // React Props Spreading를 사용하도록 설정 합니다.
    // <input>, <svg>태그 등에서 Props Spreading을 사용합니다.
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-props-no-spreading.md
    'react/jsx-props-no-spreading': 'off',
  },
  overrides: [
    // all test files
    {
      files: [
        '*.test.ts',
      ],
      env: {
        'jest/globals': true,
      },
      rules: {
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
      },
    },
  ],
};
