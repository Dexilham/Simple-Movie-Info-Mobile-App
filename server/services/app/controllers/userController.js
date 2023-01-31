const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, Address } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        Address,
      });

      res.status(201).json({ id: newUser.id, email: newUser.email });
    } catch (error) {
      // console.log(error, "<< error");
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "email required" };
      }
      if (!password) {
        throw { name: "password required" };
      }

      const user = await User.findOne({
        where: { email },
      });

      if (!user) {
        throw { name: "Invalid_credentials" };
      }

      const validPassword = compare(password, user.password);
      if (!validPassword) {
        throw { name: "Invalid_credentials" };
      }

      const payload = { id: user.id };
      const access_token = createToken(payload);
      // console.log(user, "<<< user");
      res
        .status(200)
        .json({ access_token, username: user.username, role: user.role });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
