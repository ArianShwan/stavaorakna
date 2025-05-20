document.addEventListener('DOMContentLoaded', () => {
  // Spelvariabler
  let currentScore = 0
  let totalQuestions = 10
  let currentQuestion = 1
  let maxNumber = 10
  
  // DOM-element
  const mathProblem = document.getElementById('mathProblem')
  const answerOptions = document.getElementById('answerOptions')
  const progressFill = document.getElementById('progressFill')
  const avatar = document.getElementById('avatar')
  const numberObjects = document.getElementById('numberObjects')
  const currentQuestionEl = document.getElementById('currentQuestion')
  const totalQuestionsEl = document.getElementById('totalQuestions')
  
  // Objekt för matematiktecken
  const mathEmojis = {
    addition: ['🍎', '🍌', '🍓', '🍒', '🍕', '🍦', '🍩', '🍪', '🧸', '🎈', '🚗', '⚽'],
    subtraction: ['🍎', '🍌', '🍓', '🍒', '🍕', '🍦', '🍩', '🍪', '🧸', '🎈', '🚗', '⚽']
  }
  
  // Avatar emojis
  const avatarEmojis = {
    neutral: '🔢',
    happy: '😄',
    excited: '🤩',
    thinking: '🤔',
    wrong: '😅'
  }
  
  function initGame() {
    // Uppdatera total frågor display
    currentQuestionEl.textContent = currentQuestion
    totalQuestionsEl.textContent = totalQuestions
    
    // Generera och visa första frågan
    generateQuestion()
    
    updateProgress(0)
    updateAvatar('neutral')
  }
  
  function generateQuestion() {
    // Rensa tidigare objekt
    numberObjects.innerHTML = ''
    
    // Generera tal och operatör
    const num1 = Math.floor(Math.random() * maxNumber) + 1
    const num2 = Math.floor(Math.random() * Math.min(maxNumber, 10 - num1)) + 1
    let operator, answer, operatorSymbol
    
    // 70% sannolikhet för addition, 30% för subtraktion (när vi har möjlighet)
    if (num1 > num2 && Math.random() < 0.3) {
      operator = 'subtraction'
      answer = num1 - num2
      operatorSymbol = '-'
    } else {
      operator = 'addition'
      answer = num1 + num2
      operatorSymbol = '+'
    }
    
    // Skapa lösningalternativ (inklusive rätt svar)
    let options = [answer]
    
    // Lägg till två felaktiga alternativ
    while (options.length < 3) {
      // Generera ett slumpmässigt alternativ som är rimligt
      let wrongAnswer
      if (operator === 'addition') {
        // För addition: +/- 1-3 från rätt svar
        const offset = Math.floor(Math.random() * 3) + 1
        wrongAnswer = Math.random() < 0.5 ? answer + offset : Math.max(1, answer - offset)
      } else {
        // För subtraktion: +/- 1-2 från rätt svar
        const offset = Math.floor(Math.random() * 2) + 1
        wrongAnswer = Math.random() < 0.5 ? answer + offset : Math.max(1, answer - offset)
      }
      
      // Kontrollera att alternativet inte redan finns i listan
      if (!options.includes(wrongAnswer)) {
        options.push(wrongAnswer)
      }
    }
    
    // Blanda alternativen
    options = shuffleArray(options)
    
    // Visa frågan
    mathProblem.innerHTML = `
      <span class="number">${num1}</span>
      <span class="operator">${operatorSymbol}</span>
      <span class="number">${num2}</span>
      <span class="equals">=</span>
      <span class="question-mark">?</span>
    `
    
  
  // Starta spelet
  initGame()
})
