import { Request } from 'express'
import { prisma } from '../app/lib/prisma'
import { GraphQLContext } from '../app/types/types'
import { JWT } from '../app/utils/jwtToken'
import { envVars } from '../app/config/env'
import AppError from '../app/errorHelpers/AppError'
import StatusCode from '../app/utils/statusCode'

export async function createContext({
	req,
}: {
	req: Request
}): Promise<GraphQLContext> {
	const authHeader = req.headers.authorization
	console.log(authHeader)
	const token = authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1]

	if (!token) {
		throw new AppError(StatusCode.UNAUTHORIZED, 'Token not found')
	}

	const payload = JWT.verifyToken(token, envVars.ACCESS_TOKEN_SECRET)

	return {
		prisma,
		userId: payload.id,
	}
}
