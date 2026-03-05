let difficulty
let pool=[]
let currentQuestion
let state = 0

let score = 0
let questionNumber = 1

function startGame(level){

difficulty = level
pool = [...questions[level]]

document.getElementById("menu").style.display="none"
document.getElementById("game").classList.remove("hidden")

if(level==="kevin"){
document.body.classList.add("kevin-mode")
}

score = 0
questionNumber = 1

updateHUD()

nextQuestion()

}

function updateHUD(){

document.getElementById("score").innerText = score
document.getElementById("qnum").innerText = questionNumber

}

function nextQuestion(){

if(pool.length===0){

alert("Game Over. Final Score: "+score)
location.reload()

return
}

const index = Math.floor(Math.random()*pool.length)
currentQuestion = pool.splice(index,1)[0]

document.getElementById("question").innerText=""
document.getElementById("choices").innerHTML=""
document.getElementById("answer").innerText=""
document.getElementById("answer").classList.add("hidden")

document.getElementById("actionButton").innerText="Reveal Question"

state=0

}

function handleAction(){

if(state===0){

document.getElementById("question").innerText=currentQuestion.question

let html=""

currentQuestion.choices.forEach((c,i)=>{
html += `<div>${String.fromCharCode(65+i)}) ${c}</div>`
})

document.getElementById("choices").innerHTML=html

document.getElementById("actionButton").innerText="Reveal Answer"

state=1

}

else if(state===1){

const correct = currentQuestion.choices[currentQuestion.correct]

document.getElementById("answer").innerText="Correct Answer: "+correct
document.getElementById("answer").classList.remove("hidden")

score++

document.getElementById("actionButton").innerText="Next Question"

state=2

}

else{

questionNumber++

updateHUD()

nextQuestion()

}

}
