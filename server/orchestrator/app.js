const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { movieDefs, movieRes } = require("./schema/movieSchema");
const { userDefs, userRes } = require("./schema/userSchema");

const server = new ApolloServer({
  typeDefs: [userDefs, movieDefs],
  resolvers: [userRes, movieRes],
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
})
  .then((result) => {
    console.log(`🚀  Server ready at: ${result.url}`);
  })
  .catch((error) => {
    console.log(error);
  });
