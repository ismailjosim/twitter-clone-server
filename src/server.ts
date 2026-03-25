import http from 'http'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors'

import app from './app'

import { schema } from './graphql/schema'
import { createContext } from './graphql/context'
import { envVars } from './app/config/env'
import { GraphQLContext } from './app/types/types'

const bootstrap = async () => {
	try {
		// 1. Wrap Express app in a Node HTTP server
		//    Apollo needs this for graceful shutdown
		const httpServer = http.createServer(app)

		// 2. Create Apollo Server instance
		const apolloServer = new ApolloServer<GraphQLContext>({
			schema,
			plugins: [
				// Gracefully shuts down the HTTP server on Apollo shutdown
				ApolloServerPluginDrainHttpServer({ httpServer }),
			],
		})

		// 3. MUST await start() before mounting middleware
		await apolloServer.start()
		console.log('✅ Apollo Server started')

		// 4. Mount GraphQL middleware onto the Express app
		//    Note: cors + express.json() are required here per Apollo docs
		//    even though app.ts already has them globally — Apollo middleware
		//    needs them scoped to this route
		app.use(
			'/graphql',
			cors<cors.CorsRequest>({
				origin: envVars.ALLOWED_ORIGINS?.split(',') || '*',
				credentials: true,
			}),
			expressMiddleware(apolloServer, {
				context: createContext,
			}),
		)

		// 5. Start the HTTP server (not app.listen — httpServer.listen)
		await new Promise<void>((resolve) =>
			httpServer.listen({ port: envVars.PORT }, resolve),
		)

		console.log(`🚀 Server running on http://localhost:${envVars.PORT}`)
		console.log(`📡 GraphQL endpoint: http://localhost:${envVars.PORT}/graphql`)
	} catch (error) {
		console.error('❌ Error starting the server:', error)
		process.exit(1)
	}
}

bootstrap()
