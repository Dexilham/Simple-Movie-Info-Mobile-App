const router = require("express").Router();
const UserController = require("../controllers/userController");

router.post("/users", UserController.register);
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUserById);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
