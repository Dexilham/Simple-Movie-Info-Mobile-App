import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

//  https://60f2-36-84-101-182.ap.ngrok.io -> http://localhost:4000
// deploy https://p3-challenge-2-orchestra-native.up.railway.app/

export const client = new ApolloClient({
  uri: "https://p3-challenge-2-orchestra-native.up.railway.app",
  cache: new InMemoryCache(),
});

export const Get_Movies = gql`
  query GetMovies {
    getMovies {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      genreId
      MongoId
      Genre {
        id
        name
      }
      Casts {
        id
        movieId
        name
        profilePict
      }
    }
  }
`;

export const Get_Movie_By_Id = gql`
  query GetMovieById($id: ID!) {
    getMovieById(id: $id) {
      id
      title
      slug
      synopsis
      trailerUrl
      imgUrl
      rating
      genreId
      User {
        _id
        username
        email
      }
      Genre {
        id
        name
      }
      Casts {
        id
        movieId
        name
        profilePict
      }
    }
  }
`;
