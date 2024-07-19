import mongoose from "mongoose";

const connection = mongoose
  .connect("mongodb://127.0.0.1:27017/saraha_db")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
