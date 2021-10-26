/** @format */

import express from "express";
import mongoose from "mongoose";
import data from "./data.js";
import userRouter from "./routers/userRouter.js";

const app = express();
// eslint-disable-next-line no-undef
mongoose.connect(
  // eslint-disable-next-line no-undef
  process.env.MONGODB_URL || "mongodb://localhost/tesla-amazona",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
// eslint-disable-next-line no-unused-vars
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
