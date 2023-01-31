const router = require("express").Router();
const MovieController = require("../controllers/movieController");

router.get("/", MovieController.getMovies);
router.post("/", MovieController.addMovie);
router.put("/:id", MovieController.editMovie);
router.get("/:id", MovieController.getMovieDetail);
router.delete("/:id", MovieController.deleteMovie);

module.exports = router;
