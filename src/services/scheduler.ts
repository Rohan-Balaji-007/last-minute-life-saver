import { parseTask }
from './gemini'

export async function createSchedule(
task:any
){

const result=

await parseTask(

`

Generate schedule.

Task:

${JSON.stringify(task)}

Output:

{

"start_time":"",

"end_time":"",

"reason":""

}

`

)

return result

}