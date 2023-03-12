const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
const debtRoute = require("./routes/debt");
const expenseRoute = require("./routes/expense");
const authRoute = require("./routes/auth");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

//middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());

app.use("/api", userRoute);
app.use("/api", expenseRoute);
app.use("/api", debtRoute);
app.use("/api/auth", authRoute);

app.get("/", async (req, res) => {
  res.send({ message: "Server Running" });
});

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server started on port " + process.env.PORT);
});
