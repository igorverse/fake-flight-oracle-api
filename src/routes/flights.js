const express = require('express')

const flightsRouter = express.Router()

const flights = []

flightsRouter.post('/register', (req, res, next) => {
  const { flightNumber, airlineCompany, email, depatureDate, premium } =
    req.body

  for (const flight of flights) {
    if (flight.flightNumber === Number(flightNumber))
      return res.status(400).send('This id already exists!')
  }

  const flight = {
    flightNumber,
    airlineCompany,
    email,
    depatureDate: new Date(depatureDate),
    premium,
    payout: premium + premium * 0.1,
    isDelayedOrCanceled: false,
  }

  flights.push(flight)

  return res.status(201).json(flight)
})

flightsRouter.get('/', (req, res, next) => {
  return res.send(flights)
})

flightsRouter.get('/:id', (req, res, next) => {
  const { id } = req.params

  if (flights[id - 1]) {
    return res.json(flights[id - 1])
  } else {
    return res.status(404).send("This id doesn't exist")
  }
})

flightsRouter.patch('/:flightNumber/delayed', (req, res, next) => {
  const { flightNumber } = req.params

  for (const flight of flights) {
    if (flight.flightNumber === Number(flightNumber)) {
      flight.isDelayedOrCanceled = true
      return res.status(204).send()
    }
  }

  return res.status(404).send("this flight number doesn't exist")
})

flightsRouter.delete('/:flightNumber', (req, res, next) => {
  const { flightNumber } = req.params
  let flightIndex = -1

  for (const i in flights) {
    if (flights[i].flightNumber === Number(flightNumber)) {
      flightIndex = i
    }
  }

  if (flightIndex !== -1) {
    flights.splice(flightIndex, 1)

    return res.status(204).send()
  } else {
    return res.status(404).send("this flight number doesn't exist")
  }
})

module.exports = flightsRouter
