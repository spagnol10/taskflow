# ADR 0001: Package by feature, layered inside each feature

- **Status:** Accepted
- **Date:** 2026-10-01

## Context
The backend will grow to several domains (tasks, projects, users, teams, notifications).
Packaging by technical layer (`controllers/`, `services/`, `repositories/`) spreads one
feature across the whole codebase and makes it hard to see boundaries.

## Decision
- One package per feature (`com.taskflow.task`, later `com.taskflow.project`...).
- Inside each feature: `Controller` → `Service` → `Repository`, plus the entity and `dto/`.
- Controllers only speak DTOs (Java records). Entities never leave the service layer.
- Business rules live in the entity (e.g. `Task.changeStatus`), not in controllers.
- Cross-cutting code (error handling, config) lives in `com.taskflow.common`.
- The database schema is owned by Flyway migrations; Hibernate only validates it.
- All API errors use RFC 9457 Problem Details (`GlobalExceptionHandler`).

## Consequences
- A new feature is added by copying the `task` package structure.
- Features should not reach into each other's repositories; call the other feature's service instead.
- If boundaries get strong enough, a feature can later be split into a module or service.
