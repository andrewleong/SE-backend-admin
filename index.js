const { ApolloServer } = require('apollo-server');

const typeDefs = require('./src/schema');
const deviceDatabase = require("./src/datasources/device");
const resolvers = require('./src/resolver');

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
  })
});


server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
