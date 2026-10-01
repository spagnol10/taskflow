# TaskFlow

A team task-management app (small Jira/Trello clone), built as a study project
to practice senior-level engineering with Spring Boot and React.

## Stack
| Layer    | Tech |
|----------|------|
| Backend  | Java 21, Spring Boot 4.1, Spring Data JPA, Bean Validation, Flyway, Actuator |
| Database | H2 (default, in-memory) or PostgreSQL 17 (`postgres` profile) |
| Frontend | React 19, TypeScript, Vite |
| Infra    | Docker Compose, GitHub Actions |

## Running locally

**Backend** (http://localhost:8080)
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend** (http://localhost:5173, proxies `/api` to the backend)
```bash
cd frontend
npm install
npm run dev
```

**With PostgreSQL** (requires Docker)
```bash
docker compose up -d
cd backend
SPRING_PROFILES_ACTIVE=postgres ./mvnw spring-boot:run
```

## Tests
```bash
cd backend && ./mvnw verify     # unit + integration tests
cd frontend && npm run lint && npm run build
```

## API
| Method | Path | Description |
|--------|------|-------------|
| GET    | `/api/tasks?status=&page=&size=&sort=` | List tasks (paginated) |
| GET    | `/api/tasks/{id}` | Get one task |
| POST   | `/api/tasks` | Create `{ "title", "description" }` |
| PATCH  | `/api/tasks/{id}/status` | Change status `{ "status": "TODO" \| "IN_PROGRESS" \| "DONE" }` |
| DELETE | `/api/tasks/{id}` | Delete |
| GET    | `/actuator/health` | Health check |

Errors are returned as [Problem Details](https://www.rfc-editor.org/rfc/rfc9457).

## Project layout
```
backend/src/main/java/com/taskflow/
  task/            feature: entity, repository, service, controller, dto/
  common/          cross-cutting: error handling, web config
backend/src/main/resources/db/migration/   Flyway SQL migrations
frontend/src/api/  typed API client
docs/adr/          architecture decision records
```

See [ROADMAP.md](ROADMAP.md) for what to build next.
