# AGENTS.md

이 문서는 이 저장소에서 작업하는 모든 코딩 에이전트를 위한 공통 참조 문서입니다. Claude Code 전용 지침은 [`CLAUDE.md`](./CLAUDE.md) 에 있으며, 공통 내용은 이 문서를 우선합니다.

---

## 1. Overview

pnpm 기반 monorepo 로 공용 개발 설정(Biome, TypeScript) 을 개별 패키지로 관리하고 npmjs.org 에 발행합니다.

- **Owner**: `minjun0219`
- **Repo**: `configs` (구 `eslint-config` 에서 리네임 완료)
- **패키지 매니저**: pnpm workspaces (`pnpm-workspace.yaml`, `pnpm-lock.yaml`)
- **발행 레지스트리**: npmjs.org (`https://registry.npmjs.org`, org 스코프 `@minjun0219`)
- **가시성**: 퍼블릭

기존 Airbnb 기반 ESLint 7 / TypeScript 3.9 설정은 `packages/eslint-config/` 로 이관되었고 `private: true` 로 발행이 차단됐습니다.

---

## 2. Direction (완료)

원래 "다음 세션 실행 대상" 이었던 항목들. 아래 상태는 실제 리포 구조와 일치합니다.

### 2.1 스코프 통일 — 완료

- `@minjunk/*` → **`@minjun0219/*`**
- 기존 `@minjunk` 스코프는 GitHub 오너(`minjun0219`) 와 불일치. 초기에는 GitHub Packages 발행 조건 (스코프 = 오너 일치) 때문에 통일했고, 이후 발행 대상이 npmjs 로 바뀐 뒤에도 동일 스코프의 npm org 를 생성해 유지 중.

### 2.2 라이선스 & 리포 공개 — 완료

- 루트 `LICENSE` (MIT) 추가됨
- GitHub 저장소 퍼블릭 전환 완료

### 2.3 툴링 전환 — 완료

- yarn v1 → **pnpm workspaces**
- `yarn.lock` 삭제, `pnpm-workspace.yaml` + `pnpm-lock.yaml` 도입

### 2.4 패키지 구성 — 완료

| 패키지 | 역할 | 비고 |
| --- | --- | --- |
| `@minjun0219/biome-config` | Biome 공용 설정 (린트 + 포맷) | `exports: {".": "./biome.jsonc"}`, peer `@biomejs/biome >= 2.5.0` (Biome 2.5 부터 `rules.preset` 문법 요구) |
| `@minjun0219/tsconfig` | TypeScript 베이스 tsconfig | `@tsconfig/node20` 스타일 — `main`/`exports` 없이 `tsconfig.json` 을 패키지 루트에 배치. 소비자는 `extends: "@minjun0219/tsconfig/tsconfig.json"` 로 명시 경로 참조 |
| `@minjun0219/eslint-config` | 기존 ESLint 설정 (**deprecated**) | `packages/eslint-config/` 로 이동, `private: true` 로 두어 신규 발행 차단. README 에 deprecation 배너 추가 |

### 2.5 배포 정책 — 완료 (npmjs.org 로 결정)

- **npmjs.org 만** 사용. 초기에는 GitHub Packages 로 계획했으나 §2.6 의 익명 접근 검증에서 GHP 가 401 을 반환해 방향을 전환.
- 각 발행 패키지 `publishConfig`:
  ```json
  {
    "publishConfig": {
      "registry": "https://registry.npmjs.org/",
      "access": "public"
    }
  }
  ```
- 각 패키지에 `repository.url` + `repository.directory` 필수 — 없으면 레지스트리 페이지에서 소스 링크가 orphan 상태.

### 2.6 발행 대상 결정 근거

리포 퍼블릭 전환의 목적은 "**토큰 없이 참조**" 였습니다. 초기 계획은 GitHub Packages 였으나 실측 결과 GHP 는 리포가 퍼블릭이어도 npm registry 인증을 요구합니다.

**검증 결과** (2026-07-11):
```
$ npm view @minjun0219/tsconfig --registry=https://npm.pkg.github.com
npm error 401 Unauthorized - authentication token not provided
```

이에 따라 다음 옵션을 검토했고 B 를 선택했습니다.

- 옵션 A: GHP 유지, 소비자에게 PAT 를 요구 → 오픈소스 소비 마찰
- **옵션 B (채택)**: npmjs.org 로 발행 대상 변경 → 진짜 익명 install 가능

npm org `@minjun0219` 를 생성한 후 `publishConfig.registry` 와 `publish.yml` 을 npmjs 로 전환했습니다. GHP 에 발행된 `2.0.0` 은 그대로 남지만 canonical 은 npmjs 입니다.

---

## 3. Repository layout

```
configs/
├── package.json                     private: true, name "@minjun0219/configs"
├── pnpm-workspace.yaml              packages: [packages/*]
├── .npmrc                           (실질적으로 비어있음 — npmjs 는 기본 레지스트리)
├── LICENSE                          MIT
├── .editorconfig                    (기존 그대로)
├── .gitignore                       node_modules, dist, .pnpm-store, .DS_Store 등
├── biome.jsonc                      self-lint: extends ["@minjun0219/biome-config"]
├── tsconfig.json                    self-config: extends "@minjun0219/tsconfig/tsconfig.json"
├── README.md                        모노레포 개요 + 각 패키지 링크
├── .github/workflows/
│   ├── ci.yml                       PR 에서 pnpm biome check + typecheck
│   └── publish.yml                  release 태그 트리거, pnpm publish -r
└── packages/
    ├── biome-config/
    │   ├── package.json
    │   ├── biome.jsonc
    │   └── README.md
    ├── tsconfig/
    │   ├── package.json
    │   ├── tsconfig.json            베이스
    │   ├── react.json               (선택) React/JSX 프리셋
    │   └── README.md
    └── eslint-config/               (기존 코드 이동, deprecated)
        ├── package.json             private: true
        ├── index.js
        ├── typescript/
        └── README.md                deprecation 배너
```

---

## 4. Package.json field cheatsheet

### 4.1 발행 패키지 공통

```json
{
  "license": "MIT",
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/minjun0219/configs.git",
    "directory": "packages/<package-name>"
  }
}
```

### 4.2 `@minjun0219/biome-config`

```json
{
  "name": "@minjun0219/biome-config",
  "version": "0.1.0",
  "license": "MIT",
  "exports": {
    ".": "./biome.jsonc",
    "./biome.jsonc": "./biome.jsonc"
  },
  "files": ["biome.jsonc"],
  "peerDependencies": {
    "@biomejs/biome": ">=2.0.0"
  }
}
```

`"./biome.jsonc"` 서브패스를 함께 노출해서, 소비자가 명시 경로(`"@minjun0219/biome-config/biome.jsonc"`) 로 참조하거나 pnpm 심볼릭 링크 우회 케이스에서도 해석되도록 합니다.

### 4.3 `@minjun0219/tsconfig`

`main`/`exports` 없음. `@tsconfig/node20` 을 참고했습니다.

```json
{
  "name": "@minjun0219/tsconfig",
  "version": "0.1.0",
  "license": "MIT",
  "files": ["tsconfig.json"]
}
```

`react.json` 등 프리셋을 추가할 때 `files` 배열도 함께 확장합니다. `files` 에 존재하지 않는 파일이 있으면 `pnpm publish` 가 `ENOENT` 로 실패하므로, 실제로 파일을 생성한 시점에만 배열에 넣습니다.

### 4.4 루트 `.npmrc`

npmjs 는 기본 레지스트리이므로 스코프 지정이 불필요합니다. 파일 자체는 주석으로 남겨두고, CI 발행은 `setup-node@v4` 의 `registry-url` 옵션이 workflow 실행 시점에 임시 `.npmrc` 를 주입해 `NODE_AUTH_TOKEN` 을 사용합니다.

---

## 5. Consumer usage

### Biome

`extends` 는 **배열이어야 합니다** (단일 엔트리라도).

```jsonc
// consumer biome.jsonc
{
  "extends": ["@minjun0219/biome-config"]
}
```

pnpm 심볼릭 링크 이슈로 해석 실패 시 상대 경로 fallback:
```jsonc
{
  "extends": ["./node_modules/@minjun0219/biome-config/biome.jsonc"]
}
```

### TypeScript

```jsonc
{
  "extends": "@minjun0219/tsconfig/tsconfig.json"
}
```

### 소비자 `.npmrc`

npmjs.org 가 기본 레지스트리이므로 아무 설정도 필요하지 않습니다. `pnpm add -D @minjun0219/biome-config @minjun0219/tsconfig @biomejs/biome` 만 실행하면 됩니다.

---

## 6. Out of scope

- **Oxlint / Oxfmt** — Biome 로 통합 (린트+포맷 한 툴)
- **Changesets 자동화** — 초기 규모(패키지 2~3개) 에서는 수동 태그 릴리즈로 충분
- **기존 `@minjunk/eslint-config` 재발행** — 코드는 보존하되 `@minjun0219` 스코프로 통일 후 `private: true`

---

## 7. Verification 결과 & 남은 작업

리네임 + 구조 재구성 커밋 시점(2026-07-11) 로컬 검증 결과:

1. `pnpm install` — 성공 (4 workspace projects, `packages/*/node_modules` 심링크 생성됨)
2. `pnpm -r publish --dry-run` — 통과. tarball 요약:
   - `@minjun0219/biome-config@0.1.0`: `LICENSE`, `README.md`, `biome.jsonc`, `package.json` (4 files, 1.9 kB)
   - `@minjun0219/tsconfig@0.1.0`: `LICENSE`, `README.md`, `package.json`, `tsconfig.json` (4 files, 1.7 kB)
   - `@minjun0219/eslint-config` 은 `private: true` 로 dry-run 대상에서 제외
3. `pnpm biome check .` — 통과 (extends 로 `@minjun0219/biome-config` 해석, 레거시 `packages/eslint-config/` 는 루트 `files.includes` 에서 제외)
4. `pnpm typecheck` (`tsc --showConfig`) — 통과. 베이스 `@minjun0219/tsconfig/tsconfig.json` 이 해석돼 `strict`, `noUncheckedIndexedAccess` 등 병합 확인
5. 저장소에 실제 TS 소스가 없어 루트 `tsconfig.json` 은 `"files": []` 로 두고 extends 해석 검증에만 사용

**진행 상황 & 후속 작업:**

- ✅ **첫 릴리스 태그 발행** — GitHub Actions `publish.yml` 이 release 트리거로 성공 (GHP 대상, `2.0.0`, 2026-07-11).
- ✅ **익명 접근 검증** — GHP 는 401 반환 → 발행 대상을 npmjs 로 전환 결정 (§2.6).
- 🟡 **NPM_TOKEN 시크릿 등록** — 저장소 Settings → Secrets and variables → Actions 에 `NPM_TOKEN` (`automation` 또는 `publish` 권한) 추가 필요. Claude 세션에서 처리 불가.
- 🟡 **npmjs 재발행** — 위 시크릿 등록 후 `publish.yml` 을 `workflow_dispatch` 로 트리거하거나 `2.0.0` 릴리스를 삭제·재생성해 npmjs 로 배포.
- 🟡 **스크래치 리포 소비자 시나리오** (재발행 이후):
   ```bash
   mkdir /tmp/consume && cd /tmp/consume
   pnpm init
   pnpm add -D @minjun0219/biome-config @minjun0219/tsconfig @biomejs/biome
   # biome.jsonc / tsconfig.json 에 extends 설정 후 biome check / tsc --showConfig
   ```
