const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

//middleware
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send({ message: "Server Running" });
});

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server started");
});
