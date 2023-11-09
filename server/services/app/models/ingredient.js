"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ingredient.belongsTo(models.Item, { foreignKey: "itemId" });
    }
  }
  Ingredient.init(
    {
      name: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:{
          msg: "Name category should be unique!"
        },
        validate: {
          notEmpty:{
            msg:'Name is required!'
          },
          notNull:{
            msg:'Name is required!'
          }
        }
      },
      imageUrl: {
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
          notEmpty:{
            msg:'Image Url is required!'
          },
          notNull:{
            msg:'Image Url is required!'
          }
        }
      },
      itemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};
