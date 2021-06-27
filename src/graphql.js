const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema');
const deviceDatabase = require("./datasources/device");
const resolvers = require('./resolver');
const knexConfig = {
  client: 'postgres',
  connection: {
    host : 'test-managements.co8sk0fxd0li.us-east-1.rds.amazonaws.com',
    user : 'postgres_tester',
    password : '4postgres2use',
    database : 'postgres'
  }
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    deviceDatabase: new deviceDatabase(knexConfig)
  }),
  playground: {
    endpoint: "/dev/graphql"
  }
});
exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: false,
  },
});
