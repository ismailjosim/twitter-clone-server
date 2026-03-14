// base type need so other types can extend Query/Mutation

import { makeExecutableSchema } from '@graphql-tools/schema'
import { UserTypeDefs } from './user/user.typedefs'
import { userResolvers } from './user/user.resolvers'

// const baseTypeDefs = `#graphql
//   type Query {
//     _empty: String
//   }
//   type Mutation {
//     _empty: String
//   }
// `

export const schema = makeExecutableSchema({
	typeDefs: [UserTypeDefs],
	resolvers: [userResolvers],
})
