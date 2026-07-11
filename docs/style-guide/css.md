# CSS

Biome 2.x 는 CSS 를 파일 단위로 포매팅하고 일부 린트 룰을 제공합니다. 이 저장소는 CSS-in-JS 나 특정 프레임워크 (Tailwind, styled-components 등) 에 종속되지 않는 **일반 CSS 파일** 을 대상으로 결정합니다.

## 포매팅

공통 규칙은 [`formatting.md`](./formatting.md). CSS 만의 결정은 다음과 같습니다.

| 항목 | 값 | 근거 |
| --- | --- | --- |
| Quote style | double | CSS 관행. `url("...")`, `content: "..."` 등에서 표준 |
| Formatter enabled | `true` | Biome 이 프로퍼티 순서/공백을 자동 정리 |

## 린트

Biome `recommended` preset 이 기본 CSS 룰 (중복 프로퍼티, 유효하지 않은 pseudo-class 등) 을 커버합니다. 추가 opinion 은 아직 없습니다.

## 스코프

- **대상**: `.css` 파일 (Global CSS, CSS Modules, plain stylesheets)
- **비대상**: Tailwind directives (@apply 등), CSS-in-JS (styled-components/emotion), Sass/Less — 이들은 각 도구가 별도로 처리하므로 이 저장소가 규칙을 강제하지 않습니다

## 매핑

- Biome: `packages/biome-config/biome.jsonc` 의 `css.*`
