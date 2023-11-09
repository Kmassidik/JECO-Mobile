const { Item, Category, Ingredient, sequelize } = require("../models");
class ApiController {
  // category
  static async getAllCategory(req, res, next) {
    try {
      let responses = await Category.findAll();

      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async addNewCategory(req, res, next) {
    try {
      console.log("terpanggil");
      let { name } = req.body;
      let responses = await Category.create({ name: name });
      console.log("hasil");
      res.status(201).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async getCategoryById(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await Category.findByPk(id);

      if (!responses) {
        throw { name: "NotFound", message: "Category not found" };
      }

      res.status(201).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async editCategoryById(req, res, next) {
    try {
      let { name } = req.body;
      let { id } = req.params;
      let responses = await Category.findByPk(id);

      if (!responses) {
        throw { name: "NotFound", message: "Category not found" };
      }

      let responsesEdit = await responses.update({ name: name });

      res.status(201).json(responsesEdit);
    } catch (error) {
      next(error);
    }
  }
  static async deleteCategory(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await Category.findByPk(id);

      if (!responses) {
        throw { name: "NotFound", message: "Category not found" };
      }

      await responses.destroy();

      res.status(201).json(`this category: ${responses.name}, has been delete`);
    } catch (error) {
      next(error);
    }
  }
  // item
  static async getAllItem(req, res, next) {
    try {
      let responses = await Item.findAll({
        include: [
          {
            model: Ingredient,
          },
          {
            model: Category,
          },
        ],
      });
      responses = responses.map((element) => {
        element.dataValues.ingredientsLength = element.Ingredients.length;
        return element;
      });

      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async addNewItem(req, res, next) {
    console.log(req.body, "ini datanyaaa");
    let transaction = await sequelize.transaction();

    try {
      let { name, description, price, imgUrl, category, ingredients, mongoUserId } =
        req.body;
      console.log(req.body);
      let newItem = await Item.create(
        {
          name: name,
          description: description,
          price: price,
          imgUrl: imgUrl,
          mongoUserId: mongoUserId,
          categoryId: category,
        },
        { transaction: transaction }
      );
      let dataIngradient = ingredients.map((e) => ({
        name: e.name,
        imageUrl: e.imageUrl,
        itemId: newItem.id,
      }));

      let newIngredient = await Ingredient.bulkCreate(dataIngradient, {
        transaction: transaction,
      });

      await transaction.commit();

      let responses = {
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        price: newItem.price,
        imgUrl: newItem.imgUrl,
        mongoUserId: newItem.mongoUserId,
        categoryId: newItem.categoryId,
        Ingredients: newIngredient
      }
      res.status(201).json(responses);
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  }
  static async getItemById(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await Item.findByPk(id, {
        include: [
          {
            model: Category,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
          {
            model: Ingredient,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      });

      if (!responses) {
        throw { name: "NotFound", message: `Items by ${id} not found!` };
      }
      res.status(200).json(responses);
    } catch (error) {
      next(error);
    }
  }
  static async updateItemById(req, res, next) {
    try {
      const result = await sequelize.transaction(async (transaction) => {
        const { name, description, price, imgUrl, category, ingredients } =
          req.body;
        const { id } = req.params;

        const getItem = await Item.findByPk(id, {
          include: {
            model: Ingredient,
          },
          transaction: transaction,
        });

        if (!getItem) {
          throw { name: "NotFound", message: "Data item not found!" };
        }

        await getItem.update({
          name: name,
          description: description,
          price: price,
          imgUrl: imgUrl,
          categoryId: category,
        });

        if (ingredients && ingredients.length > 0) {
          for (const ingredientData of ingredients) {
            const [ingredient, created] = await Ingredient.findOrCreate({
              where: { id: ingredientData.id },
              defaults: ingredientData,
              transaction: transaction,
            });

            if (!created) {
              await ingredient.update(ingredientData);
            }

            await getItem.addIngredient(ingredient, {
              transaction: transaction,
            });
          }
        }
        return getItem;
      });

      res.status(200).json({ result, message: "Your data has been updated" });
    } catch (error) {
      next(error);
    }
  }
  static async deleteItemById(req, res, next) {
    try {
      let { id } = req.params;
      let responses = await Item.findByPk(id);

      if (!responses) {
        throw { name: "NotFound", message: "Data item not found!" };
      }

      await responses.destroy();
      res.status(200).json(`Your Item: ${responses.name}, has been deleted`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  ApiController,
};
