const { MongoClient } = require("mongodb");

// atlas = "mongodb+srv://dexilham:mongoilham@cluster0.r1rhdnh.mongodb.net/?retryWrites=true&w=majority"
// const uri =
//   "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0";

const uri =
  "mongodb+srv://dexilham:mongoilham@cluster0.r1rhdnh.mongodb.net/?retryWrites=true&w=majority";

let db;

const client = new MongoClient(uri);

async function mongoConnect() {
  try {
    db = client.db("p3-challenge");
  } catch (error) {
    await client.close();
  }
}

function getDB() {
  return db;
}

module.exports = { mongoConnect, getDB };
