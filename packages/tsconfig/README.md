# @minjun0219/tsconfig

Node 20+ 을 타깃으로 하는 TypeScript 베이스 `tsconfig.json`. [`@tsconfig/node20`](https://www.npmjs.com/package/@tsconfig/node20) 스타일을 따라 `main` / `exports` 없이 파일 경로로만 참조합니다.

## 설치

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

## 결정 근거

각 옵션의 값과 근거는 스타일 가이드 문서에 정리돼 있습니다.

- [`docs/style-guide/typescript.md`](../../docs/style-guide/typescript.md)

## 포함된 옵션 요약

- `target`: `es2022`
- `module` / `moduleResolution`: `node16`
- `lib`: `es2023`
- `strict`: `true`, `noUncheckedIndexedAccess`: `true`
- `esModuleInterop`, `resolveJsonModule`, `isolatedModules`, `skipLibCheck` 활성화

전체 정의는 [`tsconfig.json`](./tsconfig.json) 참조.
