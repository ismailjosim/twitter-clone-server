import { Application, Request, Response } from 'express'

const cors = require('cors')
const express = require('express')

const app: Application = express()

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }))

// Middleware to parse JSON bodies
app.use(express.json())
app.use(cors())

// Basic route
app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Server is up and running 🚀' })
})

export default app
