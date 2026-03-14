export const UserTypeDefs = `#graphql

type User {
    id: ID!
    email: String!
    name: String!
    phone: String
    profileImage: String
    }

    type Query {
        users: [User!]!
        user(id:ID!): User
    }

    type Mutation {
        createUser(email:String!, name:String!,phone:String, profileImage: String): User!
    }

`
