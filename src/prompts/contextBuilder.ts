export function contextBuilder(
tasks:any[]
){

const active=

tasks

.slice(
0,
5
)

.map(

t=>

`${t.title}
(priority:
${t.priority})`

)

.join(
'\n'
)

return`

Recent Tasks:

${active}

Current Goal:

Help user finish work.

Use context.

`

}