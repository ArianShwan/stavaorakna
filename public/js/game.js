document.addEventListener('DOMContentLoaded', () => {

  const words = [
    { word: 'KATT', image: '/images/cat.png' },
    { word: 'HUND', image: '/images/dog.png' },
    { word: 'HÄST', image: '/images/horse.png' },
    { word: 'BÅT', image: '/images/boat.png' },
    { word: 'HUS', image: '/images/house.png' },
    { word: 'SOL', image: '/images/sun.png' },
    { word: 'BOLL', image: '/images/ball.png' },
    { word: 'SKOG', image: '/images/forest.png' }
  ]
  
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
  
  // Blanda orden vid start
  let shuffledWords = []
  
  let currentWordIndex = 0
  let currentWord = ''
  let guessedLetters = []
  let hintTimer = null
  
  /* eslint-disable no-unused-vars */
  let progress = 0
  const keyboard = document.getElementById('keyboard')
  const spellButton = document.getElementById('stavaBtn')
  const countButton = document.getElementById('raknaBtn')
  /* eslint-enable no-unused-vars */

  // DOM-element
  const imageElement = document.getElementById('currentImage')
  const wordDisplay = document.getElementById('wordDisplay')
  const progressFill = document.getElementById('progressFill')
  const avatar = document.getElementById('avatar')
  const currentQuestionEl = document.getElementById('currentQuestion')
  const totalQuestionsEl = document.getElementById('totalQuestions')
  
  // Avatar emojis
  const avatarEmojis = {
    neutral: '😊',
    happy: '😄',
    excited: '🤩',
    thinking: '🤔',
    hint: '🤫',
    wrong: '😅'
  }
  
  function initGame() {
    // Blanda orden varje gång spelet startar
    shuffledWords = shuffleArray([...words])
    resetGame()
    setupEventListeners()
    // Uppdatera framstegsindikator med antal ord
    totalQuestionsEl.textContent = shuffledWords.length
    currentQuestionEl.textContent = currentWordIndex + 1
    // Sätt initial avatar
    updateAvatar('neutral')
  }
  
  function resetGame() {
    // Blanda orden på nytt när vi startar om
    shuffledWords = shuffleArray([...words])
    currentWordIndex = 0
    loadWord(shuffledWords[currentWordIndex])
    updateProgress(0)
  }
  
  function setupEventListeners() {
    document.addEventListener('keydown', handleKeyDown)
  
    const keys = document.querySelectorAll('.key')
    keys.forEach(key => {
      key.addEventListener('click', () => {
        const letter = key.textContent
        clearHintTimer()
        clearHints()
        handleLetterGuess(letter)
        startHintTimer()
      })
    })
  
  }
  
  // Ladda ett nytt ord
  function loadWord(wordData) {
    currentWord = wordData.word
    guessedLetters = []
    
    imageElement.src = wordData.image
    
    updateWordDisplay()
    clearHintTimer()
    clearHints()
    startHintTimer()
    updateAvatar('neutral')
  }

  // Uppdatera visningen av ordet
  function updateWordDisplay() {
    wordDisplay.innerHTML = ''
    
    for (let i = 0; i < currentWord.length; i++) {
      const letter = currentWord[i]
      const letterElement = document.createElement('span')
      letterElement.classList.add('letter')
      
      if (guessedLetters.includes(i)) {
        letterElement.classList.add('filled')
        letterElement.textContent = letter
      } else {
        letterElement.classList.add('empty')
        letterElement.textContent = '_'
      }
      
      wordDisplay.appendChild(letterElement)
    }
  }
  
  function handleLetterGuess(letter) {
    letter = letter.toUpperCase()
    
    // Visa tänkande avatar
    updateAvatar('thinking')
    
    const nextEmptyIndex = getNextEmptyIndex()
    
    if (nextEmptyIndex === -1) {
      return
    }
    
    // Kontrollera om gissningen är korrekt
    if (letter === currentWord[nextEmptyIndex]) {
      guessedLetters.push(nextEmptyIndex)
      updateWordDisplay()
      
      // Markera bokstaven på tangentbordet
      highlightKey(letter, true)
      
      // Visa glad avatar
      updateAvatar('happy')
      
      // Kolla om ordet är komplett
      if (guessedLetters.length === currentWord.length) {
        updateAvatar('excited')
        setTimeout(() => {
          handleWordComplete()
        }, 1000)
      } else {
        // Återgå till neutral efter en kort stund
        setTimeout(() => {
          updateAvatar('neutral')
        }, 1500)
      }
    } else {
      // Felaktig gissning
      highlightKey(letter, false)
      updateAvatar('wrong')
      
      setTimeout(() => {
        updateAvatar('neutral')
      }, 1000)
    }
  }
  
  // Hitta nästa tomma plats i ordet
  function getNextEmptyIndex() {
    for (let i = 0; i < currentWord.length; i++) {
      if (!guessedLetters.includes(i)) {
        return i
      }
    }
    return -1
  }
  
  // Markera en tangent
  function highlightKey(letter, isCorrect) {
    const keys = document.querySelectorAll('.key')
    keys.forEach(key => {
      if (key.textContent === letter) {
        // Återställ först alla klasser
        key.classList.remove('correct', 'incorrect')
        
        // Lägg till rätt klass
        if (isCorrect) {
          key.classList.add('correct')
        } else {
          key.classList.add('incorrect')
        }
        
        // Återställ efter en kort tid
        setTimeout(() => {
          key.classList.remove('correct', 'incorrect')
        }, 500)
      }
    })
  }
  
  // Hantera händelsen när ett ord är klart
  function handleWordComplete() {
    // Uppdatera framsteg
    updateProgress((currentWordIndex + 1) / shuffledWords.length * 100)
    
    // Gå till nästa ord eller avsluta
    currentWordIndex++;
    if (currentWordIndex < shuffledWords.length) {
      currentQuestionEl.textContent = currentWordIndex + 1
      loadWord(shuffledWords[currentWordIndex])
    } else {
      updateAvatar('excited')
      setTimeout(() => {
        alert('Bra jobbat! Du har klarat alla ord!')
        // Blanda orden på nytt när alla ord är klara
        shuffledWords = shuffleArray([...words])
        currentWordIndex = 0
        currentQuestionEl.textContent = currentWordIndex + 1
        loadWord(shuffledWords[currentWordIndex])
      }, 1000)
    }
  }
  
  // Uppdatera framstegsindikator
  function updateProgress(percent) {
    progressFill.style.height = `${percent}%`
  }
  
  // Hantera tangenttryck
  function handleKeyDown(event) {
    const key = event.key.toUpperCase()
    
    // Kontrollera om det är en bokstav
    if (/^[A-ZÅÄÖ]$/.test(key)) {
      clearHintTimer()
      clearHints()
      handleLetterGuess(key)
      startHintTimer()
    }
  }
  
  // Avatar-funktioner
  function updateAvatar(mood) {
    if (avatarEmojis[mood]) {
      avatar.textContent = avatarEmojis[mood]
      avatar.classList.add('bounce')
      setTimeout(() => {
        avatar.classList.remove('bounce')
      }, 1000)
    }
  }
  
  // Hint-funktioner
  function startHintTimer() {
    clearHintTimer()
    hintTimer = setTimeout(() => {
      showHint()
    }, 10000)
  }
  
  function clearHintTimer() {
    if (hintTimer) {
      clearTimeout(hintTimer)
      hintTimer = null
    }
  }
  
  function showHint() {
    const nextEmptyIndex = getNextEmptyIndex()
    
    if (nextEmptyIndex === -1) {
      return
    }
    
    const nextLetter = currentWord[nextEmptyIndex]
    
    // Hitta och markera rätt tangent
    const keys = document.querySelectorAll('.key')
    keys.forEach(key => {
      if (key.textContent === nextLetter) {
        key.classList.add('hint')
      }
    })
    
    // Uppdatera avatar till ledtrådläge
    updateAvatar('hint')
  }
  
  function clearHints() {
    const keys = document.querySelectorAll('.key')
    keys.forEach(key => {
      key.classList.remove('hint')
    })
  }
  
  // Starta spelet
  initGame()
})
