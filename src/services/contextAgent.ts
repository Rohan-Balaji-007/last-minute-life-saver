export function buildContext(
tasks:any[]
){

const recent=

tasks

.slice(
0,
3
)

.map(

(t:any)=>

`${t.title}
(priority:${t.priority})`

)

.join(
', '
)

return recent

}