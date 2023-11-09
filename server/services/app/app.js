if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 4002;
const cors = require("cors");
const index = require("./routes/index");
const public = require("./routes/public");
const errorHandler = require("./middleware/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from RMT40 - Kurnia Massidik!");
});

app.use("/public", public);
app.use("/api", index);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
