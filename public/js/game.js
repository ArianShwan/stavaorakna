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
  

  let currentWordIndex = 0
  let currentWord = ''
  let guessedLetters = []
  let progress = 0
  
  // DOM-element
  const imageElement = document.getElementById('currentImage')
  const wordDisplay = document.getElementById('wordDisplay')
  const keyboard = document.getElementById('keyboard')
  const progressFill = document.getElementById('progressFill')
  const spellButton = document.getElementById('stavaBtn')
  const countButton = document.getElementById('raknaBtn')
  const avatar = document.getElementById('avatar')
  

  function initGame() {
    resetGame();
    setupEventListeners();
  }
  
  function resetGame() {
    currentWordIndex = 0;
    loadWord(words[currentWordIndex]);
    updateProgress(0);
  }
  
  function setupEventListeners() {
    document.addEventListener('keydown', handleKeyDown);
  
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
      key.addEventListener('click', () => handleLetterGuess(key.textContent));
    });
  
    spellButton.addEventListener('click', resetGame);
  
    countButton.addEventListener('click', () => {
      alert('Räknespelet är under utveckling!');
    });
  }
  
  // Ladda ett nytt ord
  function loadWord(wordData) {
    currentWord = wordData.word
    guessedLetters = []
    
    imageElement.src = wordData.image;
    
    updateWordDisplay();
  }

  // Uppdatera visningen av ordet
  function updateWordDisplay() {
    wordDisplay.innerHTML = '';
    
    for (let i = 0; i < currentWord.length; i++) {
      const letter = currentWord[i];
      const letterElement = document.createElement('span');
      letterElement.classList.add('letter');
      
      if (guessedLetters.includes(i)) {
        letterElement.classList.add('filled');
        letterElement.textContent = letter;
      } else {
        letterElement.classList.add('empty');
        letterElement.textContent = '_';
      }
      
      wordDisplay.appendChild(letterElement);
    }
  }
  
  function handleLetterGuess(letter) {
    letter = letter.toUpperCase()
    
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
      
      // Kolla om ordet är komplett
      if (guessedLetters.length === currentWord.length) {
        setTimeout(() => {
          handleWordComplete()
        }, 1000)
      }
    } else {
      // Felaktig gissning
      highlightKey(letter, false)
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
    updateProgress((currentWordIndex + 1) / words.length * 100)
    
    // Gå till nästa ord eller avsluta
    currentWordIndex++;
    if (currentWordIndex < words.length) {
      loadWord(words[currentWordIndex])
    } else {
      alert('Bra jobbat! Du har klarat alla ord!')
      currentWordIndex = 0;
      loadWord(words[currentWordIndex])
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
      handleLetterGuess(key)
    }
  }

  
  // Starta spelet
  initGame()
})
