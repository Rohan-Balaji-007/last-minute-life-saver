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
padding:'40px',
maxWidth:'700px',
margin:'auto'
}}
>

<h1>

🚀 Last Minute Life Saver

</h1>

<br/>

<input

value={input}

placeholder='Type task...'

onChange={
e=>
setInput(
e.target.value
)
}

style={{
padding:'10px',
width:'70%'
}}

/>

<button

onClick={run}

style={{
marginLeft:'10px',
padding:'10px'
}}

>

Generate

</button>

<br/>
<br/>

<h2>

Tasks

</h2>

{

tasks.map(

t=>

<div

key={
t.id
}

style={{

padding:'10px',

border:
'1px solid gray',

marginBottom:
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

{
t.priority
}

</p>

<p>

Status:

{
t.status
}

</p>

</div>

)

}

</div>

)

}

export default App