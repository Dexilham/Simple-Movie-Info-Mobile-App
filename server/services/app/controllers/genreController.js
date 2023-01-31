const { User, Movie, Genre } = require("../models");

class GenreController {
  static async getGenres(req, res, next) {
    try {
      const genres = await Genre.findAll();

      res.status(200).json(genres);
    } catch (error) {
      next(error);
    }
  }

  static async addGenre(req, res, next) {
    try {
      const { name } = req.body;
      const genre = await Genre.create({
        name,
      });

      res.status(201).json(genre);
    } catch (error) {
      // console.log(error, "<<< error");
      next(error);
    }
  }

  static async deleteGenre(req, res, next) {
    try {
      const { id } = req.params;
      const genre = await Genre.findByPk(id);
      await Genre.destroy({ where: { id } });
      if (genre === null) {
        throw { name: "Genre not found" };
      }

      res.status(200).json({ message: `Genre ${genre.name} has been deleted` });
    } catch (error) {
      next(error);
    }
  }

  static async editGenre(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const genre = await Genre.findByPk(id);
      if (genre === null) {
        throw { name: "Genre not found" };
      }

      await Genre.update(
        {
          name,
        },
        { where: { id } }
      );

      res.status(200).json({
        message: `Genre ${genre.name} has been updated to ${name}`,
      });
    } catch (error) {
      // console.log(error, "<<< error");
      next(error);
    }
  }

  static async getGenreById(req, res, next) {
    const { id } = req.params;
    try {
      const genre = await Genre.findByPk(id);
      if (!genre) {
        throw { name: "Genre not found" };
      } else {
        res.status(200).json(genre);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = GenreController;
