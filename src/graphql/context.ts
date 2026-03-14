/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express'
import { PrismaClient } from '../generated/prisma/client'
import { prisma } from '../app/lib/prisma'
export interface GraphQLContext {
	prisma: PrismaClient
	userId?: number
	// Add more context fields (e.g. currentUser) as your app grows
}

export async function createContext({
	req,
}: {
	req: Request
}): Promise<GraphQLContext> {
	// You can extract JWT/session here later:
	// const token = req.headers.authorization?.split('Bearer ')[1]
	// const userId = verifyToken(token)

	return {
		prisma,
		// userId,
	}
}
