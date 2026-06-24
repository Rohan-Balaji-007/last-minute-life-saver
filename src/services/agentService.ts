import {
parseTask
}
from './gemini'

import {
buildContext
}
from './contextAgent'

function cleanSchedule(
schedule:any
){

return{

start_time:

schedule?.start_time

||

'AI deciding',

end_time:

schedule?.end_time

||

'',

reason:

schedule?.reason

||

'AI generated schedule'

}

}

export async function runAgent(
input:string,
existingTasks:any[]=[]
){

const context=

buildContext(
existingTasks
)

console.log(
'Context:',
context
)

const task=

await parseTask(
input)

const schedule=

cleanSchedule(
task.schedule
)

return{

task:{

title:
task.title,

priority:
task.priority,

status:
task.status,

urgency:
task.urgency,

reason:
task.reason,

schedule

},

schedule,

rescue_mode:{

enabled:

task.rescue_mode

},

context

}

}