const { default: axios } = require("axios");
const url = process.env.USER_URL || "http://localhost:4001/users";
const redis = require("../redis");

const userTypeDefs = `#graphql
    type User {
        _id: ID,
        username: String,
        email: String,
        phoneNumber: String, 
        address: String,
        role: String
    }

    type Query {
        allUsers: [User]
        userDetail(id: ID): User
    }

    type Message {
        message: String
    }

    type Mutation {
        postUser(
            username: String
            password: String
            email: String
            phoneNumber: String
            address: String
        ) : User
        deleteUser(id: ID): Message
    }
`;

const userResolvers = {
  Query: {
    allUsers: async () => {
      try {
        const cache = await redis.get("users");
        if (cache) {
          return JSON.parse(cache);
        }
        const { data } = await axios.get(url + "/all-data");

        await redis.set("users", JSON.stringify(data));

        console.log(data);
        return data;
      } catch (error) {
        throw error.response.data.message;
      }
    },

    userDetail: async (_, args) => {
      try {
        const { data } = await axios.get(url + `/${args.id}`);
        return data;
      } catch (error) {
        throw error.response.data.message;
      }
    },
  },

  Mutation: {
    postUser: async (_, args) => {
      try {
        const { data } = await axios({
          url: url + "/add-user",
          method: "POST",
          data: {
            username: args.username,
            password: args.password,
            email: args.email,
            phoneNumber: args.phoneNumber,
            address: args.address,
          },
        });

        const cache = await redis.get("users");
        if (cache) {
          await redis.del("users");
        }
        args._id = data.insertedId;
        args.role = "admin";
        return args;
      } catch (error) {
        throw error.response.data.message;
      }
    },

    deleteUser: async (_, args) => {
      try {
        const { data } = await axios({
          url: url + `/${args.id}`,
          method: "DELETE",
        });

        const cache = await redis.get("users");
        if (cache) {
          await redis.del("users");
        }
        console.log(data);
        return { message: data.deletedCount };
      } catch (error) {
        throw error.response.data.message;
      }
    },
  },
};

module.exports = { userTypeDefs, userResolvers };
