import { useEffect, useState, type FormEvent } from 'react'
import { tasksApi, type Task, type TaskStatus } from './api/tasks'
import './App.css'

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: 'TODO', label: 'To do' },
  { status: 'IN_PROGRESS', label: 'In progress' },
  { status: 'DONE', label: 'Done' },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    tasksApi.list().then(setTasks).catch((e: Error) => setError(e.message))
  }, [])

  async function run(action: () => Promise<void>) {
    setError(null)
    try {
      await action()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  function addTask(event: FormEvent) {
    event.preventDefault()
    run(async () => {
      const created = await tasksApi.create(title.trim())
      setTasks((current) => [...current, created])
      setTitle('')
    })
  }

  function move(task: Task, status: TaskStatus) {
    run(async () => {
      const updated = await tasksApi.changeStatus(task.id, status)
      setTasks((current) => current.map((t) => (t.id === updated.id ? updated : t)))
    })
  }

  function remove(task: Task) {
    run(async () => {
      await tasksApi.remove(task.id)
      setTasks((current) => current.filter((t) => t.id !== task.id))
    })
  }

  return (
    <main>
      <h1>TaskFlow</h1>

      <form onSubmit={addTask} className="new-task">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What needs to be done?" />
        <button type="submit" disabled={!title.trim()}>
          Add
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <section className="board">
        {COLUMNS.map((column) => (
          <div key={column.status} className="column">
            <h2>{column.label}</h2>
            {tasks
              .filter((task) => task.status === column.status)
              .map((task) => (
                <article key={task.id} className="card">
                  <span>{task.title}</span>
                  <div className="actions">
                    {COLUMNS.filter((c) => c.status !== task.status).map((c) => (
                      <button key={c.status} onClick={() => move(task, c.status)}>
                        → {c.label}
                      </button>
                    ))}
                    <button className="danger" onClick={() => remove(task)}>
                      Delete
                    </button>
                  </div>
                </article>
              ))}
          </div>
        ))}
      </section>
    </main>
  )
}

export default App
