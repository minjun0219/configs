# JavaScript & TypeScript

JS 와 TS 는 문법·툴체인이 사실상 하나로 취급되므로 결정 문서를 통합합니다. TS 전용 (컴파일러 옵션, 타입 사용) 은 [`typescript.md`](./typescript.md).

## 포매팅

공통 규칙은 [`formatting.md`](./formatting.md). JS/TS 만의 추가 결정은 다음과 같습니다.

| 항목 | 값 | 근거 |
| --- | --- | --- |
| Quote style | single | 프로젝트 관행. HTML/JSX 는 double 을 유지 |
| Semicolons | always | ASI(자동 세미콜론 삽입) 함정 회피, 툴 파싱 안정성 |
| Trailing commas | all | diff 노이즈 감소, 다인수 함수 확장에서 유리 |
| Arrow parens | always | 인자 개수 변경에 안정적, prettier 표준과 일치 |

## 린트

Biome `recommended` preset 을 기본으로 사용합니다. `recommended` 가 이미 커뮤니티 검증된 최소 집합이고, 팀 상황에 따라 오버라이드는 소비자 저장소에서 개별로 켜/끄기 쉽기 때문입니다. 다만 preset 만으로 부족한 결정은 [프리셋 재정의](#프리셋-재정의) 에서 규칙 단위로 상향합니다.

| 항목 | 값 | 근거 |
| --- | --- | --- |
| Rules preset | `recommended` | Biome 팀이 유지하는 검증된 기본 집합 |
| VCS 통합 | `git` + `useIgnoreFile: true` | `.gitignore` 를 그대로 존중해 무시 규칙 이중 관리 회피 |
| Unknown files | `ignoreUnknown: true` | 지원되지 않는 확장자에 대한 잡음 제거 |

### 프리셋 재정의

`recommended` 를 유지하되 아래 규칙만 명시적으로 상향합니다.

| 규칙 | 값 | 근거 |
| --- | --- | --- |
| `style/useBlockStatements` | `error` | `if`/`else`/`for`/`while` 등의 단일-문을 항상 블록으로 감싸도록 강제. 후속 라인 추가 시 조용한 버그(들여쓰기만 맞고 실제로는 블록 밖) 를 원천 차단하고, diff 상 조건-본문 경계를 명확히 함. Biome `recommended` 에서는 기본 미포함이라 명시 활성화 필요 |

## 예외

- **레거시 `packages/eslint-config/`** — Airbnb 기반 구 ESLint 설정 코드. 루트 `biome.jsonc` 의 `files.includes` 에서 제외되어 있으며 신규 규칙 적용 대상이 아닙니다.

## 매핑

- Biome: `packages/biome-config/biome.jsonc` 의 `linter`, `javascript.formatter`, `vcs`, `files`
