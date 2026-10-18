// Bun loads .env, so dotenv is not needed - yay
import express from "express";
import mongoose from "mongoose";
import Book from "./models/Book.js";
const port = 3000;

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI!) // ! betyder, lita på att den finns i .env
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to get books" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to post a book" });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
