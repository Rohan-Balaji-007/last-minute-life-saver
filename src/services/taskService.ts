import {
supabase
}
from './supabase'

export async function getTasks(){

const {
data
}
=
await supabase
.from('tasks')
.select('*')

return data

}

export async function addTask(
task:any
){

await supabase

.from(
'tasks'
)

.insert([

{

title:
task.title,

priority:
task.priority,

status:
task.status

}

])

}