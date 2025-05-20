document.addEventListener('DOMContentLoaded', () => {
  const stavaBtn = document.getElementById('stavaBtn')
  const raknaBtn = document.getElementById('raknaBtn')
  const avatar = document.getElementById('startAvatar')
  
  // Animera avatar när sidan laddas
  avatar.classList.add('bounce')
  setTimeout(() => {
    avatar.classList.remove('bounce')
  }, 1000)
  
  stavaBtn.addEventListener('mouseenter', () => {
    avatar.textContent = '✏️'
  })
  
  raknaBtn.addEventListener('mouseenter', () => {
    avatar.textContent = '🔢'
  })
  
})
