import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI!) // lita på att den finns
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));
