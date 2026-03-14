import { envVars } from '../config/env'
import { prisma } from '../lib/prisma'
import { JWT } from './jwtToken'
import type { JwtPayload } from 'jsonwebtoken'
import StatusCode from './statusCode'
import AppError from '../errorHelpers/AppError'

// 🧾 Create access & refresh tokens for a user
export const createUserToken = (user: { id: number; email: string }) => {
	// Token payload
	const tokenPayload = {
		userId: user.id,
		email: user.email,
	}

	// Generate access token
	const accessToken = JWT.generateToken(
		tokenPayload,
		envVars.ACCESS_TOKEN_SECRET,
		envVars.ACCESS_TOKEN_EXPIRES,
	)

	// Generate refresh token
	const refreshToken = JWT.generateToken(
		tokenPayload,
		envVars.REFRESH_TOKEN_SECRET,
		envVars.REFRESH_TOKEN_EXPIRES,
	)

	return { accessToken, refreshToken }
}

// 🔄 Generate new access token using refresh token
export const createNewAccessTokenWithRefreshToken = async (
	ParamsRefreshToken: string,
) => {
	// Verify the refresh token
	const verifyRefreshToken = JWT.verifyToken(
		ParamsRefreshToken,
		envVars.REFRESH_TOKEN_SECRET,
	) as JwtPayload

	// ✅ Check if user exists in Postgres via Prisma
	const isUserExist = await prisma.user.findUniqueOrThrow({
		where: {
			email: verifyRefreshToken.email,
		},
	})

	if (!isUserExist) {
		throw new AppError(StatusCode.BAD_REQUEST, "This user doesn't exist")
	}

	// 🧾 Payload for new token
	const tokenPayload = {
		userId: isUserExist.id,
		email: isUserExist.email,
	}

	// 🔑 Generate new access token
	const accessToken = JWT.generateToken(
		tokenPayload,
		envVars.ACCESS_TOKEN_SECRET,
		envVars.ACCESS_TOKEN_EXPIRES,
	)

	return accessToken
}
