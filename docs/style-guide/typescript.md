# TypeScript (컴파일러 옵션)

TypeScript 문법·포매팅은 [`javascript.md`](./javascript.md) 에서 다룹니다. 이 문서는 타입 시스템 / 컴파일러 옵션 결정만 담습니다.

## 타깃 런타임

Node 20 LTS 이상. `@tsconfig/node20` 스타일 baseline 을 따르되 몇 가지 옵션을 강화합니다.

## 결정

| 옵션 | 값 | 근거 |
| --- | --- | --- |
| `target` | `es2022` | Node 20 이 지원하는 최신 안정 사양 |
| `module` / `moduleResolution` | `node16` | ESM/CJS 상호운용을 명시적으로 처리 (Node 16+ 방식) |
| `lib` | `["es2023"]` | DOM 은 제외 — Node 전제. 필요한 프로젝트는 소비자 `tsconfig.json` 에서 확장 |
| `strict` | `true` | 모든 strict 계열 옵션 활성화 (implicit any, null 체크 등) |
| `noUncheckedIndexedAccess` | `true` | 배열/객체 인덱싱 결과에 `undefined` 를 강제해 런타임 오류 사전 차단 |
| `esModuleInterop` | `true` | default import 상호운용성 확보 |
| `forceConsistentCasingInFileNames` | `true` | 리눅스/맥/윈도우 간 파일명 대소문자 차이로 인한 디버깅 방지 |
| `skipLibCheck` | `true` | 의존 패키지 `.d.ts` 오류로 인한 빌드 실패 회피 (트레이드오프: 라이브러리 타입 회귀는 소비자에서 감지) |
| `resolveJsonModule` | `true` | JSON 임포트를 타입 안전하게 사용 |
| `isolatedModules` | `true` | 각 파일을 독립 트랜스파일 가능하도록 강제 — SWC/esbuild 호환성 확보 |

## 결정하지 **않은** 것

다음 옵션은 소비자 프로젝트의 특성에 따라 달라지므로 base 에 포함하지 않습니다. 필요하면 소비자 `tsconfig.json` 에서 추가합니다.

- `outDir`, `rootDir`, `baseUrl`, `paths` — 프로젝트 레이아웃 의존
- `jsx` — 프레임워크 의존 (React/Preact/Solid…)
- `experimentalDecorators`, `emitDecoratorMetadata` — 도메인 의존 (NestJS/TypeORM 등)
- `declaration`, `declarationMap` — 라이브러리 vs 앱 여부에 따라 다름

## 매핑

- `packages/tsconfig/tsconfig.json`

## 사용법

```jsonc
// 소비자 tsconfig.json
{
  "extends": "@minjun0219/tsconfig/tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```
