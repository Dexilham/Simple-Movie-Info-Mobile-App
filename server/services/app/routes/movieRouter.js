const MovieController = require("../controllers/movieController");

const router = require("express").Router();

router.get("/", MovieController.getMovies);
router.post("/", MovieController.addMovie);
router.get("/:id", MovieController.getMovieDetail);
router.delete("/:id", MovieController.deleteMovie);
router.put("/:id", MovieController.editMovie);

module.exports = router;
