"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Movie.belongsTo(models.Genre, { foreignKey: "genreId" });
      Movie.hasMany(models.Cast, { foreignKey: "movieId" });
    }
  }
  Movie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "title is required" },
          notNull: { msg: "title is required" },
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "synopsis is required" },
          notNull: { msg: "synopsis is required" },
        },
      },
      trailerUrl: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "rating is required" },
          notNull: { msg: "rating is required" },
          min: {
            args: 1,
            msg: "Rating minimum is 1",
          },
        },
      },
      genreId: DataTypes.INTEGER,
      MongoId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );

  Movie.beforeCreate((movie, option) => {
    movie.slug = movie.title.replace(/ +/g, "-").toLowerCase();
    movie.trailerUrl = movie.trailerUrl.replace("watch?v=", "embed/");
  });

  return Movie;
};
