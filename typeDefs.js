// typeDefs.js

const gql = require('apollo-server-express').gql;

const typeDefs = gql`

type Query {
    hello: String

    books: [Book]
    book(id: Int!): Book

    authors: [Author]
    author(id: Int!): Author
}

type Mutation {
    createBook(title: String!, authorId: Int!): Int

    createAuthor(name: String!): Int
}

type Book {
    id: Int
    title:  String
    author: Author
}

type Author {
    id: Int
    name: String
    books: [Book]
}

`;


(function() {
    module.exports = typeDefs
}());
