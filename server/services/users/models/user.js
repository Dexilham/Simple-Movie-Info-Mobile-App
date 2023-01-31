const { getDB } = require("../config/mongoConnection");
const { hash } = require("../helpers/bcrypt");
const { ObjectId } = require("mongodb");

class User {
  static getUsers() {
    const db = getDB();
    const userCollection = db.collection("Users");
    return userCollection;
  }

  static async create({ username, email, password, phoneNumber, address }) {
    const userCollection = this.getUsers();
    return await userCollection.insertOne({
      username,
      email,
      password: hash(password),
      role: "admin",
      phoneNumber,
      address,
    });
  }

  static async findAll() {
    const userCollection = this.getUsers();
    return await userCollection.find().toArray();
  }

  static async findByPk(id) {
    const userCollection = this.getUsers();
    return await userCollection.findOne({ _id: ObjectId(id) });
  }

  static async destroy(id) {
    const userCollection = this.getUsers();
    return await userCollection.deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = User;
