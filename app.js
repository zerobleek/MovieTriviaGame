let currentDifficulty;
let questionIndex=0;
let score=0;

function startGame(diff){

currentDifficulty=diff;
questionIndex=0;
score=0;

document.getElementById("menu").classList.add("hidden");
document.getElementById("game").classList.remove("hidden");

if(diff==="kevin"){
document.getElementById("kevinBoss").classList.remove("hidden");
}else{
document.getElementById("kevinBoss").classList.add("hidden");
}

loadQuestion();

}

function loadQuestion(){

let set=QUESTIONS[currentDifficulty];
let q=set[questionIndex];

document.getElementById("question").textContent=q.question;

let choicesDiv=document.getElementById("choices");
choicesDiv.innerHTML="";

q.choices.forEach((choice,index)=>{

let btn=document.createElement("button");
btn.textContent=choice;

btn.onclick=()=>answer(index);

choicesDiv.appendChild(btn);

});

document.getElementById("score").textContent="Score: "+score;

}

function answer(choice){

let q=QUESTIONS[currentDifficulty][questionIndex];

if(choice===q.correct){

score++;

}else{

if(currentDifficulty==="kevin"){
alert("Wrong. Kevin wins.");
location.reload();
}

}

}

function nextQuestion(){

questionIndex++;

if(questionIndex>=25){

alert("Game Over! Score: "+score);
location.reload();
return;

}

loadQuestion();

}

function goBack(){

questionIndex--;

if(questionIndex<0){
questionIndex=0;
}

loadQuestion();

}
