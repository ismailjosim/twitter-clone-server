import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { Application } from 'express'
import { schema } from './schema'
import { createContext } from './context'

export const setupGraphQL = async (app: Application) => {
	const server = new ApolloServer({
		schema,
	})

	await server.start()

	app.use(
		'/graphql',
		expressMiddleware(server, {
			context: createContext,
		}),
	)
}
