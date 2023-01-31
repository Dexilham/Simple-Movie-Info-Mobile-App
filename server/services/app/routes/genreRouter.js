const GenreController = require("../controllers/genreController");

const router = require("express").Router();

router.get("/", GenreController.getGenres);
router.post("/", GenreController.addGenre);
router.delete("/:id", GenreController.deleteGenre);
router.put("/:id", GenreController.editGenre);
router.get("/:id", GenreController.getGenreById);

module.exports = router;
