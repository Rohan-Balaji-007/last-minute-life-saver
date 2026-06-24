import {
supabase
}
from './supabase'

export async function getTasks(){

const{

data,
error

}

=

await supabase

.from(
'tasks'
)

.select('*')

.order(
'id',
{
ascending:false
})

if(
error
){

console.log(
'GET ERROR',
error
)

return[]

}

return data

}

export async function addTask(
task:any
){

const cleanTask={

title:
task.title,

priority:
task.priority,

status:
task.status,

schedule:
task.schedule

||

{

start_time:'',
end_time:''

}

}

const{

error

}

=

await supabase

.from(
'tasks'
)

.insert([
cleanTask
])

if(
error
){

console.log(
'ADD ERROR',
error
)

}

}

export async function deleteTask(
id:string
){

console.log(
'Deleting',
id
)

const{

error

}

=

await supabase

.from(
'tasks'
)

.delete()

.eq(
'id',
id)

if(
error
){

console.log(
'DELETE ERROR',
error
)

}

}

export async function clearTasks(){

const{

error

}

=

await supabase

.from(
'tasks'
)

.delete()

.neq(
'id',
'')

if(
error
){

console.log(
'CLEAR ERROR',
error
)

}

}