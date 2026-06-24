import { useState, useEffect } from 'react'

import { runAgent } from './services/agentService'

import {
getTasks,
addTask,
deleteTask
}
from './services/taskService'

function App(){

const [input,setInput]=
useState('')

const [tasks,setTasks]=
useState<any[]>([])

const [deletingId,setDeletingId]=
useState<string|null>(null)

const [loading,setLoading]=
useState(false)

async function load(){

const data=

await getTasks()

setTasks(
data||[]
)

}

useEffect(()=>{

load()

},[])

async function run(){

if(
!input.trim()
)
return

setLoading(
true
)

try{

const result=

await runAgent(
input,
tasks
)

await addTask(
result.task
)

setInput('')

await load()

}

finally{

setLoading(
false
)

}

}

async function remove(
id:string
){

setDeletingId(
id
)

await deleteTask(
id
)

await load()

setDeletingId(
null
)

}

const urgent=

tasks.some(
(t:any)=>
t.priority>=8
)

const nextTask=

tasks.length

?

[...tasks]

.sort(
(a:any,b:any)=>

b.priority-a.priority

)

[0]

?.title

:

'No tasks yet'

return(

<div

style={{

padding:'40px',

maxWidth:'760px',

margin:'auto'

}}

>

<h1>

🧠 Last Minute Life Saver

<span

style={{

fontSize:'14px',

marginLeft:'12px',

padding:'5px 10px',

background:'#eef7ff',

borderRadius:'20px'

}}

>

AI MODE

</span>

</h1>

<p>

AI that turns panic into action

</p>

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

padding:'12px',

width:'70%',

borderRadius:'10px'

}}

/>

<button

onClick={run}

disabled={loading}

style={{

marginLeft:'10px',

padding:'12px',

borderRadius:'10px'

}}

>

{

loading

?

'🧠 Thinking...'

:

'Generate'

}

</button>

<br/>
<br/>

<div

style={{

padding:'20px',

border:'2px solid #ddd',

borderRadius:'14px',

marginBottom:'30px'

}}

>

<h2>

🧠 AI Dashboard

</h2>

<p>

<b>

Next Action

</b>

<br/>

{
nextTask
}

</p>

<br/>

<p>

{

urgent

?

'🔥 Complete urgent tasks'

:

'✅ Stay consistent'

}

</p>

</div>

<h2>

Tasks

</h2>

{

tasks.length===0

?

<div>

✨ No tasks yet

</div>

:

tasks.map(

(t:any)=>(

<div

key={
t.id
}

style={{

padding:'16px',

border:'1px solid #ddd',

borderRadius:'12px',

marginBottom:'16px'

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

t.schedule

&&

<>

<p>

🕒 Suggested Time:
{' '}

{

t.schedule?.start_time

||

'AI deciding'

}

</p>

{

t.schedule?.reason

&&

<p>

🧠

{
t.schedule.reason
}

</p>

}

</>

}

{

t.priority>=8

&&

<div

style={{

padding:'10px',

background:'#fff4e5',

borderRadius:'8px'

}}

>

⚠ Rescue Mode

</div>

}

<button

onClick={()=>

remove(
t.id
)

}

disabled={
deletingId===t.id
}

style={{

marginTop:'10px',

padding:'10px',

border:'none',

borderRadius:'10px',

background:

deletingId===t.id

?

'#777'

:

'#111',

color:'white'

}}

>

{

deletingId===t.id

?

'⏳ Removing...'

:

'🗑 Remove'

}

</button>

</div>

)

)

}

</div>

)

}

export default App