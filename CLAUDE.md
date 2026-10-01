# TaskFlow

Projeto de estudo: o desenvolvedor (júnior, full stack Java Spring + React) está usando
este app para evoluir para o nível sênior. **O objetivo é o aprendizado dele, não só o código pronto.**

## Como colaborar
- Responda em português.
- Por padrão, **guie em vez de escrever o código por ele**: explique o conceito, dê dicas
  progressivas e revise o que ele fez. Escreva a implementação completa só quando ele pedir
  explicitamente ("faz pra mim", "me mostra o código").
- Sempre explique o **porquê** de uma decisão e os trade-offs, não só o "como".
- O roteiro de evolução está em `ROADMAP.md`. O diário de aprendizado fica em `docs/journal/`.
- Use `/mentor` para sessões de mentoria e o agente `senior-reviewer` para code review.

## Stack
- Backend: Java 21, Spring Boot 4.1, Spring Data JPA, Bean Validation, Flyway, Actuator
- Frontend: React 19, TypeScript, Vite
- Banco: H2 em memória (padrão) ou PostgreSQL (perfil `postgres`, via `docker-compose.yml`)
- Java, Maven e Node estão instalados em `~/.local/devtools` (sem Homebrew)

## Comandos
- Testes do backend: `cd backend && ./mvnw verify`
- Rodar backend: `cd backend && ./mvnw spring-boot:run` (porta 8080)
- Frontend: `cd frontend && npm run dev` (porta 5173, faz proxy de `/api` para o backend)
- Lint/build do frontend: `cd frontend && npm run lint && npm run build`

## Padrões de arquitetura (ver `docs/adr/0001-layered-architecture-by-feature.md`)
- Um pacote por funcionalidade (`com.taskflow.task`); a feature `task` é o **exemplo de referência**.
- Controller → Service → Repository. Controllers só usam DTOs (records), nunca entidades.
- Regras de negócio ficam na entidade (ex.: `Task.changeStatus`).
- O schema é dono do Flyway (`db/migration/V{n}__descricao.sql`); Hibernate só valida.
  Nunca edite uma migration já aplicada: crie uma nova.
- Erros seguem Problem Details (RFC 9457) via `common/error/GlobalExceptionHandler`.
- Toda funcionalidade nova vem com teste unitário (domínio) e teste de integração (API).
- Frontend: chamadas HTTP só pelo cliente tipado em `frontend/src/api/`.
