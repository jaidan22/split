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
const groupRoute = require("./routes/group");

// CONNECT WITH DB
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log(err));

// middleware
app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
});

app.use(cookieParser());

// ROUTES
app.use("/api", userRoute);
app.use("/api", expenseRoute);
app.use("/api", debtRoute);
app.use("/api", groupRoute);
app.use("/api/auth", authRoute);

app.get("/", async (req, res) => {
  res.send({ message: "Server Running" });
});

app.listen(process.env.PORT || 8800, () => {
  console.log("Backend server started on port " + process.env.PORT);
});
