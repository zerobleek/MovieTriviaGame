let mode
let questions
let current=0
let score=0

let timer
let timeLeft=15



function startGame(m){

mode=m
questions=[...QUESTIONS[m]]

current=0
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

clearInterval(timer)

if(current>=questions.length){

endGame()
return

}

let q=questions[current]

document.getElementById("question").textContent=q.q
document.getElementById("qnum").textContent=current+1
document.getElementById("score").textContent=score

let answersDiv=document.getElementById("answers")
answersDiv.innerHTML=""

q.a.forEach((choice,index)=>{

let btn=document.createElement("button")
btn.textContent=choice

btn.onclick=function(){
answer(index)
}

answersDiv.appendChild(btn)

})

startTimer()

}



function answer(i){

clearInterval(timer)

let q=questions[current]

if(i===q.c){

score++

if(mode==="kevin"){
document.getElementById("explosion").play()
}

}else{

if(mode==="kevin"){
document.getElementById("cat").play()
}

}

current++
loadQuestion()

}



function undoQuestion(){

clearInterval(timer)
loadQuestion()

}



function startTimer(){

timeLeft=15
document.getElementById("timer").textContent=timeLeft

timer=setInterval(function(){

timeLeft--
document.getElementById("timer").textContent=timeLeft

if(timeLeft<=0){

clearInterval(timer)
current++
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
