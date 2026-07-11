# @minjun0219/biome-config

[Biome](https://biomejs.dev) 공용 설정. 린트와 포매팅을 함께 제공합니다.

## 설치

Biome 는 peer dependency 이므로 함께 설치합니다.

```bash
pnpm add -D @minjun0219/biome-config @biomejs/biome
```

## 사용

`biome.jsonc` 의 `extends` 는 배열이어야 합니다.

```jsonc
{
  "extends": ["@minjun0219/biome-config"]
}
```

pnpm 심볼릭 링크 이슈로 해석이 실패하면 상대 경로 fallback 을 사용하세요.

```jsonc
{
  "extends": ["./node_modules/@minjun0219/biome-config/biome.jsonc"]
}
```

### 요구사항

이 설정은 `vcs.useIgnoreFile: true` 를 켜므로 소비자 프로젝트가 **Git 저장소로 초기화되어 있어야 하고**, 동시에 `.gitignore` 파일이 존재해야 `biome check .` 이 정상 실행됩니다. 두 조건 중 하나라도 빠지면 실패합니다.

- 실제 프로젝트: 두 조건 모두 이미 충족돼 있으므로 별도 처리 불필요.
- 순수 실험 디렉토리 (`.git/` 없음): `git init` **및** `.gitignore` 생성이 모두 필요합니다. 이 요구를 완전히 우회하려면 소비자 `biome.jsonc` 에서 `vcs.enabled: false` 로 재정의하세요.

## 결정 근거

여기서 강제되는 규칙과 근거는 저장소 루트의 스타일 가이드 문서에 정리돼 있습니다.

- [`docs/style-guide/formatting.md`](../../docs/style-guide/formatting.md) — 공통 포매팅
- [`docs/style-guide/javascript.md`](../../docs/style-guide/javascript.md) — JS/TS 린트/포매팅
- [`docs/style-guide/css.md`](../../docs/style-guide/css.md) — CSS 포매팅

## 소스 참조

- [`biome.jsonc`](./biome.jsonc) — 위 문서의 결정이 실제로 인코딩된 config
