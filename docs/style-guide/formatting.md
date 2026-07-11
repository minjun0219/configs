# Formatting (공통)

언어와 관계 없이 저장소 전체에 걸치는 포매팅 결정을 모아둡니다. 값이 언어별로 갈리는 부분은 [`javascript.md`](./javascript.md), [`css.md`](./css.md) 에서 재정의합니다.

## 결정

| 항목 | 값 | 근거 |
| --- | --- | --- |
| Indent style | space | 에디터 간 렌더링 차이 최소화 |
| Indent width | 2 | 좁은 화면/side-by-side diff 에서 가독성 우위 |
| Line width | 100 | 80 은 최근 화면 폭 대비 너무 좁고, 120 은 diff review 시 wrap 잦음 |
| Line ending | LF | 크로스 플랫폼 저장소 표준 |
| Final newline | required | POSIX 관행 및 diff 안정성 |

## 매핑

- Biome: `packages/biome-config/biome.jsonc` 의 `formatter.*`
- EditorConfig: 루트 `.editorconfig` (에디터 저장 시점 강제)

## 언어별 재정의

| 언어 | 항목 | 값 | 근거 |
| --- | --- | --- | --- |
| JSON | Trailing commas | `none` | 표준 JSON parser 는 트레일링 콤마를 허용하지 않음. JSONC 파일은 예외적으로 허용되나 통일성을 위해 `none` 유지 |

## 관련 결정 (파생)

- `.editorconfig` 은 저장 시점, Biome 은 커밋 시점(포매터/린터) 검증을 담당합니다. 두 곳에서 값이 어긋나면 Biome 을 소스-오브-트루스로 삼고 `.editorconfig` 을 맞춥니다.
