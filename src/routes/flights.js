const express = require('express')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const flightsRouter = express.Router()

flightsRouter.post('/register', async (req, res, next) => {
  try {
    const { flightNumber, airlineCompany, email, departureDate, premium } =
      req.body

    const flight = await prisma.flight.create({
      data: {
        flightnumber: flightNumber,
        airlinecompany: airlineCompany,
        email: email,
        departuredate: departureDate,
        premium: premium,
        payout: premium + premium * 0.1,
        isdelayedorcanceled: false,
      },
    })

    return res.status(201).json(flight)
  } catch (err) {
    res.status(500).send('=/')

    throw new Error(err)
  }
})

flightsRouter.get('/', (req, res, next) => {
  return res.send(flights)
})

flightsRouter.get('/:flightNumber', async (req, res, next) => {
  const { flightNumber } = req.params

  const flight = await prisma.flight.findUnique({
    where: { flightnumber: Number(flightNumber) },
  })

  res.json(flight)
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
