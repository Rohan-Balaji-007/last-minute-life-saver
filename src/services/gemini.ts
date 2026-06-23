import { GoogleGenAI }
from "@google/genai"

const ai =
new GoogleGenAI({

apiKey:
import.meta.env.VITE_GEMINI_KEY

})

export async function parseTask(
input:string
){

try{

const response=

await ai.models.generateContent({

model:
"gemini-2.5-flash",

contents:
`
Return ONLY JSON.

Input:
${input}

Output:

{
"title":"",
"priority":0,
"status":"pending",

"schedule":{

"start_time":"",
"end_time":""

}

}

Rules:

priority:
1–10

Never return 0.

status:
always pending.
`

})

const clean=

(response.text||'')

.replace(
/```json/g,
''
)

.replace(
/```/g,
'')

.trim()

if(
!clean
){

throw new Error(
'empty'
)

}

const parsed=

JSON.parse(
clean
)

if(
!parsed.priority
){

parsed.priority=5

}

return parsed

}

catch{

const urgent=

input
.toLowerCase()
.includes(
'interview'
)

||

input
.toLowerCase()
.includes(
'exam'
)

||

input
.toLowerCase()
.includes(
'tomorrow'
)

return{

title:
input,

priority:

urgent

?

9

:

5,

status:
'pending',

schedule:{

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

}

}

}