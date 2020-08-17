# ESLint Config

## 설치

패키지를 설치하기 위해서는 Github Packages에서 패키지를 설치할 수 있도록 `registry`설정이 필요합니다.

```bash
# .npmrc
registry=https://npm.pkg.github.com
```

> [Installing a package][installing-a-package]

**yarn**

```bash
yarn add -D @minjunk/eslint-config
```

**npm**

```bash
npm install -D @minjunk/eslint-config
```

## 설정

JavaScript만을 사용할 때에는 아래와 같이 설정 합니다.

```json
// .eslintrc
{
  "extends": "@minjunk"
}
```

다만, TypeScript를 함께 사용하고자 할 때에는 아래와 같이 설정 되어야 합니다.

```json
// .eslintrc
{
  "extends": "@minjunk/eslint-config/typescript"
}
```

위와 같이 설정하게 되면 TypeScript 사용 시에 Type Checking은 제외됩니다. Type Checking이 필요하다면 아래와 같이 설정이 가능합니다.

```js
// .eslintrc.js
module.exports = {
  extends: '@minjunk/eslint-config/typescript/requiring-type-checking',
    parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
}
```

Type Checking이 함께 되면 ESLint의 [실행 속도에 영향](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/TYPED_LINTING.md)이 있습니다.

```json
// tsconfig.json
{
  "extends": "./tsconfig.json",
  "include": [
    "src/**/*.tsx",
    "src/**/*.ts",
    "**/*.js",
    ".eslintrc.js"
  ]
}
```

[installing-a-package]: https://docs.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages#installing-a-package
