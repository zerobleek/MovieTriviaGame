
let mode
let questions=[]
let index=0
let score=0
let timer
let timeLeft=15

function startGame(m){

mode=m
questions=[...QUESTIONS[m]]
index=0
score=0

document.getElementById("menu").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")
document.getElementById("endScreen").classList.add("hidden")

if(mode==="kevin"){
document.getElementById("kevinImage").classList.remove("hidden")
document.getElementById("klaxon").play()
}

loadQuestion()
}

function loadQuestion(){

if(index>=questions.length){
endGame()
return
}

const q=questions[index]

document.getElementById("qnum").textContent=index+1
document.getElementById("score").textContent=score
document.getElementById("question").textContent=q.q

const choices=document.getElementById("choices")
choices.innerHTML=""

q.a.forEach((choice,i)=>{
const btn=document.createElement("button")
btn.textContent=choice
btn.onclick=()=>answer(i)
choices.appendChild(btn)
})

startTimer()
}

function answer(i){

clearInterval(timer)

if(i===questions[index].c){
score++
if(mode==="kevin") document.getElementById("explosion").play()
}else{
if(mode==="kevin") document.getElementById("cat").play()
}

index++
loadQuestion()
}

function undoQuestion(){
clearInterval(timer)
loadQuestion()
}

function startTimer(){

timeLeft=15
document.getElementById("timer").textContent=timeLeft

timer=setInterval(()=>{
timeLeft--
document.getElementById("timer").textContent=timeLeft

if(timeLeft<=0){
clearInterval(timer)
index++
loadQuestion()
}

},1000)
}

function endGame(){

document.getElementById("game").classList.add("hidden")
document.getElementById("endScreen").classList.remove("hidden")
document.getElementById("finalScore").textContent=score
}

function backToMenu(){

clearInterval(timer)

document.getElementById("menu").classList.remove("hidden")
document.getElementById("game").classList.add("hidden")
document.getElementById("endScreen").classList.add("hidden")
document.getElementById("kevinImage").classList.add("hidden")
}
