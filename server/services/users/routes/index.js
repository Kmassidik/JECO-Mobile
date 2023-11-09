const express = require("express");
let { Controller } = require("../controller/controller");
let routes = express.Router();

routes.get("/", (req, res) => {
  res.send("api mongodb users!");
});
routes.get("/all-data", Controller.findAll);
routes.post("/add-user", Controller.addUser);
routes.get("/:id", Controller.findOne);
routes.delete("/:id", Controller.deleteUser);

module.exports = routes;
