import { useState, useEffect } from 'react'

import {
  getTasks,
  addTask
} from './services/taskService'

function App() {

  const [task, setTask] =
    useState('')

  const [tasks, setTasks] =
    useState<any[]>([])

  async function load() {

    const data =
      await getTasks()

    setTasks(data || [])

  }

  useEffect(() => {

    load()

  }, [])

  async function save() {

    if (!task.trim())
      return

    await addTask(task)

    setTask('')

    await load()

  }

  return (

    <div
      style={{
        padding: '40px',
        maxWidth: '700px',
        margin: 'auto'
      }}
    >

      <h1>
        🚀 Last Minute Life Saver
      </h1>

      <p>
        Enter your task below
      </p>

      <div
        style={{
          display: 'flex',
          gap: '10px'
        }}
      >

        <input

          value={task}

          placeholder="Example: Submit assignment Friday"

          onChange={
            e =>
              setTask(
                e.target.value
              )
          }

          style={{
            padding: '10px',
            flex: 1
          }}

        />

        <button

          onClick={save}

          style={{
            padding: '10px 20px'
          }}

        >

          Add Task

        </button>

      </div>

      <br />

      <h2>
        Tasks
      </h2>

      {

        tasks.length === 0

          ?

          <p>
            No tasks yet
          </p>

          :

          tasks.map(

            t => (

              <div

                key={t.id}

                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  marginBottom: '12px',
                  borderRadius: '10px'
                }}

              >

                <h3>

                  {t.title}

                </h3>

                <p>

                  Priority:
                  {' '}
                  {t.priority}

                </p>

                <p>

                  Status:
                  {' '}
                  {t.status}

                </p>

              </div>

            )

          )

      }

    </div>

  )

}

export default App