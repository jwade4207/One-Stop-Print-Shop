const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Category {
    _id: ID
    name: String
    }

    type User {
        _id: ID
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        order: [Order]   
    }

    type Banner {
        _id: ID
        name: String
        image: String
        quantity: Int
        price: Float
        category: Category
    }

    type Order {
        _id: ID
        purchaseDate: String
        banner: [Banner]
    }
    
    type Checkout {
        session: ID
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        categories: [Category]
        banners(category: ID, name: String): [Banner]
        banner(_id: ID!): Banner
        user: User
        order(_id: ID!): Order
        checkout(banners: [ID]!): Checkout
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addOrder(banners: [ID]!): Order
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateBanner(_id: ID!, quantity: Int!): Banner
    }
`;

module.exports = typeDefs;