# TaskFlow Roadmap: Junior → Senior

Work through it in order. For every item, ask yourself:
**"How would I explain this decision in a code review?"**
When a choice is non-obvious, write an ADR in `docs/adr/`.

---

## Phase 0: Starting point ✅ (done)
- [x] Spring Boot backend with the `task` feature as the reference example
- [x] Flyway migration, DTOs, validation, Problem Details errors
- [x] Unit tests (`TaskTest`) and integration tests (`TaskApiIntegrationTest`)
- [x] React + TypeScript board with a typed API client
- [x] docker-compose (PostgreSQL, Redis) and GitHub Actions CI
- [x] ADR 0001: architecture

## Phase 1: Solid foundation
- [ ] Put the project on Git and GitHub; work with branches + pull requests from now on
- [ ] **Projects** feature: a task belongs to a project (new migration `V2__...`, foreign key, `GET /api/projects/{id}/tasks`)
- [ ] Edit a task's title and description (`PUT`), with validation
- [ ] **Users + authentication**: register/login, password hashing (BCrypt), JWT, Spring Security
- [ ] **Authorization**: roles (ADMIN, MEMBER); only project members can see its tasks
- [ ] Assign tasks to users; filter "my tasks"
- [ ] API docs with springdoc-openapi (Swagger UI)
- [ ] Frontend: login page, routing (React Router), auth token handling

## Phase 2: Quality
- [ ] Testcontainers: run integration tests against a real PostgreSQL instead of H2
- [ ] Service unit tests with Mockito; aim for meaningful coverage (JaCoCo report)
- [ ] Frontend tests: Vitest + React Testing Library
- [ ] End-to-end tests with Playwright (login → create task → move it)
- [ ] Static analysis: Checkstyle or Spotless, and fail CI on violations
- [ ] Add frontend tests and coverage to the CI pipeline

## Phase 3: Production-ready
- [ ] Dockerfile for backend (multi-stage) and frontend (nginx)
- [ ] Deploy to a cloud provider (Render, Fly.io or AWS) from CI
- [ ] Structured JSON logging with a request/correlation ID
- [ ] Metrics with Micrometer + Prometheus; a Grafana dashboard
- [ ] Secrets from environment variables, never in the repo
- [ ] Optimistic locking (`@Version`): what happens when two users edit the same task?

## Phase 4: Scale and complexity
- [ ] Real-time board updates (WebSocket / STOMP or Server-Sent Events)
- [ ] Notifications by email using async processing (a queue: RabbitMQ or Kafka)
- [ ] Caching with Redis; explain *what* you cache and *how* you invalidate it
- [ ] Rate limiting on the API
- [ ] Multi-tenancy: each organization sees only its own data
- [ ] Load test with k6 or Gatling; find and fix the first bottleneck (N+1 queries? missing index?)

## Phase 5: Senior habits
- [ ] Write a short design doc *before* a big feature, then compare with what you built
- [ ] Review your own old code and refactor it; write down what you'd do differently
- [ ] Write a blog post or README section explaining one hard problem you solved
