const { gql } = require('apollo-server');
const typeDefs = gql`
  type Device {
    id: ID!
    name: String
    description: String
    zones: [Zone]
  }
  type Zone {
    id: ID!
    name: String
    description: String
  }
  type Query {
    devices: [Device]!
    device(id: ID!): Device
    zones: [Zone]!
    zone(id: ID!): Zone
  }
`;
module.exports = typeDefs;