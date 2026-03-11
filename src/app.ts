import { Application, Request, Response } from 'express'

import cors from 'cors'
import express from 'express'
import { setupGraphQL } from './app/graphql/server'

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

const initGraphQL = async () => {
	await setupGraphQL(app)
}
initGraphQL()

export default app
