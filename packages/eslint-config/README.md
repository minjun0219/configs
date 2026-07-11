> [!WARNING]
> **Deprecated.** 이 패키지는 더 이상 발행되지 않습니다. 신규 프로젝트는 [`@minjun0219/biome-config`](../biome-config) 를 사용하세요. 코드는 이전 사용자를 위한 아카이브 용도로만 남겨둡니다.

# @minjun0219/eslint-config

Airbnb 기반 ESLint 7 / TypeScript 3.9 시대 설정입니다. Biome 로 전환하기 전에 사용하던 구 버전 코드입니다.

## 설치 (아카이브 용, 신규 사용 비권장)

이 패키지는 GitHub Packages 의 `@minjunk/eslint-config@1.0.0` 이후 발행되지 않았습니다 (이후 `@minjun0219` 로 스코프가 이관되면서 신규 발행 중단 — 소스 이름은 `@minjun0219/eslint-config` 이지만 tarball 은 발행된 적이 없습니다). 아래는 그 시절의 사용법을 참고용으로 남겨둔 것입니다.

```bash
# .npmrc — GitHub Packages 를 통해 레거시 tarball 을 install 하는 경우에만 필요
@minjunk:registry=https://npm.pkg.github.com
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
  "extends": "@minjunk/eslint-config"
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
};
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
