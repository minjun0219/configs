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

## 소스 참조

- [`biome.jsonc`](./biome.jsonc)
