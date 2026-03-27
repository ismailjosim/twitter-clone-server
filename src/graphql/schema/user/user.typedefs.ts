export const UserTypeDefs = `#graphql

    type AuthPayload {
        accessToken: String!
        refreshToken: String!
        user: User!
    }

    type User {
        id: ID!
        email: String!
        name: String!
        phone: String
        profileImage: String
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        getCurrentUser: User
    }

    type Mutation {
        createUser(email: String!, name: String!, phone: String, profileImage: String): User!
        verifyGoogleToken(token: String!): AuthPayload
    }
`
