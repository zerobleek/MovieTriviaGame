function generateQuestions(text, answers, correct){

let arr=[]

for(let i=1;i<=40;i++){

arr.push({
q:text + " #" + i,
a:answers,
c:correct
})

}

return arr
}

const QUESTIONS = {

easy: generateQuestions(
"Who directed Titanic?",
["James Cameron","Steven Spielberg","Christopher Nolan","Ridley Scott"],
0
),

medium: generateQuestions(
"What year was Jurassic Park released?",
["1990","1993","1997","2001"],
1
),

hard: generateQuestions(
"Who composed the Star Wars score?",
["Hans Zimmer","John Williams","Danny Elfman","Howard Shore"],
1
),

insane: generateQuestions(
"In which film does Travis Bickle appear?",
["Taxi Driver","Scarface","Heat","The Godfather"],
0
),

kevin: generateQuestions(
"What movie features an exploding building?",
["Die Hard","Speed","Fight Club","All of them"],
3
)

}
