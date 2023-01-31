const router = require("express").Router();
const UserController = require("../controllers/userController");

router.post("/", UserController.register);
router.get("/", UserController.getUsers);
router.get("/:id", UserController.getUserById);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
