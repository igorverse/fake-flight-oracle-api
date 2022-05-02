const express = require('express')
const flightsRouter = require('./routes/flights')
const PORT = process.env.PORT || 4242

const app = express()

app.use(express.json())

app.use('/flights', flightsRouter)

app.listen(PORT, () => {
  console.log("Hi! I'm a fake flight oracle api!")
})
