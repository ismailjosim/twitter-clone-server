export const types = `#graphql
        type User {
                id: ID!
                email: String!
                name: String!
                phone: String
                profileImage:String
                }

        type Query {
                users:  [User]
        }

        type Mutation {
                createUser(name:String!, email:String!): User
        }


`
