export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'

export interface Task {
  id: number
  title: string
  description: string | null
  status: TaskStatus
  createdAt: string
  updatedAt: string
}

interface Page<T> {
  content: T[]
  page: { size: number; number: number; totalElements: number; totalPages: number }
}

/** Error shape returned by the backend (RFC 9457 Problem Details). */
export class ApiError extends Error {
  readonly status: number
  readonly errors?: Record<string, string>

  constructor(status: number, detail: string, errors?: Record<string, string>) {
    super(detail)
    this.status = status
    this.errors = errors
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!response.ok) {
    const problem = await response.json().catch(() => ({}))
    throw new ApiError(response.status, problem.detail ?? response.statusText, problem.errors)
  }
  return response.status === 204 ? (undefined as T) : response.json()
}

export const tasksApi = {
  list: () => request<Page<Task>>('/api/tasks?size=100&sort=createdAt').then((p) => p.content),
  create: (title: string, description?: string) =>
    request<Task>('/api/tasks', { method: 'POST', body: JSON.stringify({ title, description }) }),
  changeStatus: (id: number, status: TaskStatus) =>
    request<Task>(`/api/tasks/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  remove: (id: number) => request<void>(`/api/tasks/${id}`, { method: 'DELETE' }),
}
