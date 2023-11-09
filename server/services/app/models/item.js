"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, { foreignKey: "categoryId" });
      Item.hasMany(models.Ingredient, { foreignKey: "itemId" });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        unique:{
          msg:"Name cannot be duplicate!"
        },
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required!",
          },
          notNull: {
            msg: "Name is required!",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required!",
          },
          notNull: {
            msg: "Description is required!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Price is required!",
          },
          notNull: {
            msg: "Price is required!",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image Url is required!",
          },
          notNull: {
            msg: "Image Url is required!",
          },
        },
      },
      mongoUserId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "mongoUserId is required!",
          },
          notNull: {
            msg: "mongoUserId is required!",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Category is required!",
          },
          notNull: {
            msg: "Category  is required!",
          },
          isNumeric: {
            msg: "Category Id should be number!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
