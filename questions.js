
const QUESTIONS = {
easy: Array.from({length:40}, (_,i)=>({
q:`Easy Question ${i+1}: Who directed Titanic?`,
a:["James Cameron","Steven Spielberg","Ridley Scott","Christopher Nolan"],
c:0
})),

medium: Array.from({length:40}, (_,i)=>({
q:`Medium Question ${i+1}: What year did Jurassic Park release?`,
a:["1990","1993","1995","1999"],
c:1
})),

hard: Array.from({length:40}, (_,i)=>({
q:`Hard Question ${i+1}: Who composed the score for Star Wars?`,
a:["Hans Zimmer","John Williams","Danny Elfman","Howard Shore"],
c:1
})),

insane: Array.from({length:40}, (_,i)=>({
q:`Insane Question ${i+1}: In what film does the character Travis Bickle appear?`,
a:["Taxi Driver","Heat","Scarface","The Godfather"],
c:0
})),

kevin: Array.from({length:40}, (_,i)=>({
q:`Kevin Mode ${i+1}: What movie features a building exploding at the end?`,
a:["Die Hard","Speed","Fight Club","All of them"],
c:3
}))
}
