import { PrismaClient } from '../../generated/prisma/client'

type AuthResponse = {
	accessToken: string
	refreshToken: string
	id: number
	email: number
	name: string
	profileImage: string
}

export type Query = {
	verifyGoogleToken(token: string): AuthResponse
}

export interface GraphQLContext {
	prisma: PrismaClient
	userId?: number | null
}
