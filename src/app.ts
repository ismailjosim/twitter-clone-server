import { Application, Request, Response } from 'express'

import cors from 'cors'
import express from 'express'
import { prisma } from './app/lib/prisma'

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
app.get('/v1/user', async (req: Request, res: Response) => {
	const user = await prisma.user.findMany()

	res.status(200).json({ success: true, result: user })
})

export default app
