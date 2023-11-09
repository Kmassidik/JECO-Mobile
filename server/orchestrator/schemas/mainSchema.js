const { default: axios } = require("axios");
const url = process.env.APP_URL || "http://localhost:4002";
const urlUser = process.env.USER_URL || "http://localhost:4001/users";

const redis = require("../redis");

const mainTypeDefs = `#graphql
  type Item {
    id: ID
    name: String
    description: String
    price: Float
    imgUrl: String
    mongoUserId: String
    categoryId: Int
    Ingredients: [Ingredient]  
    Category: Category
  }

  type Ingredient {
    id: ID
    name: String
    imageUrl: String
  }

  input IngredientInput {
    name: String
    imageUrl: String
  }

  input UpdateIngredientInput {
    id: ID
    name: String
    imageUrl: String
  }

  type Category {
    id: Int
    name: String
  }

  type Query {
    allCategory: [Category]
    allItem: [Item]
    detailItemById(id: ID): Item
    deleteCache: String
  }

  type Message {
    message:String
  }

  type Mutation {
    postCategory(name: String): Category
    deleteCategory(id: ID): Message
    postItem(
      name: String
      description: String
      price: Float
      imgUrl: String
      mongoUserId: String
      category: Int
      ingredients: [IngredientInput]
    ): Item
    updateItem(
      id: ID
      name: String
      description: String
      price: Float
      imgUrl: String
      mongoUserId: String
      category: Int
      ingredients: [UpdateIngredientInput]
    ): Item
    deleteItem(id:ID): Message
  }
`;
const mainResolvers = {
  Query: {
    allCategory: async () => {
      try {
        // await redis.del("categories")
        const cache = await redis.get("categories");

        if (cache) {
          return JSON.parse(cache);
        }

        const { data } = await axios.get(url + "/api/category");

        await redis.set("categories", JSON.stringify(data));

        return data;
      } catch (error) {
        throw error;
      }
    },
    allItem: async () => {
      try {
        // await redis.del("items")
        const cache = await redis.get("items");

        if (cache) {
          return JSON.parse(cache);
        }

        const { data } = await axios.get(url + "/api/item");

        await redis.set("items", JSON.stringify(data));
        console.log(data, "datanya");
        return data;
      } catch (error) {
        throw error;
      }
    },
    detailItemById: async (_, args) => {
      try {
        const { data } = await axios.get(url + "/api/item/" + args.id);
        const { data: user } = await axios.get(
          `${urlUser}/${data.mongoUserId}`
        );
        if (!user) {
          throw new Error("Data User not found");
        }

        console.log(data, "data id");
        return data;
      } catch (error) {
        throw error;
      }
    },
    deleteCache: async () => {
      const cacheCategory = await redis.get("categories");
      const cacheItem = await redis.get("items");
      const cacheUser = await redis.get("users");
      if (cacheCategory) {
        await redis.del("categories");
      }
      if (cacheItem) {
        await redis.del("items");
      }
      if (cacheUser) {
        await redis.del("users");
      }
      return;
    },
  },

  Mutation: {
    postCategory: async (_, args) => {
      try {
        const cache = await redis.get("categories");

        let { data } = await axios({
          url: url + "/api/category",
          method: "POST",
          data: {
            name: args.name,
          },
        });

        if (cache) {
          await redis.del("categories");
        }

        return data;
      } catch (error) {
        throw error.response.data.message;
      }
    },
    deleteCategory: async (_, args) => {
      try {
        const cache = await redis.get("categories");

        const { data } = await axios({
          url: url + `/api/category/${args.id}`,
          method: "DELETE",
        });

        if (cache) {
          await redis.del("categories");
        }

        return { message: data };
      } catch (error) {
        throw error.response.data.message;
      }
    },
    postItem: async (_, args) => {
      try {
        const {
          name,
          description,
          price,
          imgUrl,
          category,
          ingredients,
          mongoUserId,
        } = args;

        const cache = await redis.get("items");

        let { data } = await axios({
          url: url + "/api/item",
          method: "POST",
          data: {
            name,
            description,
            price,
            imgUrl,
            category,
            ingredients,
            mongoUserId,
          },
        });

        if (cache) {
          await redis.del("items");
        }

        return data;
      } catch (error) {
        throw error.response.data.message;
      }
    },
    updateItem: async (_, args) => {
      try {
        const {
          id,
          name,
          description,
          price,
          imgUrl,
          category,
          ingredients,
          mongoUserId,
        } = args;

        const cache = await redis.get("items");

        let { data } = await axios({
          url: url + "/api/item/" + id,
          method: "PUT",
          data: {
            name,
            description,
            price,
            imgUrl,
            category,
            ingredients,
            mongoUserId,
          },
        });

        if (cache) {
          await redis.del("items");
        }

        // console.log(data.result);

        return data.result;
      } catch (error) {
        throw error.response.data.message;
      }
    },
    deleteItem: async (_, args) => {
      try {
        const cache = await redis.get("items");
        
        let { data } = await axios({
          url: url + "/api/item/" + args.id,
          method: "DELETE",
        });

        if (cache) {
          await redis.del("items");
        }

        return { message: data };
      } catch (error) {
        throw error.response.data.message;
      }
    },
  },
};

module.exports = { mainTypeDefs, mainResolvers };
