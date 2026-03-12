let mode
let questions
let current = 0
let score = 0

let timer
let timeLeft = 15
let kevinTimeout

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function startGame(m) {
  clearTimeout(kevinTimeout)

  if (typeof QUESTIONS === "undefined" || !QUESTIONS[m]) {
    alert("Questions failed to load. Please refresh the page.")
    return
  }

  mode = m
  questions = shuffle([...QUESTIONS[m]])
  current = 0
  score = 0

  document.getElementById("menu").classList.add("hidden")
  document.getElementById("game").classList.remove("hidden")
  document.getElementById("endScreen").classList.add("hidden")

  if (mode === "kevin") {
    document.getElementById("klaxon").play().catch(() => {})
    document.getElementById("kevinOverlay").classList.add("active")
  } else {
    document.getElementById("kevinOverlay").classList.remove("active")
  }

  loadQuestion()
}

function loadQuestion() {
  clearInterval(timer)

  if (current >= questions.length) {
    endGame()
    return
  }

  const q = questions[current]

  if (!q || !Array.isArray(q.choices)) {
    document.getElementById("result").textContent = "Error: question data is missing."
    return
  }

  document.getElementById("question").textContent = q.question
  document.getElementById("qnum").textContent = current + 1
  document.getElementById("score").textContent = score
  document.getElementById("result").textContent = ""
  document.getElementById("nextButton").classList.add("hidden")
  setControlButtons(true)

  const answersDiv = document.getElementById("answers")
  answersDiv.innerHTML = ""

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button")
    btn.textContent = choice
    btn.onclick = () => handleAnswer(index)
    answersDiv.appendChild(btn)
  })

  startTimer()
}

function handleAnswer(i) {
  clearInterval(timer)

  const q = questions[current]
  const btns = document.getElementById("answers").querySelectorAll("button")
  btns.forEach(b => { b.disabled = true })

  const resultDiv = document.getElementById("result")

  if (i === q.correct) {
    score++
    document.getElementById("score").textContent = score
    resultDiv.textContent = "✅ Correct!"
    triggerToasty()
    showNextButton()
  } else {
    resultDiv.textContent = "❌ Wrong! The answer was: " + q.choices[q.correct]

    if (mode === "kevin") {
      document.getElementById("cat").play().catch(() => {})
      setControlButtons(false)
      kevinTimeout = setTimeout(() => endGame(), 1500)
      return
    }

    showNextButton()
  }
}

function triggerToasty() {
  const img = document.getElementById("kevinImage")
  img.classList.remove("toasty")
  void img.offsetWidth
  img.classList.add("toasty")
  const audio = document.getElementById("toasty")
  if (audio) {
    audio.currentTime = 0
    audio.play().catch(() => {})
  }
  img.addEventListener("animationend", () => {
    img.classList.remove("toasty")
  }, { once: true })
}

function showNextButton() {
  document.getElementById("nextButton").classList.remove("hidden")
}

function setControlButtons(enabled) {
  document.getElementById("undoBtn").disabled = !enabled
  document.getElementById("backBtn").disabled = !enabled
}

function nextQuestion() {
  current++
  loadQuestion()
}

function undoQuestion() {
  clearTimeout(kevinTimeout)
  setControlButtons(true)
  clearInterval(timer)
  loadQuestion()
}

function startTimer() {
  timeLeft = 15
  document.getElementById("timer").textContent = timeLeft

  timer = setInterval(() => {
    timeLeft--
    document.getElementById("timer").textContent = timeLeft

    if (timeLeft <= 0) {
      clearInterval(timer)

      const btns = document.getElementById("answers").querySelectorAll("button")
      btns.forEach(b => { b.disabled = true })

      const q = questions[current]
      document.getElementById("result").textContent = "⏰ Time's up! The answer was: " + q.choices[q.correct]

      if (mode === "kevin") {
        document.getElementById("cat").play().catch(() => {})
        setControlButtons(false)
        kevinTimeout = setTimeout(() => endGame(), 1500)
        return
      }

      showNextButton()
    }
  }, 1000)
}

function endGame() {
  clearInterval(timer)
  document.getElementById("kevinOverlay").classList.remove("active")
  document.getElementById("game").classList.add("hidden")
  document.getElementById("endScreen").classList.remove("hidden")
  document.getElementById("finalScore").textContent = score
}

function backToMenu() {
  clearTimeout(kevinTimeout)
  setControlButtons(true)
  clearInterval(timer)
  document.getElementById("kevinOverlay").classList.remove("active")
  document.getElementById("menu").classList.remove("hidden")
  document.getElementById("game").classList.add("hidden")
  document.getElementById("endScreen").classList.add("hidden")
}
