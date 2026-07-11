# @minjun0219/biome-config

[Biome](https://biomejs.dev) 공용 설정. 린트와 포매팅을 함께 제공합니다.

## 설치

GitHub Packages 레지스트리를 사용합니다. 소비자 저장소에 `.npmrc` 를 추가하세요.

```
@minjun0219:registry=https://npm.pkg.github.com
```

Biome 는 peer dependency 이므로 별도 설치가 필요합니다.

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

## 결정 근거

여기서 강제되는 규칙과 근거는 저장소 루트의 스타일 가이드 문서에 정리돼 있습니다.

- [`docs/style-guide/formatting.md`](../../docs/style-guide/formatting.md) — 공통 포매팅
- [`docs/style-guide/javascript.md`](../../docs/style-guide/javascript.md) — JS/TS 린트/포매팅
- [`docs/style-guide/css.md`](../../docs/style-guide/css.md) — CSS 포매팅

## 소스 참조

- [`biome.jsonc`](./biome.jsonc) — 위 문서의 결정이 실제로 인코딩된 config
