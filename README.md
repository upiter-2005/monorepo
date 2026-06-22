# Monorepo (Nx Workspace)

## Description

This is an Nx-based monorepo containing:

- **API** — backend built with NestJS
- **Web** — frontend built with React
- **Shared** — common types and utilities

---

## Project Structure

```
apps/
  api/        # NestJS backend
  web/        # React frontend

libs/
  types/      # shared TypeScript types
  ui/         # shared UI components (if any)
  utils/      # shared utilities
```

---

## Getting Started

### 1. Install dependencies

```
npm install
```

---

### 2. Environment setup

Create a `.env` file in `apps/api`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASS=root
DB_NAME=mydb
```

---

### 3. Run the project

#### Backend (NestJS)

```bash
nx serve api
```

API will be available at:
`http://localhost:3000`

---

#### Frontend (React)

```bash
nx serve web
```

Frontend will be available at:
`http://localhost:4200`

---

## Nx Commands

```bash
nx serve api        # run backend
nx serve web        # run frontend

nx build api        # build backend
nx build web        # build frontend

nx lint             # run linter
nx lint api --fix  # fix linter
nx format:write     # auto format code
nx format:check     # check formatting
```

```bash
docker compose down -v // down with cache
docker compose up --build
```

---

## Database

PostgreSQL + TypeORM is used.

### Configuration

Located at:

```
apps/api/src/db.config.ts
```

### Notes

- All sensitive data must be stored in `.env`

---

## Backend Architecture

```
Controller → DTO → Service → Repository → DB
```

### Principles:

- DTOs are used only at the controller level
- All database logic is handled in repositories
- Services contain only business logic
- Exceptions (`HttpException`) are thrown in services

---

## Frontend Architecture

```
pages → hooks → api layer → backend
```

### Principles:

- No direct API calls inside hooks
- All API communication goes through a dedicated `client/` layer
- Shared types are imported from `libs/types`

---

## Authentication

- Use google auth for authentication

---

## Deployment

### Frontend

Deployed via Vercel

### Backend

- Render

---

## Important

- Do not hardcode URLs or credentials
- Always use `.env`
- Follow architecture layering principles
- Avoid unnecessary dependencies
