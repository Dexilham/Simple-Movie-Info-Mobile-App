const axios = require("axios");
const redis = require("../config/redis");

const serviceUrlUsers = "http://localhost:4001";
const serviceUrlApp = "http://localhost:4002";

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const { data } = await axios({
        method: "post",
        url: serviceUrlUsers + "/users",
        data: { username, email, password, phoneNumber, address },
      });

      res.status(201).json(data);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data.message);
    }
  }

  static async getUsers(req, res) {
    try {
      const { data } = await axios({
        method: "get",
        url: serviceUrlUsers + "/users",
      });

      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data.message);
    }
  }

  static async getUserById(req, res) {
    try {
      const { data } = await axios({
        method: "get",
        url: serviceUrlUsers + "/users/" + req.params.id,
      });

      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data.message);
    }
  }

  static async deleteUser(req, res) {
    try {
      const { data } = await axios({
        method: "delete",
        url: serviceUrlUsers + "/users/" + req.params.id,
      });

      res.status(200).json(data);
    } catch (error) {
      const { status, data } = error.response;
      res.status(status).json(data.message);
    }
  }
}

module.exports = UserController;
