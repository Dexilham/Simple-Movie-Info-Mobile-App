const axios = require("axios");
// const redis = require("../config/redis");
// const serviceUrlUsers = "http://localhost:4001";
// const serviceUrlApp = "http://localhost:4002";

//deploy
const serviceUrlUsers =
  "https://p3-challenge-2-production-users.up.railway.app";
// const serviceUrlApp =
//   "https://p3-challenge-2-app-production-native.up.railway.app";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    _id: ID
    username: String
    email: String
    password: String
    role: String
    phoneNumber: String
    address: String
  }

  type Message{
    message: String
  }

  input NewUser{
    username: String
    email: String
    password: String
    phoneNumber: String
    address: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getUsers: [User]
    getUserById(_id: ID!): User
  }

  type Mutation {
    register(newUser: NewUser): User
    deleteUser(_id: ID!): Message
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        const { data } = await axios({
          method: "get",
          url: serviceUrlUsers + "/users",
        });

        return data;
      } catch (error) {
        throw error;
      }
    },
    getUserById: async (_, args) => {
      try {
        const { data } = await axios({
          method: "get",
          url: serviceUrlUsers + `/users/${args._id}`,
        });

        return data;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      try {
        const { data } = await axios({
          method: "post",
          url: serviceUrlUsers + "/users",
          data: args.newUser,
        });

        return data;
      } catch (error) {
        throw error;
      }
    },
    deleteUser: async (_, args) => {
      try {
        const { data } = await axios({
          method: "delete",
          url: serviceUrlUsers + `/users/${args._id}`,
        });

        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { userDefs: typeDefs, userRes: resolvers };
