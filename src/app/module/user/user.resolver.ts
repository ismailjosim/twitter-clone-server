const users = []

export const resolvers = {
	Query: {
		users: () => users,
	},
	Mutation: {
		createUser: (_, { name, email }) => {
			const user = {
				id: users.length + 1,
				name,
				email,
			}
			user.push(user)
			return user
		},
	},
}
