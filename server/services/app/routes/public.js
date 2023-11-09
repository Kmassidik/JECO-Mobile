const express = require("express");
let routes = express.Router();
let { PublicController } = require("../controller/publicContrroller");

routes.get("/", (req, res, next) => {
  res.send("welcome to public api JECO");
});

routes.get("/items", PublicController.getAllItem);
routes.get("/item/:id", PublicController.getItemId);
routes.get("/category", PublicController.getAllCategory);

module.exports = routes;
