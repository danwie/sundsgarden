// Bun loads .env, so dotenv is not needed - yay
import express from "express";
import Author from "./models/Author.ts";
import Book from "./models/Book.ts";
import "./db.ts";
const port = 3000;

const app = express();

app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const { genre, sort } = req.query as { genre?: any; sort?: string };
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const filter = genre ? { genre } : {};

    // skip: documents to skip (all previous pages); limit: documents per page
    const skip = (page - 1) * limit;

    const [total, data] = await Promise.all([
      Book.countDocuments(filter),
      Book.find(filter).populate("author").sort(sort).skip(skip).limit(limit),
    ]);

    res.json({ page, limit, total, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ message: "Book deleted", book: deletedBook });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/authors", async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.json(newAuthor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/authors/:id/books", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.id });
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
