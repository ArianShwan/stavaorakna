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
  const stavaBtn = document.getElementById('stavaBtn')
  const raknaBtn = document.getElementById('raknaBtn')
  const avatar = document.getElementById('avatar')
  

  function initGame() {
    currentWordIndex = 0
    loadWord(words[currentWordIndex])
    updateProgress(0)
    
    document.addEventListener('keydown', handleKeyDown)
    
    const keys = document.querySelectorAll('.key')
    keys.forEach(key => {
      key.addEventListener('click', () => {
        handleLetterGuess(key.textContent)
      })
    })
    
    stavaBtn.addEventListener('click', () => {

      currentWordIndex = 0;
      loadWord(words[currentWordIndex])
    })
    
    raknaBtn.addEventListener('click', () => {

      alert('Räknespelet är under utveckling!')
    })
  }
  
  // Ladda ett nytt ord
  function loadWord(wordData) {
    currentWord = wordData.word
    guessedLetters = []
    
    imageElement.src = wordData.image;
    
    updateWordDisplay();
  }
})
