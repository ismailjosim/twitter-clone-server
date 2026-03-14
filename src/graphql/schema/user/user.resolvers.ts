import { GraphQLContext } from '../../context'

export const userResolvers = {
	Query: {
		users: (_: unknown, __: unknown, ctx: GraphQLContext) =>
			ctx.prisma.user.findMany(),
		user: (_: unknown, { id }: { id: number }, ctx: GraphQLContext) =>
			ctx.prisma.user.findUnique({
				where: { id },
				// includes code goes here
			}),
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
