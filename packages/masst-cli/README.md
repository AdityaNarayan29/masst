# @masst/cli

SaaS Starter Kit Generator - scaffold production-ready monorepos in seconds.

## Installation

```bash
npm install -g @masst/cli
# or
pnpm add -g @masst/cli
```

## Quick Start

```bash
# Create a new SaaS project
mst init my-saas-app

# Start development (one command!)
cd my-saas-app
mst dev
```

That's it! Your app is running at:

- **Web**: http://localhost:3000
- **API**: http://localhost:4000
- **Docs**: http://localhost:4000/api/docs

Demo credentials: `demo@example.com` / `demo123`

## What You Get

```
my-saas-app/
├── apps/
│   ├── web/                 # Next.js 15 + @masst/ui
│   │   ├── app/
│   │   │   ├── (auth)/      # Login & Signup pages
│   │   │   └── dashboard/   # Protected dashboard with sidebar
│   │   └── components/      # AppSidebar, LoginForm, etc.
│   │
│   └── api/                 # NestJS Backend
│       └── src/
│           ├── auth/        # JWT authentication
│           ├── users/       # User management
│           ├── tenants/     # Multi-tenant support
│           └── health/      # Health checks
│
├── packages/
│   └── database/            # Prisma + PostgreSQL
│       └── prisma/
│           └── schema.prisma  # Multi-tenant schema
│
├── docker-compose.yml       # PostgreSQL + Redis
├── turbo.json              # Turborepo config
└── .github/workflows/      # CI/CD pipelines
```

## Commands

### `mst init`

Create a new SaaS project.

```bash
# Interactive mode
mst init

# Non-interactive mode
mst init my-app -y

# With options
mst init my-app -y --db my_database --no-redis
```

| Option           | Description                |
| ---------------- | -------------------------- |
| `-y, --yes`      | Skip prompts, use defaults |
| `--db <name>`    | Database name              |
| `--no-redis`     | Exclude Redis              |
| `--skip-install` | Skip `pnpm install`        |
| `--skip-git`     | Skip git initialization    |

### `mst dev`

Start the development environment with one command.

```bash
# Full start (Docker + DB + servers)
mst dev

# Using external database
mst dev --no-docker

# Force re-seed demo data
mst dev --seed

# Reset database completely
mst dev --fresh
```

| Option        | Description                                  |
| ------------- | -------------------------------------------- |
| `--no-docker` | Skip Docker, use external database           |
| `--seed`      | Force database seeding (even if data exists) |
| `--fresh`     | Reset database and seed fresh data           |

**Smart Seeding Behavior:**

- First run: auto-seeds demo data
- Subsequent runs: preserves your data
- Use `--seed` to force re-seeding
- Use `--fresh` to completely reset

### `mst build`

Build all applications for production.

```bash
mst build
```

### `mst deploy`

Deploy to production.

```bash
# Build Docker images
mst deploy

# Deploy to Railway
mst deploy --platform railway

# Deploy to Fly.io
mst deploy --platform fly

# Deploy to Render
mst deploy --platform render

# Custom image tag
mst deploy --tag v1.0.0
```

| Option                  | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| `--platform <platform>` | Deployment target: `docker`, `railway`, `fly`, `render` |
| `--tag <tag>`           | Docker image tag (default: `latest`)                    |

### `mst stop`

Stop Docker containers.

```bash
mst stop
```

### `mst db`

Database management commands.

```bash
# Open Prisma Studio (visual database browser)
mst db studio

# Create a new migration
mst db migrate --name add_users

# Deploy migrations (production)
mst db migrate --deploy

# Reset database (drops all data)
mst db reset

# Push schema without migrations
mst db push

# Seed database
mst db seed
mst db seed --force  # Force reseed
```

| Subcommand | Description                                 |
| ---------- | ------------------------------------------- |
| `studio`   | Open Prisma Studio at http://localhost:5555 |
| `migrate`  | Create or deploy migrations                 |
| `reset`    | Drop and recreate database                  |
| `push`     | Push schema changes (no migration)          |
| `seed`     | Seed with demo data                         |

### `mst logs`

View Docker container logs.

```bash
# View all logs
mst logs

# Follow logs (like tail -f)
mst logs -f

# View specific service
mst logs --service postgres

# Last 50 lines
mst logs -n 50
```

| Option               | Description                         |
| -------------------- | ----------------------------------- |
| `-f, --follow`       | Follow log output                   |
| `--service <name>`   | Filter by service (postgres, redis) |
| `-n, --tail <lines>` | Number of lines (default: 100)      |

### `mst add`

Add features to your project.

```bash
# Add Stripe billing
mst add stripe

# Add email support (Resend)
mst add emails

# Add analytics (PostHog)
mst add analytics
```

| Feature     | What it adds                             |
| ----------- | ---------------------------------------- |
| `stripe`    | Stripe SDK, billing types, webhook setup |
| `emails`    | Resend, React Email components           |
| `analytics` | PostHog, tracking provider               |

### `mst upgrade`

Upgrade @masst packages to latest versions.

```bash
# Check for updates
mst upgrade --check

# Upgrade all @masst packages
mst upgrade
```

### `mst i` / `mst install`

Install packages with auto `@masst/` scoping.

```bash
# Install @masst/ui
mst i ui

# Install without scope
mst i lodash --skip-scope

# Force specific package manager
mst i ui --pm npm
```

## Development Workflow

### Daily Development

```bash
# Start everything
mst dev

# Stop when done
mst stop
```

### Using External Database

```bash
# Set DATABASE_URL in .env
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Start without Docker
mst dev --no-docker
```

### Fresh Start

```bash
# Reset database and reseed
mst dev --fresh
```

### Production

```bash
# Build
mst build

# Deploy
mst deploy --platform railway
```

## Tech Stack

- **Monorepo**: Turborepo
- **Frontend**: Next.js 15, React 19, @masst/ui
- **Backend**: NestJS, Prisma
- **Database**: PostgreSQL + Redis
- **Auth**: NextAuth.js + JWT
- **CLI**: Commander.js, Chalk, @clack/prompts

## Requirements

- Node.js >= 18
- pnpm >= 9
- Docker (for local development)

## License

MIT
