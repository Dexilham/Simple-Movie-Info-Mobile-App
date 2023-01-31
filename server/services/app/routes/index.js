const movieRouter = require("./movieRouter");
const genreRouter = require("./genreRouter");
const castRouter = require("./castRouter");
const pubRouter = require("./pubRouter");
// const { authentication } = require("../middlewares/authentication");

const router = require("express").Router();

router.use("/pub", pubRouter);
// router.use(authentication);
router.use("/movies", movieRouter);
router.use("/genres", genreRouter);
router.use("/casts", castRouter);

module.exports = router;
