import {
  useState,
  useEffect
}
from 'react'

import {
  parseTask
}
from './services/gemini'

import {
  getTasks,
  addTask
}
from './services/taskService'

function App() {

  const [
    input,
    setInput
  ] =
  useState('')

  const [
    tasks,
    setTasks
  ] =
  useState<any[]>([])

  async function load() {

    const data =
      await getTasks()

    setTasks(
      data || []
    )

  }

  useEffect(() => {

    load()

  }, [])

  async function run() {

    if (
      !input.trim()
    )
      return

    const parsed =
      await parseTask(
        input
      )

    console.log(
      parsed
    )

    await addTask(
      parsed
    )

    setInput('')

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

         Last Minute Life Saver

      </h1>

      <br />

      <input

        value={input}

        placeholder="Type task..."

        onChange={
          e =>
            setInput(
              e.target.value
            )
        }

        style={{
          padding: '10px',
          width: '70%'
        }}

      />

      <button

        onClick={run}

        style={{
          marginLeft: '10px',
          padding: '10px'
        }}

      >

        Generate

      </button>

      <br />
      <br />
      
      <div

style={{

padding:'20px',

border:'2px solid #ddd',

borderRadius:'12px',

marginBottom:'30px'

}}

>

<h2>

🧠 AI Dashboard

</h2>

<p>

Next Action:

{
tasks.length

?

[...tasks]

.sort(
(a,b)=>
b.priority-a.priority
)

[0]

?.title

:

'No tasks yet'
}

</p>

<p>

Today's Focus:

{

tasks.some(
(t:any)=>
t.priority>=8
)

?

'🔥 Complete urgent tasks'

:

'✅ Stay consistent'

}

</p>

<p>

AI Suggestion:

{

tasks.some(
(t:any)=>
t.priority>=8
)

?

'Start your highest priority task now.'

:

'You have time. Build momentum.'

}

</p>

</div>
      <h2>
        
        Tasks

      </h2>

      {

        tasks.map(

          t => (

            <div

              key={
                t.id
              }

              style={{

                padding: '15px',

                border:
                  '1px solid gray',

                marginBottom:
                  '15px',

                borderRadius:
                  '10px'

              }}

            >

              <h3>

                {
                  t.title
                }

              </h3>

              <p>

                Priority:
                {' '}
                {
                  t.priority
                }

              </p>

              <p>

                Status:
                {' '}
                {
                  t.status
                }

              </p>

              {

                t.priority >= 8

                &&

                <div

                  style={{

                    marginTop: '10px',

                    padding: '10px',

                    background: '#fff4e5',

                    borderRadius: '8px'

                  }}

                >

                  ⚠ Rescue Mode Activated

                  <br />

                  Focus on this before lower priority tasks.

                </div>

              }

            </div>

          )

        )

      }

    </div>

  )

}

export default App