const express = require('express')
const path = require('path')
const app = express()
const port = 3000

// Statiska filer (css, js, bilder, etc.)
app.use(express.static(path.join(__dirname, 'public')))

// Ställ in EJS som vymotor
app.set('view engine', 'ejs')

// Rutter
// Startsida
app.get('/', (req, res) => {
  res.render('index')
})

// Stavningsspelet
app.get('/stava', (req, res) => {
  res.render('stava')
})

// Räknespelet
app.get('/rakna', (req, res) => {
  res.render('rakna')
})

// Starta servern
app.listen(port, () => {
  console.log(`Lärspelet körs på http://localhost:${port}`)
})
