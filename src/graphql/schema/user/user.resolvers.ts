/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios'
import { GraphQLContext } from '../../context'
import AppError from '../../../app/errorHelpers/AppError'
import StatusCode from '../../../app/utils/statusCode'
import { createUserToken } from '../../../app/utils/userToken'

interface IGoogleResponse {
	name: string
	email: string

	sub?: string
	picture?: string
	given_name?: string
	email_verified: boolean
}

export const userResolvers = {
	Query: {
		users: (_: unknown, __: unknown, ctx: GraphQLContext) =>
			ctx.prisma.user.findMany(),
		user: (_: unknown, { id }: { id: number }, ctx: GraphQLContext) =>
			ctx.prisma.user.findUnique({
				where: { id },
				// includes code goes here
			}),
		verifyGoogleToken: async (
			_: unknown,
			{ token }: { token: string },
			ctx: GraphQLContext,
		) => {
			let googleUser: IGoogleResponse

			// 1. Verify token with Google
			try {
				const { data } = await axios.get<IGoogleResponse>(
					'https://www.googleapis.com/oauth2/v3/userinfo',
					{
						headers: { Authorization: `Bearer ${token}` },
					},
				)
				googleUser = data
			} catch (error) {
				throw new AppError(StatusCode.UNAUTHORIZED, 'Invalid Google Token')
			}

			// 2. Find or Create User (Optimized approach)
			let user = await ctx.prisma.user.findUnique({
				where: { email: googleUser.email },
			})

			if (!user) {
				user = await ctx.prisma.user.create({
					data: {
						email: googleUser.email,
						name: googleUser.name,
						profileImage: googleUser.picture,
					},
				})
			}

			// 3. Generate tokens
			const { accessToken, refreshToken } = createUserToken({
				email: user.email,
				id: user.id,
			})

			return {
				accessToken,
				refreshToken,
				user,
			}
		},
	},
	Mutation: {
		createUser: (
			_: unknown,
			args: {
				email: string
				name: string
				phone?: string
				profileImage?: string
			},
			ctx: GraphQLContext,
		) => ctx.prisma.user.create({ data: args }),
	},
}
