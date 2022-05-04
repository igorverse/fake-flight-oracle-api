const express = require('express')
const auth = require('../middlewares/auth')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const flightsRouter = express.Router()

flightsRouter.post('/register', auth, async (req, res, next) => {
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
  } catch (error) {
    res.status(500).send({
      message: 'It was not possible to register a flight!',
      error,
    })
  }
})

flightsRouter.get('/', async (req, res, next) => {
  const flights = await prisma.flight.findMany()

  return res.json(flights)
})

flightsRouter.get('/:flightNumber', async (req, res, next) => {
  const { flightNumber } = req.params

  try {
    const flight = await prisma.flight.findUnique({
      where: { flightnumber: Number(flightNumber) },
    })

    if (!flight) throw new Error('Not found!')

    return res.json(flight)
  } catch (error) {
    return res
      .status(404)
      .json({ message: "this flight number doesn't exist", error })
  }
})

flightsRouter.patch('/:flightNumber/delayed', auth, async (req, res, next) => {
  const { flightNumber } = req.params

  try {
    const flight = await prisma.flight.update({
      where: { flightnumber: Number(flightNumber) },
      data: {
        isdelayedorcanceled: true,
      },
    })

    return res.status(204).send()
  } catch (error) {
    return res
      .status(400)
      .json({ message: "this flight number doesn't exist", error })
  }
})

flightsRouter.delete('/:flightNumber', async (req, res, next) => {
  const { flightNumber } = req.params

  try {
    const flight = await prisma.flight.delete({
      where: { flightnumber: Number(flightNumber) },
    })

    return res.status(204).send()
  } catch (error) {
    return res
      .status(400)
      .json({ message: "this flight number doesn't exist", error })
  }
})

module.exports = flightsRouter
