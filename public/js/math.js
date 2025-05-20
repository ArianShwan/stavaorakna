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
    neutral: '😊',
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
    
    // Visa svarsalternativ
    answerOptions.innerHTML = ''
    options.forEach(option => {
      const button = document.createElement('button')
      button.classList.add('answer-btn')
      button.textContent = option
      button.addEventListener('click', () => checkAnswer(option, answer))
      answerOptions.appendChild(button)
    })
    
    // Visa visuella objekt för att hjälpa barnen räkna
    visualizeQuestion(num1, num2, operator)
  }
  
  function visualizeQuestion(num1, num2, operator) {
    // Välj slumpmässiga emoji för denna fråga
    const randomEmojiSet = mathEmojis[operator]
    const emoji = randomEmojiSet[Math.floor(Math.random() * randomEmojiSet.length)]
    
    if (operator === 'addition') {
      // För addition, visa num1 objekt, sedan + symbol, sedan num2 objekt
      for (let i = 0; i < num1; i++) {
        addObject(emoji)
      }
      
      // Lägg till ett plustecken
      const plusSign = document.createElement('div')
      plusSign.textContent = '+'
      plusSign.classList.add('object', 'operator')
      numberObjects.appendChild(plusSign)
      
      // Fördröj visningen av de andra objekten
      setTimeout(() => {
        for (let i = 0; i < num2; i++) {
          addObject(emoji)
        }
      })
      
    } else if (operator === 'subtraction') {
      // För subtraktion, visa num1 objekt, några av dem kommer att korsas över
      for (let i = 0; i < num1; i++) {
        const obj = addObject(emoji)
        
        // De sista num2 objekten kommer att korsas över
        if (i >= num1 - num2) {
          setTimeout(() => {
            obj.style.opacity = '0.3'
            obj.style.textDecoration = 'line-through'
          }, 1500)
        }
      }
    }
  }
  
  function addObject(emoji) {
    const obj = document.createElement('div')
    obj.textContent = emoji
    obj.classList.add('object')
    numberObjects.appendChild(obj)
    return obj
  }
  
  function checkAnswer(selectedAnswer, correctAnswer) {
    const isCorrect = selectedAnswer === correctAnswer
    
    // Hitta den valda knappen och markera den
    const buttons = answerOptions.querySelectorAll('.answer-btn')
    buttons.forEach(button => {
      if (parseInt(button.textContent) === selectedAnswer) {
        button.classList.add(isCorrect ? 'correct' : 'incorrect')
      }
      
      // Inaktivera alla knappar tillfälligt
      button.disabled = true
    })
    
    // Uppdatera avatar
    updateAvatar(isCorrect ? 'happy' : 'wrong')
    
    // Om svaret är korrekt, uppdatera poäng och visa nästa fråga
    if (isCorrect) {
      currentScore++
    }
    
    // Vänta och gå vidare till nästa fråga
    setTimeout(() => {
      currentQuestion++
      
      // Kolla om spelet är klart
      if (currentQuestion > totalQuestions) {
        finishGame()
      } else {
        // Uppdatera progress
        updateProgress((currentQuestion - 1) / totalQuestions * 100)
        
        // Uppdatera frågenummer
        currentQuestionEl.textContent = currentQuestion
        
        // Generera ny fråga
        generateQuestion()
        
        // Återställ avatar
        updateAvatar('neutral')
      }
    }, 1500)
  }
  
  function finishGame() {
    // Visa resultat
    updateAvatar('excited')
    
    setTimeout(() => {
      alert(`Bra jobbat! Du fick ${currentScore} av ${totalQuestions} rätt!`)
      
      // Återställ spelet
      currentQuestion = 1
      currentScore = 0
      
      // Uppdatera display
      currentQuestionEl.textContent = currentQuestion
      
      // Återställ progress
      updateProgress(0)
      
      // Generera ny fråga
      generateQuestion()
      
      // Återställ avatar
      updateAvatar('neutral')
    }, 1000)
  }
  
  function updateProgress(percent) {
    progressFill.style.height = `${percent}%`
  }
  
  function updateAvatar(mood) {
    if (avatarEmojis[mood]) {
      avatar.textContent = avatarEmojis[mood]
      avatar.classList.add('bounce')
      setTimeout(() => {
        avatar.classList.remove('bounce')
      }, 1000)
    }
  }
  
  // Funktion för att blanda en array (Fisher-Yates shuffle algoritm)
  function shuffleArray(array) {
    let currentIndex = array.length
    let temporaryValue, randomIndex
    
    // Medan det finns element att blanda
    while (currentIndex !== 0) {
      // Välj ett kvarvarande element
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      
      // Byt plats med det aktuella elementet
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }
    
    return array
  }
  
  // Starta spelet
  initGame()
})