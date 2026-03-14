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
	ACCESS_TOKEN_SECRET: string
	ACCESS_TOKEN_EXPIRES: string
	REFRESH_TOKEN_SECRET: string
	REFRESH_TOKEN_EXPIRES: string
}

const loadEnvVars = (): EnvConfig => {
	const requireEnvVars = [
		'NODE_ENV',
		'PORT',
		'DATABASE_URL',
		'DIRECT_URL',
		'ALLOWED_ORIGINS',
		'ACCESS_TOKEN_SECRET',
		'ACCESS_TOKEN_EXPIRES',
		'REFRESH_TOKEN_SECRET',
		'REFRESH_TOKEN_EXPIRES',
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
		ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
		ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES as string,
		REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
		REFRESH_TOKEN_EXPIRES: process.env.REFRESH_TOKEN_EXPIRES as string,
	}
}
export const envVars = loadEnvVars()
