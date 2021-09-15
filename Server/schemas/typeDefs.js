const { gql } = require('apollo-server-express');

const typeDefs = gql`

    input SizeInput {
        name: String!
    }

    input BannerInput {
        _id: ID
        name: String
        customMessage: String
        image: String
        quantity: Int
        price: Float
        size: SizeInput
    }

    type User {
        _id: ID
        firstName: String!
        lastName: String!
        username: String!
        email: String!
        password: String!
        order: [Order]   
    }

    type Banner {
        _id: ID
        name: String
        customMessage: String
        image: String
        quantity: Int
        price: Float
        size: Size
    }

    type Order {
        _id: ID
        purchaseDate: String
        banner: [Banner]
    }

    type Size {
        name: String!
    }
    
    type Checkout {
        session: ID
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        size: String
        banners(size:ID name: String): [Banner]
        banner(_id: ID!): Banner
        user: User
        order(_id: ID!): Order
        checkout(banners: [ID]!): Checkout
    }

    type Mutation {
        login(email: String, password: String): Auth
        addUser(firstName: String, lastName: String, username: String, email: String, password: String): Auth
        addOrder(banners: [BannerInput]): Order
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateBanner(_id: ID!, quantity: Int!): Banner
    }
`;

module.exports = typeDefs;