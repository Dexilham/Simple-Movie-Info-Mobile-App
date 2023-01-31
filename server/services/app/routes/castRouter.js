const MovieController = require("../controllers/movieController");

const router = require("express").Router();

router.get("/:movieId", MovieController.getCastsMovie);

module.exports = router;
