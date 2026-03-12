let currentDifficulty;
let questionIndex = 0;
let score = 0;

function startGame(diff) {

currentDifficulty = diff;
questionIndex = 0;
score = 0;

document.getElementById("menu").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");

document.getElementById("score").textContent = score;

if (diff === "kevin") {
document.getElementById("kevinBoss").classList.remove("hidden");
} else {
document.getElementById("kevinBoss").classList.add("hidden");
}

loadQuestion();

}

function loadQuestion() {

let set = QUESTIONS[currentDifficulty];
let q = set[questionIndex];

document.getElementById("question").textContent = q.question;

document.getElementById("qnum").textContent = questionIndex + 1;

document.getElementById("result").textContent = "";

document.getElementById("nextButton").classList.add("hidden");

let choicesDiv = document.getElementById("choices");
choicesDiv.innerHTML = "";

q.choices.forEach((choice, index) => {

let btn = document.createElement("button");

btn.textContent = choice;

btn.onclick = () => answer(index);

choicesDiv.appendChild(btn);

});

}

function answer(choice) {

let q = QUESTIONS[currentDifficulty][questionIndex];

let buttons = document.querySelectorAll("#choices button");

buttons.forEach(btn => btn.disabled = true);

let resultDiv = document.getElementById("result");

if (choice === q.correct) {

score++;

document.getElementById("score").textContent = score;

resultDiv.textContent = "✅ Correct!";

} else {

let correctAnswer = q.choices[q.correct];

resultDiv.textContent = "❌ Wrong! The answer was: " + correctAnswer;

if (currentDifficulty === "kevin") {

setTimeout(() => {
alert("Wrong. Kevin wins.");
location.reload();
}, 800);

}

}

document.getElementById("nextButton").classList.remove("hidden");

}

function nextQuestion() {

questionIndex++;

if (questionIndex >= 25) {

alert("Game Over! Score: " + score);
location.reload();
return;

}

loadQuestion();

}

function goBack() {

questionIndex--;

if (questionIndex < 0) {
questionIndex = 0;
}

loadQuestion();

}
