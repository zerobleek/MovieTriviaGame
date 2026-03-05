let difficulty
let pool=[]
let currentQuestion

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

clearInterval(timer)

if(pool.length===0){

alert("Game Over. Final Score: "+score)
goBack()
return

}

document.getElementById("nextButton").classList.add("hidden")
document.getElementById("result").innerText=""

const index=Math.floor(Math.random()*pool.length)
currentQuestion=pool.splice(index,1)[0]

document.getElementById("question").innerText=currentQuestion.question

let html=""

currentQuestion.choices.forEach((choice,i)=>{

html+=`<button class="choice" onclick="selectAnswer(${i},this)">
${choice}
</button>`

})

document.getElementById("choices").innerHTML=html

startTimer()

}

function selectAnswer(choiceIndex,button){

clearInterval(timer)

const correctIndex=currentQuestion.correct

let buttons=document.querySelectorAll(".choice")

buttons.forEach((btn,i)=>{

btn.disabled=true

if(i===correctIndex){
btn.classList.add("correct")
}

})

if(choiceIndex===correctIndex){

score++
updateHUD()

document.getElementById("result").innerText="Correct!"

}else{

button.classList.add("wrong")

document.getElementById("result").innerText="Incorrect"

}

document.getElementById("nextButton").classList.remove("hidden")

}

function startTimer(){

timeLeft = difficulty==="kevin" ? 10 : 15

document.getElementById("timer").innerText=timeLeft

timer=setInterval(()=>{

timeLeft--
document.getElementById("timer").innerText=timeLeft

if(timeLeft<=0){

clearInterval(timer)

document.getElementById("result").innerText="Time's Up!"

document.getElementById("nextButton").classList.remove("hidden")

}

},1000)

}

function goBack(){

location.reload()

}
