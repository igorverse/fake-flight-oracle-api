const express = require('express')
const cors = require('cors')
const flightsRouter = require('./src/routes/flights')
const PORT = process.env.PORT || 4242

const app = express()

app.use(express.json())
app.use(cors())

app.use('/flights', flightsRouter)

app.get('/', (req, res, next) => {
  res.json({
    hi: 'I am a fake flight oracle api',
    for: 'a proof of concept',
    itis: 'just a tcc',
  })
})

app.listen(PORT, () => {
  console.log("Hi! I'm a fake flight oracle api!")
})
