const { MongoClient } = require("mongodb");
const bcrypt = require('bcrypt');
const uri = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(uri);
const dbName = "rmt40";

const dataToSeed = [
  {
    username: "admin",
    email: "admin@admin.com",
    password: "12345",
    phoneNumber: "088812341234",
    address: "Jawa Barat",
  },
];

async function seedData() {
  const db = client.db(dbName);
  const collection = db.collection("users");

  try {

    dataToSeed.map(el => {
      el.password = bcrypt.hashSync(el.password,10)
      return el
    })

    const result = await collection.insertMany(dataToSeed);
    console.log(result.insertedIds);
    await client.close();
  } catch (err) {
    console.error("Error inserting documents:", err);
  }
}

seedData();