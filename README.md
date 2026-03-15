# ai-tools-directory

Next.js App Router + TypeScript + Tailwind로 만든 AI 툴 디렉토리입니다.

## Public

- `/`
- `/tools`
- `/tools/[slug]`
- `/submit`

Public 사이트는 `lib/tools-repository.ts`를 통해 published 상태의 도구만 읽습니다.
`DATABASE_URL`이 없거나 DB 연결에 실패하면 `data/tools.ts`, `data/extra-tools-100.ts`의 mock data로 안전하게 fallback 합니다.

## Admin Setup

숨겨진 관리자 라우트는 아래 경로를 사용합니다.

- `/internal-admin/login`
- `/internal-admin`
- `/internal-admin/tools`
- `/internal-admin/tools/new`
- `/internal-admin/tools/[id]/edit`

관리자 영역은 public UI 어디에서도 링크하지 않으며, `middleware.ts`에서 로그인 없이 접근할 수 없도록 보호합니다.

필수 환경변수:

- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

`.env.example`를 참고해 `.env.local`에 값을 넣어 주세요.

## Database

기본 schema는 [db/schema.sql](/C:/Users/fabre/OneDrive/Desktop/#작업중#/Codex/db/schema.sql)에 있습니다.

Supabase Postgres 같은 hosted Postgres를 사용할 때도 `DATABASE_URL`만 맞추면 됩니다.

## Seed

기존 mock data를 DB에 넣으려면 아래 명령을 사용합니다.

```bash
npm run seed:tools
```

이 스크립트는 `db/schema.sql`을 먼저 적용하고, `slug` 기준 upsert로 데이터를 채웁니다.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run seed:tools
```
