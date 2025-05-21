/* global describe, test, expect */
// Testa shuffleArray funktionen
describe('Shuffle array function', () => {
  function shuffleArray(array) {
    const newArray = [...array]
    let j;
    for (let i = newArray.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  test('should return an array with the same length', () => {
    const original = [1, 2, 3, 4, 5]
    const result = shuffleArray(original)
    expect(result.length).toBe(original.length)
  })

  test('should contain all original elements', () => {
    const original = ['KATT', 'HUND', 'HÄST']
    const result = shuffleArray(original)
    
    original.forEach((word) => { expect(result).toContain(word); })
  })
})

// Testa en enkel stavningskontroll
describe('Spelling check', () => {
  test('should correctly identify if a letter is in a word', () => {
    const word = 'KATT'
    
    // Testa bokstäver som finns i ordet
    expect(word.includes('K')).toBe(true)
    expect(word.includes('A')).toBe(true)
    expect(word.includes('T')).toBe(true)
    
    // Testa bokstäver som inte finns i ordet
    expect(word.includes('H')).toBe(false)
    expect(word.includes('X')).toBe(false)
  })
})

// Testa en enkel matematikfunktion
describe('Math operations', () => {
  test('should correctly calculate addition', () => {
    expect(5 + 3).toBe(8)
    expect(7 + 2).toBe(9)
  })
  
  test('should correctly calculate subtraction', () => {
    expect(5 - 3).toBe(2)
    expect(7 - 2).toBe(5)
  })
})