const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
// const uri = "mongodb+srv://devkmassidik:0mG7MwtpotdrxB22@cluster0.85gfevv.mongodb.net/?retryWrites=true&w=majority";
const uri =
  "mongodb+srv://devkmassidik:PgsBLwc1cin0u5nH@cluster0.85gfevv.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017/";
const dbName = "rmt40";

const client = new MongoClient(uri);

async function run() {
  try {
    console.log("letsgo");
    const database = client.db(dbName);
    const usersCollection = database.collection("users");

    // Query for a movie that has the title 'Back to the Future'
    const users = await usersCollection.find().toArray();
    const findData = await usersCollection.findOne({ name: "Kurnia" });

    console.log(users);
    console.log(findData);
  } catch (error) {
    console.log(error, "ini error");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://devkmassidik:0mG7MwtpotdrxB22@cluster0.85gfevv.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server    (optional starting in v4.7)
//     await client.connect();
//     console.log('start');
//     // Send a ping to confirm a successful connection
//     await client.db("rmt40").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
