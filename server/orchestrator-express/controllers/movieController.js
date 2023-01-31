const axios = require("axios");
const redis = require("../config/redis");

//local
// const serviceUrlUsers = "http://localhost:4001";
// const serviceUrlApp = "http://localhost:4002";

//deploy
const serviceUrlUsers =
  "https://p3-challenge-2-production-users.up.railway.app/";
const serviceUrlApp =
  "https://p3-challenge-2-app-production-native.up.railway.app";

class MovieController {
  static async getMovies(req, res) {
    try {
      const cache = await redis.get("app:movie");
      if (cache) {
        res.status(200).json(JSON.parse(cache));
      } else {
        const { data } = await axios({
          method: "get",
          url: serviceUrlApp + "/movies",
        });
        await redis.set("app:movie", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async getMovieDetail(req, res) {
    try {
      const resultMovie = await axios({
        method: "get",
        url: serviceUrlApp + "/movies/" + req.params.id,
      });

      const resultUser = await axios({
        method: "get",
        url: serviceUrlUsers + "/users/" + resultMovie.data.MongoId,
      });

      const resultData = {
        ...resultMovie.data,
        user: resultUser.data,
      };

      res.status(200).json(resultData);
    } catch (error) {
      // console.log(error);
      const { data, status } = error.response;
      res.status(status).json(data.message);
    }
  }
  static async deleteMovie(req, res) {
    try {
      const { data } = await axios({
        method: "delete",
        url: serviceUrlApp + "/movies/" + req.params.id,
      });
      await redis.del("app:movie");
      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data.message);
    }
  }
  static async addMovie(req, res) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId, casts } =
        req.body;
      const { data } = await axios({
        method: "post",
        url: serviceUrlApp + "/movies",
        headers: { mongoid: "63811cab4cd960d8f020f62c" },
        data: { title, synopsis, trailerUrl, imgUrl, rating, genreId, casts },
      });
      await redis.del("app:movie");
      res.status(201).json(data);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data.message);
    }
  }
  static async editMovie(req, res) {
    try {
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId, casts } =
        req.body;
      const { data } = await axios({
        method: "put",
        url: serviceUrlApp + "/movies/" + req.params.id,
        headers: { mongoid: "63811cab4cd960d8f020f62c" },
        data: { title, synopsis, trailerUrl, imgUrl, rating, genreId, casts },
      });
      await redis.del("app:movie");
      res.status(201).json(data);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data.message);
    }
  }
}

module.exports = MovieController;
