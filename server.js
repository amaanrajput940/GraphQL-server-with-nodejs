var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// importing resolver functions for each API endpoint.
var {
    hello,
    appName
} = require('./resolvers/functions');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
    appName: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    hello,
    appName
};

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

