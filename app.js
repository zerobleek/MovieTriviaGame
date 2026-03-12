let currentDifficulty = null
let questionIndex = 0
let score = 0

const menu = document.getElementById("menu")
const game = document.getElementById("game")
const questionEl = document.getElementById("question")
const choicesEl = document.getElementById("choices")
const resultEl = document.getElementById("result")
const scoreEl = document.getElementById("score")
const qnumEl = document.getElementById("qnum")
const nextBtn = document.getElementById("nextButton")
const backBtn = document.getElementById("backButton")
const kevinBoss = document.getElementById("kevinBoss")

nextBtn.onclick = nextQuestion
backBtn.onclick = goBack

function startGame(diff){

if(!QUESTIONS || !QUESTIONS[diff]){
alert("Question set missing for difficulty: " + diff)
return
}

currentDifficulty = diff
questionIndex = 0
score = 0

menu.classList.add("hidden")
game.classList.remove("hidden")

scoreEl.textContent = score

if(diff === "kevin"){
kevinBoss.classList.remove("hidden")
} else {
kevinBoss.classList.add("hidden")
}

loadQuestion()

}

function loadQuestion(){

const set = QUESTIONS[currentDifficulty]

if(!set || !set[questionIndex]){
questionEl.textContent = "No question found."
choicesEl.innerHTML = ""
return
}

const q = set[questionIndex]

questionEl.textContent = q.question

qnumEl.textContent = questionIndex + 1

resultEl.textContent = ""

nextBtn.classList.add("hidden")

choicesEl.innerHTML = ""

q.choices.forEach((choice,index)=>{

const btn = document.createElement("button")

btn.textContent = choice

btn.onclick = ()=>handleAnswer(index)

choicesEl.appendChild(btn)

})

}

function handleAnswer(choice){

const q = QUESTIONS[currentDifficulty][questionIndex]

const buttons = choicesEl.querySelectorAll("button")

buttons.forEach(b => b.disabled = true)

if(choice === q.correct){

score++
scoreEl.textContent = score
resultEl.textContent = "✅ Correct!"

} else {

const correctAnswer = q.choices[q.correct]

resultEl.textContent = "❌ Wrong! The answer was: " + correctAnswer

if(currentDifficulty === "kevin"){

setTimeout(()=>{
alert("Wrong. Kevin wins.")
location.reload()
},600)

}

}

nextBtn.classList.remove("hidden")

}

function nextQuestion(){

questionIndex++

if(questionIndex >= QUESTIONS[currentDifficulty].length){

alert("Game Over! Final Score: " + score)
location.reload()
return

}

loadQuestion()

}

function goBack(){

if(questionIndex > 0){
questionIndex--
}

loadQuestion()

}
