import {
GoogleGenAI
}
from "@google/genai"

import {
agentPrompt
}
from '../prompts/agentPrompt'

const ai=
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
'gemini-2.5-flash',

contents:
`

${agentPrompt}

User:

${input}

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
''
)

.trim()

if(
!clean
){

throw new Error()

}

const parsed=

JSON.parse(
clean
)

return{

title:

parsed.title

||

input,

priority:

Math.max(
1,

Math.min(
10,

parsed.priority
||
5

)

),

urgency:

parsed.urgency

||

'medium',

rescue_mode:

parsed.rescue_mode

??

false,

reason:

parsed.reason

||

'AI analyzed task.',

status:

'pending',

schedule:

parsed.schedule

||

{

start_time:'',
end_time:''

}

}

}

catch{

return{

title:
input,

priority:
5,

urgency:
'medium',

rescue_mode:
false,

reason:
'Fallback analysis.',

status:
'pending',

schedule:{

start_time:'',

end_time:''

}

}

}

}