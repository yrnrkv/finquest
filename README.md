# FinQuest

FinQuest is a gamified financial-literacy learning platform prototype. It demonstrates student quests, teacher workflows, adaptive-learning profile UI, learning materials, and a certificate experience in a polished Next.js application.

> This repository is a demonstrable prototype. Authentication, persistence, AI adaptation, and Polygon minting currently use mock/demo implementations. The database schema and API boundaries are included to make the next production integration explicit.

## Highlights

- Student dashboard with module progress, quests, assignments, learning resources, and financial-health scoring
- Teacher dashboard with class selection, assignments, grading, feedback, and class analytics
- Reusable shadcn/ui-style primitives built on Radix UI and Tailwind CSS v4
- Route-handler boundaries for quest submissions, grading, and certificate minting
- Responsive dark-theme design system with accessible interactive components

## Technology

- Next.js 16 and React 19
- TypeScript
- Tailwind CSS v4
- Radix UI / shadcn/ui patterns
- React Context for demo authentication
- pnpm for dependency management

## Repository layout

```text
app/                    Next.js routes, layouts, and API handlers
  api/                  Route handlers for domain operations
  dashboard/            Student dashboard route
  learning/             Learning resources route
  login/                Authentication route
  quest/[moduleId]/     Quest route
  teacher-dashboard/    Teacher dashboard route
components/
  certificate/          Certificate presentation
  journey/              Completion summary
  learning/             Learning material views and players
  quest/                Quest interaction and results
  student/              Student-facing features
  teacher/              Teacher-facing features
  ui/                   Reusable UI primitives
docs/                   Architecture and workflow notes
hooks/                  Shared React hooks
lib/                    Types, mock data, and authentication context
public/                 Static assets
scripts/                Database schema and maintenance scripts
```

## Getting started

Requirements: Node.js 18+ and pnpm.

```bash
git clone https://github.com/yrnrkv/finquest.git
cd finquest
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Student | `alex@school.edu` | `password` |
| Teacher | `mrs.smith@school.edu` | `password` |

## Quality checks

```bash
pnpm typecheck
pnpm lint
pnpm build
```

## API boundaries

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/api/quest/submit` | Record a quest attempt |
| POST | `/api/grade/submit` | Record teacher feedback and grading |
| POST | `/api/certificate/mint` | Demo certificate issuance flow |

The current handlers return mock records. Production work should add request validation, authorization, durable persistence, and observability before connecting external services.

## Production roadmap

1. Replace mock authentication with secure, server-managed sessions.
2. Add a database adapter and migrations for the schema in `scripts/schema.sql`.
3. Move quest, grading, and certificate data behind authenticated service functions.
4. Integrate a real AI adaptation provider with evaluation and safety constraints.
5. Replace demo certificate hashes with a tested Polygon contract integration.
6. Add unit, integration, and end-to-end coverage in CI.

## Documentation

- [Project summary](docs/PROJECT_SUMMARY.md)
- [Workflow guide](docs/WORKFLOW_GUIDE.md)
- [Classwork integration notes](docs/CLASSWORK_INTEGRATION.md)
- [Database schema](scripts/schema.sql)

## License

MIT
