export function reflect(

priority:number,

schedule:any

){

if(
priority>=8
){

return{

...schedule,

start_time:
'Today 8 PM',

reason:
'Urgent tasks should start earlier'

}

}

return{

...schedule,

reason:
'Current schedule looks fine'

}

}