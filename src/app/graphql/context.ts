import { prisma } from '../lib/prisma'

export const createContext = async () => {
	return {
		prisma,
	}
}

export type GraphQLContext = Awaited<ReturnType<typeof createContext>>
