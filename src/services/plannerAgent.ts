import {
parseTask
}
from './gemini'

export async function plannerAgent(
input:string
){

const task=

await parseTask(
input
)

const urgent=

task.priority>=8

return{

tasks:[

{

title:
task.title,

priority:
task.priority,

status:
task.status

}

],

schedule:[

{

start_time:

urgent

?

'Today 6 PM'

:

'Tomorrow 7 PM',

end_time:

urgent

?

'Today 8 PM'

:

'Tomorrow 8 PM'

}

],

insight:{

suggestion:

urgent

?

'Start immediately.'

:

'You still have time.'

},

rescue_mode:{

enabled:
urgent

}

}

}