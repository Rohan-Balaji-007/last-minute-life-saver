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
title:string
){

await supabase
.from('tasks')
.insert([
{

title:title,

status:'pending',

priority:5

}

])

}