const User = require("../models/user");

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({ username, email });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      await User.destroy(req.params.id);
      res.status(200).json({ message: "user has been deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = UserController;
