# @minjun0219/tsconfig

Node 20+ 을 타깃으로 하는 TypeScript 베이스 `tsconfig.json`. [`@tsconfig/node20`](https://www.npmjs.com/package/@tsconfig/node20) 스타일을 따라 `main` / `exports` 없이 파일 경로로만 참조합니다.

## 설치

GitHub Packages 레지스트리를 사용합니다.

```
# .npmrc
@minjun0219:registry=https://npm.pkg.github.com
```

```bash
pnpm add -D @minjun0219/tsconfig
```

## 사용

```jsonc
// tsconfig.json
{
  "extends": "@minjun0219/tsconfig/tsconfig.json"
}
```

## 포함된 옵션 요약

- `target`: `es2022`
- `module` / `moduleResolution`: `node16`
- `lib`: `es2023`
- `strict`: `true`, `noUncheckedIndexedAccess`: `true`
- `esModuleInterop`, `resolveJsonModule`, `isolatedModules`, `skipLibCheck` 활성화

전체 정의는 [`tsconfig.json`](./tsconfig.json) 참조.
