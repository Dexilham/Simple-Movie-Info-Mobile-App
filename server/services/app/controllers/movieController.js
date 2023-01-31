const { Movie, Genre, Cast, sequelize } = require("../models");

class MovieController {
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
  static async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await Movie.findOne({ where: { id } });
      await Movie.destroy({ where: { id } });
      if (movie === null) {
        throw { name: "Error not found" };
      }

      res.status(200).json({ message: `Movie ${movie.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }
  static async addMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const MongoId = req.headers.mongoid;
      const { title, synopsis, trailerUrl, imgUrl, rating, genreId, casts } =
        req.body;
      const slug = title.replace(/ +/g, "-").toLowerCase();
      // const slug = "coba";

      const movie = await Movie.create(
        {
          title,
          slug,
          synopsis,
          trailerUrl,
          imgUrl,
          rating,
          genreId,
          MongoId,
        },
        { transaction: t }
      );

      casts.map((el) => {
        el.movieId = movie.id;
        return el;
      });

      await Cast.bulkCreate(casts, { transaction: t });
      await t.commit();

      res.status(201).json(movie);
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }
  static async editMovie(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params;
      const MongoId = req.headers.mongoid;

      const { title, synopsis, trailerUrl, imgUrl, rating, genreId, casts } =
        req.body;

      const movie = await Movie.findByPk(id);
      if (!movie) {
        throw { name: "Error not found" };
      }

      await Movie.update(
        { title, synopsis, trailerUrl, imgUrl, rating, genreId, MongoId },
        { where: { id }, transaction: t }
      );

      casts.map((el) => {
        el.movieId = movie.id;
        return el;
      });

      await Cast.bulkCreate(casts, {
        updateOnDuplicate: ["id"],
        transaction: t,
      });
      await t.commit();

      res.status(201).json({ message: "This movie has been updated" });
    } catch (error) {
      await t.rollback();
      next(error);
    }
  }

  static async getCastsMovie(req, res, next) {
    try {
      const movieId = req.params.movieId;
      const casts = await Cast.findAll({
        where: { movieId },
      });

      res.status(200).json(casts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = MovieController;
