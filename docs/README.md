# docs/

이 저장소가 발행하는 개발 설정의 **결정 사항과 근거를 담은 소스-오브-트루스** 입니다. 각 config 파일(`biome.jsonc`, `tsconfig.json`) 은 여기 명시된 결정을 그대로 반영합니다.

## 왜 문서를 먼저 두는가

- **의도가 사라지지 않음** — `biome.jsonc` 의 한 줄이 어떤 논리로 정해졌는지, 왜 다른 값이 아닌지가 config 파일만 봐서는 잘 드러나지 않습니다. 문서가 그 맥락을 붙잡습니다.
- **소비자 프로젝트가 이해하기 쉬움** — 규칙만 강제하고 이유를 설명하지 않으면 팀 컨벤션과 충돌할 때 협상이 어렵습니다.
- **바꿀 때 checklist 가 명확함** — 값을 바꿀 때는 (1) 문서를 바꾸고 (2) 그 결정에 맞춰 config 파일을 바꾸는 두 단계 워크플로우로 통일합니다.

## 구조

```
docs/
├── README.md                     이 파일
└── style-guide/
    ├── formatting.md             언어 공통 포매팅 (indent, quote, line width 등)
    ├── javascript.md             JS/TS 공통 린트/포매팅 결정
    ├── typescript.md             TS 전용 타입 시스템 / 컴파일러 옵션
    └── css.md                    CSS 포매팅/린트 결정
```

## 문서 → config 매핑

| 문서 | 매핑되는 config |
| --- | --- |
| [`style-guide/formatting.md`](./style-guide/formatting.md) | [`packages/biome-config/biome.jsonc`](../packages/biome-config/biome.jsonc) — `formatter`, `files.lineEnding` |
| [`style-guide/javascript.md`](./style-guide/javascript.md) | [`packages/biome-config/biome.jsonc`](../packages/biome-config/biome.jsonc) — `linter`, `javascript.*` |
| [`style-guide/typescript.md`](./style-guide/typescript.md) | [`packages/tsconfig/tsconfig.json`](../packages/tsconfig/tsconfig.json) |
| [`style-guide/css.md`](./style-guide/css.md) | [`packages/biome-config/biome.jsonc`](../packages/biome-config/biome.jsonc) — `css.*` |

## 값 바꿀 때

1. 해당 문서의 결정 표를 갱신 (근거를 짧게라도 남긴다)
2. 매핑된 config 파일 값을 문서와 동일하게 맞춘다
3. `pnpm biome check .`, `pnpm typecheck` 로 재검증
4. PR body 에 문서 diff 를 요약해 리뷰 콘텍스트를 남긴다
