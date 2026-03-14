import { Application, Request, Response } from 'express'
import cors from 'cors'
import express from 'express'

const app: Application = express()

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }))

// Middleware to parse JSON bodies
app.use(express.json())

app.use(
	cors(),
	// {
	// origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
	// credentials: true,
	// }
)

// Health check route
app.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Server is up and running 🚀' })
})

// NOTE: GraphQL middleware (/graphql) is mounted in server.ts
// after Apollo Server has started, because server.start() is async.

export default app
