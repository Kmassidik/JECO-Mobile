if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4001;
const cors = require("cors");
const index = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const database = require("./config/mongo");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from RMT40 - Kurnia Massidik!");
});

app.use("/users", index);
app.use(errorHandler);

async function startMongo() {
  try {
    console.log('starting mongoDB');
    await database.initialize();
  } catch (error) {
    console.log(error, "<== EROR");
  }
}

async function stopMongo() {
  try {
    await database.closeConnection();
  } catch (error) {
    console.log(error);
  }
}
startMongo().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
