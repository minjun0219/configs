# AGENTS.md

이 문서는 이 저장소에서 작업하는 모든 코딩 에이전트를 위한 공통 참조 문서입니다. Claude Code 전용 지침은 [`CLAUDE.md`](./CLAUDE.md) 에 있으며, 공통 내용은 이 문서를 우선합니다.

---

## 1. Overview

pnpm 기반 monorepo 로 공용 개발 설정(Biome, TypeScript) 을 개별 패키지로 관리하고 GitHub Packages 에 발행합니다.

- **Owner**: `minjun0219`
- **Repo**: `configs` (구 `eslint-config` 에서 리네임 완료)
- **패키지 매니저**: pnpm workspaces (`pnpm-workspace.yaml`, `pnpm-lock.yaml`)
- **발행 레지스트리**: GitHub Packages (`https://npm.pkg.github.com`)
- **가시성**: 프라이빗 (퍼블릭 전환은 후속 작업 — §7 참조)

기존 Airbnb 기반 ESLint 7 / TypeScript 3.9 설정은 `packages/eslint-config/` 로 이관되었고 `private: true` 로 발행이 차단됐습니다.

---

## 2. Direction (완료)

원래 "다음 세션 실행 대상" 이었던 항목들. 아래 상태는 실제 리포 구조와 일치합니다.

### 2.1 스코프 통일 — 완료

- `@minjunk/*` → **`@minjun0219/*`**
- 기존 `@minjunk` 스코프는 GitHub 오너(`minjun0219`) 와 불일치해 GitHub Packages 발행 조건과 어긋납니다. GitHub Packages 는 npm 스코프가 오너 이름(사용자/조직) 과 일치해야 합니다.

### 2.2 라이선스 — 완료 / 리포 공개 — 미완

- 루트 `LICENSE` (MIT) 추가됨
- 프라이빗 → 퍼블릭 전환은 GitHub 저장소 설정 액션이라 코드에서 처리 불가. §7 후속 작업 참조

### 2.3 툴링 전환 — 완료

- yarn v1 → **pnpm workspaces**
- `yarn.lock` 삭제, `pnpm-workspace.yaml` + `pnpm-lock.yaml` 도입

### 2.4 패키지 구성 — 완료

| 패키지 | 역할 | 비고 |
| --- | --- | --- |
| `@minjun0219/biome-config` | Biome 공용 설정 (린트 + 포맷) | `exports: {".": "./biome.jsonc"}`, peer `@biomejs/biome >= 2.5.0` (Biome 2.5 부터 `rules.preset` 문법 요구) |
| `@minjun0219/tsconfig` | TypeScript 베이스 tsconfig | `@tsconfig/node20` 스타일 — `main`/`exports` 없이 `tsconfig.json` 을 패키지 루트에 배치. 소비자는 `extends: "@minjun0219/tsconfig/tsconfig.json"` 로 명시 경로 참조 |
| `@minjun0219/eslint-config` | 기존 ESLint 설정 (**deprecated**) | `packages/eslint-config/` 로 이동, `private: true` 로 두어 신규 발행 차단. README 에 deprecation 배너 추가 |

### 2.5 배포 정책 — 완료

- **GitHub Packages 만** 사용 (npmjs.org 발행 안 함)
- 각 발행 패키지 `publishConfig`:
  ```json
  {
    "publishConfig": {
      "registry": "https://npm.pkg.github.com",
      "access": "public"
    }
  }
  ```
- 각 패키지에 `repository.url` + `repository.directory` 필수 — 없으면 GitHub Packages 페이지에서 소스 링크가 orphan 상태가 됩니다.

### 2.6 소비 방식 & 남은 검증 사항

리포 퍼블릭 전환의 목적은 "**토큰 없이 참조**" 입니다. 다만 GitHub Packages(npm) 는 오랫동안 퍼블릭 패키지라도 install 시 인증을 요구해왔습니다.

**후속 세션 첫 검증 단계**: 발행 이후 인증 없는 셸에서 다음 명령이 정상 응답하는지 확인.
```bash
npm view @minjun0219/tsconfig --registry=https://npm.pkg.github.com
```

- 성공 → 계획대로 진행
- 실패 (401/403) → 방향 재검토:
  - 옵션 A: 리포만 퍼블릭, 소비자는 설정 파일을 복사해 사용
  - 옵션 B: npmjs.org 로 발행 대상 변경

---

## 3. Repository layout

```
configs/
├── package.json                     private: true, name "@minjun0219/configs"
├── pnpm-workspace.yaml              packages: [packages/*]
├── .npmrc                           @minjun0219:registry=https://npm.pkg.github.com
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
    "registry": "https://npm.pkg.github.com",
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

```
@minjun0219:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

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

### 소비자 `.npmrc` (인증이 필요한 경우)

```
@minjun0219:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

앞서 검증한 익명 접근 결과에 따라 인증 라인은 생략될 수 있습니다.

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

**후속 작업 (이 리포에서 처리 불가):**

- **리포 퍼블릭 전환** — GitHub 저장소 설정에서 직접 전환 필요
- **익명 접근 검증** (§2.6) — `npm view @minjun0219/tsconfig --registry=https://npm.pkg.github.com` 응답 확인. 401/403 이면 §2.6 옵션 A/B 재검토
- **스크래치 리포 소비자 시나리오**:
   ```bash
   mkdir /tmp/consume && cd /tmp/consume
   echo '@minjun0219:registry=https://npm.pkg.github.com' > .npmrc
   pnpm init
   pnpm add -D @minjun0219/biome-config @minjun0219/tsconfig @biomejs/biome
   # biome.jsonc / tsconfig.json 에 extends 설정 후 biome check / tsc --showConfig
   ```
- **첫 릴리스 태그 발행** — GitHub Actions `publish.yml` 이 `GITHUB_TOKEN` + `packages: write` 로 실제 발행 성공하는지 확인
