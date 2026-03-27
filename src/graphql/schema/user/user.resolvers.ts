import axios from 'axios'

import AppError from '../../../app/errorHelpers/AppError'
import StatusCode from '../../../app/utils/statusCode'
import { createUserToken } from '../../../app/utils/userToken'
import { GraphQLContext } from '../../../app/types/types'
import { IGoogleUserInfo } from '../../../app/interfaces'

export const userResolvers = {
	Query: {
		users: (_: unknown, __: unknown, ctx: GraphQLContext) =>
			ctx.prisma.user.findMany(),

		getCurrentUser: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
			if (!ctx.userId) {
				throw new AppError(StatusCode.UNAUTHORIZED, 'You are not authorized')
			}

			const user = await ctx.prisma.user.findUnique({
				where: { id: ctx.userId, isDeleted: false }, // only active user
			})

			if (!user) {
				throw new AppError(StatusCode.NOT_FOUND, 'User not found')
			}

			return user
		},
	},

	Mutation: {
		// createUser: (
		// 	_: unknown,
		// 	args: {
		// 		email: string
		// 		name: string
		// 		phone?: string
		// 		profileImage?: string
		// 	},
		// 	ctx: GraphQLContext,
		// ) => ctx.prisma.user.create({ data: args }),

		verifyGoogleToken: async (
			_: unknown,
			{ token }: { token: string },
			ctx: GraphQLContext,
		) => {
			// step 1. Verify token with Google
			let googleUser: IGoogleUserInfo
			try {
				const { data } = await axios.get<IGoogleUserInfo>(
					'https://www.googleapis.com/oauth2/v3/userinfo',
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				)
				googleUser = data
			} catch {
				throw new AppError(StatusCode.UNAUTHORIZED, 'Invalid Google token')
			}

			// step 2. Upsert user — creates if not exists, updates profile image if changed
			const user = await ctx.prisma.user.upsert({
				where: { email: googleUser.email },
				update: {
					profileImage: googleUser.picture,
				},
				create: {
					email: googleUser.email,
					name: googleUser.name,
					profileImage: googleUser.picture,
				},
			})

			// 3. Generate tokens
			const { accessToken, refreshToken } = createUserToken({
				id: user.id,
				email: user.email,
			})

			return {
				accessToken,
				refreshToken,
				user,
			}
		},
	},
}
