// server requirements
const express = require('express');
const ApolloServer = require('apollo-server-express').ApolloServer;

// config requirements
const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers.js');

// server config
const server = new ApolloServer({
    // GraphQL settings
    typeDefs,
    resolvers,
    // Playground settings
    playground: true,
    introspection: true,
    // Request authentication
    context: async ({ req }) => {
	const auth = req.headers && req.headers.authorization || '';
	console.log("checking authentication...");
	// ... add authentication code here ...
    }
});

// server boostrap
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 80 }, () =>
    console.log('Now browse to http://localhost:80' + server.graphqlPath)
);


