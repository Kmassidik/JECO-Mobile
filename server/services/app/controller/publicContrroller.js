const { User, Item, Category, Ingredient } = require("../models");

class PublicController {
  static async getAllItem(req, res, next) {
    try {
      let responses = await Item.findAll();
      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async getAllCategory(req, res, next) {
    try {
      let responses = await Category.findAll();
      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async getItemId(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await Item.findByPk(id, {
        include: [
          {
            model: Ingredient,
            attributes: ['id','name','imageUrl']
          },
          {
            model: Category,
            attributes: ['id','name']
          },
          {
            model: User,
            attributes: ['id','username']
          }
        ],
      });
      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  PublicController,
};
