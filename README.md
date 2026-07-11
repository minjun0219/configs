# @minjun0219/configs

Minjun 의 공용 개발 설정 monorepo. Biome 및 TypeScript 베이스 설정을 개별 패키지로 발행합니다.

## 패키지

| 패키지 | 설명 | 상태 |
| --- | --- | --- |
| [`@minjun0219/biome-config`](./packages/biome-config) | Biome 공용 설정 (린트 + 포맷) | 활성 |
| [`@minjun0219/tsconfig`](./packages/tsconfig) | TypeScript 베이스 tsconfig | 활성 |
| [`@minjun0219/eslint-config`](./packages/eslint-config) | 구 ESLint 설정 (Airbnb 기반) | **Deprecated** — Biome 로 이전 |

발행 레지스트리는 [npmjs.org](https://www.npmjs.com/org/minjun0219) 입니다.

## 개발

패키지 매니저는 pnpm 을 사용합니다.

```bash
pnpm install                   # 워크스페이스 설치
pnpm lint                      # biome check .
pnpm typecheck                 # tsc --showConfig (extends 체인 검증)
pnpm publish:dry               # pnpm -r publish --dry-run
```

## 소비 방식

npmjs 는 기본 레지스트리이므로 별도 `.npmrc` 설정 없이 바로 설치할 수 있습니다.

```bash
pnpm add -D @minjun0219/biome-config @minjun0219/tsconfig @biomejs/biome
```

각 패키지의 사용법은 개별 README 참조.

## 스타일 가이드

각 패키지가 강제하는 규칙과 근거는 [`docs/`](./docs) 에 정리돼 있습니다. config 값을 바꿀 때는 문서를 먼저 갱신하고 config 를 그 결정에 맞추는 워크플로우를 따릅니다.

- [`docs/style-guide/formatting.md`](./docs/style-guide/formatting.md) — 공통 포매팅
- [`docs/style-guide/javascript.md`](./docs/style-guide/javascript.md) — JS/TS
- [`docs/style-guide/typescript.md`](./docs/style-guide/typescript.md) — TypeScript 컴파일러 옵션
- [`docs/style-guide/css.md`](./docs/style-guide/css.md) — CSS

## 라이선스

MIT — [`LICENSE`](./LICENSE) 참조.

## 배경

방향과 결정 근거는 [`AGENTS.md`](./AGENTS.md) 에 정리돼 있습니다.
