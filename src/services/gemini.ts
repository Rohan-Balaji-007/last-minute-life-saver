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
"gemini-2.5-flash-lite",

contents:
`
Return ONLY JSON.

No markdown.
No explanation.

Extract task.

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
1–3 = low

4–7 = medium

8–10 = urgent

Never return 0.

status:
always pending.

If task contains a deadline:

create realistic schedule.

Prefer:

60–90 minute blocks.

If no deadline:

return empty schedule.
`

})

if(
!response.text
){

throw new Error(
'Empty response'
)

}

const clean=

response.text

.replace(
/```json/g,
''
)

.replace(
/```/g,
''
)

.trim()

return JSON.parse(
clean
)

}

catch(error){

console.log(
error
)

return{

title:
input,

priority:
5,

status:
'pending',

schedule:{

start_time:'',

end_time:''

}

}

}

}