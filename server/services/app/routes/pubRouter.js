const CustomerController = require("../controllers/customerController");

const router = require("express").Router();

router.get("/movies", CustomerController.getMovies);
router.get("/movies/:id", CustomerController.getMovieDetail);

module.exports = router;
