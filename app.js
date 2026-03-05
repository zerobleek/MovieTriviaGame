let difficulty
let pool=[]
let currentQuestion
let state=0

let score=0
let questionNumber=1

let timer
let timeLeft

function startGame(level){

difficulty=level
pool=[...questions[level]]

document.getElementById("menu").style.display="none"
document.getElementById("game").classList.remove("hidden")

if(level==="kevin"){
document.body.classList.add("kevin-mode")
}

score=0
questionNumber=1

updateHUD()
nextQuestion()

}

function updateHUD(){

document.getElementById("score").innerText=score
document.getElementById("qnum").innerText=questionNumber

}

function nextQuestion(){

if(pool.length===0){

alert("Game Over. Final Score: "+score)
goBack()
return

}

const index=Math.floor(Math.random()*pool.length)
currentQuestion=pool.splice(index,1)[0]

document.getElementById("question").innerText=""
document.getElementById("choices").innerHTML=""
document.getElementById("answer").innerText=""
document.getElementById("answer").classList.add("hidden")

document.getElementById("resultButtons").classList.add("hidden")

document.getElementById("actionButton").innerText="Reveal Question"

state=0

startTimer()

}

function startTimer(){

clearInterval(timer)

timeLeft = difficulty==="kevin" ? 10 : 15

document.getElementById("timer").innerText=timeLeft

timer=setInterval(()=>{

timeLeft--
document.getElementById("timer").innerText=timeLeft

if(timeLeft<=0){

clearInterval(timer)

document.getElementById("answer").innerText="Time's up!"
document.getElementById("answer").classList.remove("hidden")

document.getElementById("actionButton").innerText="Next Question"

state=2

}

},1000)

}

function handleAction(){

if(state===0){

document.getElementById("question").innerText=currentQuestion.question

let html=""

currentQuestion.choices.forEach((c,i)=>{
html+=`${String.fromCharCode(65+i)}) ${c}<br>`
})

document.getElementById("choices").innerHTML=html

document.getElementById("actionButton").innerText="Reveal Answer"

state=1

}

else if(state===1){

clearInterval(timer)

const correct=currentQuestion.choices[currentQuestion.correct]

document.getElementById("answer").innerText="Correct Answer: "+correct
document.getElementById("answer").classList.remove("hidden")

document.getElementById("resultButtons").classList.remove("hidden")

document.getElementById("actionButton").innerText="Next Question"

state=2

}

else{

questionNumber++
updateHUD()
nextQuestion()

}

}

function markCorrect(){

score++
updateHUD()

}

function markWrong(){

}

function goBack(){

location.reload()

}
