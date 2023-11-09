const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
// const uri = "mongodb://127.0.0.1:27017/";
// const dbName = "rmt40";
const uri = process.env.MONGO_URL
const dbName = "rmt40";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function initialize() {
    try {
        await client.connect()
    } catch (error) {
        console.log(error,"Error connecting to the database")
        throw error
    }
}

async function closeConnection() {
    try {
        await client.close()
    } catch (error) {
        console.log(error,"Error close connecting to the database")
        throw error
    }
}


const db = client.db(dbName)

module.exports = {
    initialize,
    closeConnection,
    db
}