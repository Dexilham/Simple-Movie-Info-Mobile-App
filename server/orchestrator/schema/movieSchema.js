const axios = require("axios");
const redis = require("../config/redis");

//local
// const serviceUrlUsers = "http://localhost:4001";
// const serviceUrlApp = "http://localhost:4002";

//deploy
const serviceUrlUsers =
  "https://p3-challenge-2-production-users.up.railway.app";
const serviceUrlApp =
  "https://p3-challenge-2-app-production-native.up.railway.app";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Movie {
    id: ID
    title: String
    slug: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    genreId: Int
    MongoId: String
    Genre: Genre
    Casts: [Cast]
    User: User
  }

  type Genre{
    id: ID
    name: String
  }

  type Cast{
    id: ID
    movieId: Int
    name: String
    profilePict: String
  }

  type User {
    _id: ID
    username: String
    email: String
    phoneNumber: String
    address: String
  }

  type Message{
    message: String
  }

  input NewMovie{
    title: String
    synopsis: String
    trailerUrl: String
    imgUrl: String
    rating: Int
    genreId: Int
    casts: [NewCast]
  }

  input NewCast{
    movieId: Int
    name: String
    profilePict: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getMovies: [Movie]
    getMovieById(id: ID!): Movie
    getGenres: [Genre]
    getCasts: [Cast]
  }

  type Mutation {
    addMovie(newMovie: NewMovie): Movie
    deleteMovie(id: ID!): Message
    editMovie(id: ID!, newMovie: NewMovie): Message
  }
`;

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    getMovies: async () => {
      try {
        const cache = await redis.get("orchest:movie");
        if (cache) {
          return JSON.parse(cache);
        } else {
          const { data } = await axios({
            method: "get",
            url: serviceUrlApp + "/movies",
          });
          redis.set("orchest:movie", JSON.stringify(data));

          return data;
        }
      } catch (error) {
        throw error;
      }
    },
    getMovieById: async (_, args) => {
      try {
        const { data: movie } = await axios({
          method: "get",
          url: serviceUrlApp + `/movies/${args.id}`,
        });

        const { data: user } = await axios({
          method: "get",
          url: serviceUrlUsers + `/users/${movie.MongoId}`,
        });

        const resultData = {
          ...movie,
          User: user,
        };

        return resultData;
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    addMovie: async (_, args) => {
      try {
        const { data } = await axios({
          method: "post",
          url: serviceUrlApp + "/movies",
          headers: { mongoid: "63811cab4cd960d8f020f62c" },
          data: args.newMovie,
        });

        await redis.del("orchest:movie");

        return data;
      } catch (error) {
        throw error;
      }
    },

    editMovie: async (_, args) => {
      try {
        const { data } = await axios({
          method: "put",
          url: serviceUrlApp + `/movies/${args.id}`,
          data: args.newMovie,
        });

        await redis.del("orchest:movie");

        return data;
      } catch (error) {
        throw error;
      }
    },

    deleteMovie: async (_, args) => {
      try {
        const { data } = await axios({
          method: "delete",
          url: serviceUrlApp + `/movies/${args.id}`,
        });

        await redis.del("orchest:movie");

        return data;
      } catch (error) {
        throw error;
      }
    },
  },
};

module.exports = { movieDefs: typeDefs, movieRes: resolvers };
