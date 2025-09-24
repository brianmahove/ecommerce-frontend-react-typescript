// src/graphql/schema.ts
import { gql } from '@apollo/client';

export const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    originalPrice: Float
    image: String!
    category: String!
    rating: Float!
    stock: Int!
    tags: [String!]!
    features: [String!]!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    avatar: String
    isAdmin: Boolean!
  }

  type CartItem {
    product: Product!
    quantity: Int!
  }

  type Query {
    products(
      category: String
      minPrice: Float
      maxPrice: Float
      minRating: Float
      sortBy: String
      sortOrder: String
    ): [Product!]!
    product(id: ID!): Product
    categories: [String!]!
    cart: [CartItem!]!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): User
    logout: Boolean
    addToCart(productId: ID!, quantity: Int!): CartItem
    removeFromCart(productId: ID!): Boolean
    updateCartQuantity(productId: ID!, quantity: Int!): CartItem
    checkout: Boolean
  }
`;