const { ObjectId } = require("mongodb");
const { db } = require("../config/mongo");

let collection = db.collection("users");

class User {
  static async findAll() {
    return collection.find().project({ password: 0 }).toArray();
  }
  static async findOne(userId) {
    return collection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { password: 0 } }
    );
  }
  static async create(value) {
    return collection.insertOne(value);
  }
  static async delete(userId) {
    return collection.deleteOne({ _id: new ObjectId(userId) });
  }
}

module.exports = { User };
