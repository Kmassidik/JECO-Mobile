const { Bcrypt } = require("../helpers/bycrpt");
const { User } = require("../models/user");

class Controller {
  static async findAll(req, res, next) {
    try {
      let responses = await User.findAll();
    
      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async findOne(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await User.findOne(id);
      if (!responses) {
        throw { name: "NotFound", message: "Data Not Found" };
      }
      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }

  static async addUser(req, res, next) {
    try {
      let { username, email, password, phoneNumber, address } = req.body;
      let role = "admin";
      let getPassword = Bcrypt.hashPassword(password);

      let value = {
        username,
        email,
        password: getPassword,
        role,
        phoneNumber,
        address,
      };

      let responses = await User.create(value);
      res.status(201).json(responses);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      let { id } = req.params;

      let getUser = await User.findOne(id);

      if (!getUser) {
        throw { name: "NotFound", message: "Data Not Found" };
      }

      let responses = await User.delete(id);

      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  Controller,
};
