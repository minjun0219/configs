# CLAUDE.md

이 문서는 Claude Code 전용 참조 문서입니다. 프로젝트 공통 지침은 [`AGENTS.md`](./AGENTS.md) 를 우선 참조하세요. 이 문서는 Claude 관점의 최소 지침만 담습니다.

## 브랜치 컨벤션

- 작업 브랜치: `claude/<slug>` 패턴
- `main` 브랜치에 직접 커밋 금지 — 항상 브랜치를 만들고 PR 을 통해 병합
- 각 세션의 지정 브랜치가 별도로 안내되면 그 브랜치를 우선 사용

## Pull Request

- 푸시 후 draft PR 자동 생성이 기본 (열린 PR 이 없을 때)
- 기준 저장소 URL: `https://github.com/minjun0219/configs`
- 커밋 메시지는 이 저장소의 기존 커밋 스타일을 따를 것 (Korean 헤더, 필요 시 한/영 혼용)

## 도구 사용

- 파일 조회/수정: `Read` / `Edit` / `Grep` 우선 (Bash 로 `cat`/`grep`/`sed` 사용 금지)
- 대규모 코드베이스 탐색: `Explore` 서브에이전트 사용
- 파일 생성: `Write` — 기존 파일 편집을 우선하되, 새 파일이 필요할 때만

## 다음 세션 시작 시 확인 순서

1. `AGENTS.md` 정독 — 완료된 방향과 남은 후속 작업(§7) 을 파악
2. `pnpm install && pnpm biome check . && pnpm typecheck && pnpm publish:dry` 로 로컬 상태 재확인

프로젝트 상태·목표·설정 세부는 `AGENTS.md` 를 소스로 삼고 이 문서에는 중복 기재하지 않습니다.
