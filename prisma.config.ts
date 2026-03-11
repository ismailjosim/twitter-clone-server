import { envVars } from './src/app/config/env'
import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
	},
	datasource: {
		url: envVars.DIRECT_URL,
	},
})
