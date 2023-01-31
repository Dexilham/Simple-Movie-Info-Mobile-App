const userRouter = require("./userRouter");
const movieRouter = require("./movieRouter");

const router = require("express").Router();

router.use("/users", userRouter);
router.use("/movies", movieRouter);

module.exports = router;
