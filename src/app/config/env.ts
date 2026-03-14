import dotenv from 'dotenv'
import AppError from '../errorHelpers/AppError'
import StatusCode from '../utils/statusCode'
dotenv.config()

interface EnvConfig {
	NODE_ENV: string
	PORT: string
	DATABASE_URL: string
	DIRECT_URL: string
	ALLOWED_ORIGINS: string
}

const loadEnvVars = (): EnvConfig => {
	const requireEnvVars = [
		'NODE_ENV',
		'PORT',
		'DATABASE_URL',
		'DIRECT_URL',
		'ALLOWED_ORIGINS',
	]

	requireEnvVars.forEach((variable) => {
		if (!process.env[variable]) {
			// TODO: Throw error here
			throw new AppError(
				StatusCode.INTERNAL_SERVER_ERROR,
				`Environment variable ${variable} is required but not set in .env file.`,
			)
		}
	})

	return {
		NODE_ENV: process.env.NODE_ENV as string,
		PORT: process.env.PORT as string,
		DATABASE_URL: process.env.DATABASE_URL as string,
		DIRECT_URL: process.env.DIRECT_URL as string,
		ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS as string,
	}
}
export const envVars = loadEnvVars()
