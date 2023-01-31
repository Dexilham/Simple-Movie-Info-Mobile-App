const { User, Movie, Genre, Cast } = require("../models");

class CustomerController {
  static async getMovies(req, res, next) {
    try {
      const movies = await Movie.findAll({
        include: [Genre, Cast],
      });

      res.status(200).json(movies);
    } catch (error) {
      next(error);
    }
  }
  static async getMovieDetail(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findOne({
        where: { id },
        include: [Genre, Cast],
      });
      if (movie === null) {
        throw { name: "Error not found" };
      }

      res.status(200).json(movie);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
