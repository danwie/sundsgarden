import express from "express";
import { ForeignKeyConstraintError } from "sequelize";
import { pool } from "./db.js";
import sequelize from "./sequelize.js";
import Book from "./models/Book.js";

const app = express();
app.use(express.json());

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

const isValidId = (id: string | undefined) =>
  !!id && Number.isInteger(Number(id));

const bookNotFound = (id: string) => ({
  error: `Book with id ${id} not found`,
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.get("/", async (req, res) => {
  res.json({ message: "Welcome. This is the place to be." });
});

app.get("/books", async (req, res) => {
  const { genre, sort } = req.query;
  try {
    const options: any = {};

    if (genre) {
      options.where = { genre: String(genre) };
    }

    if (sort) {
      const allowedSorts = ["title", "published_year", "genre"];
      if (!allowedSorts.includes(String(sort))) {
        return res.status(400).send("blasphemy sorting");
      }
      options.order = [[String(sort), "ASC"]];
    }

    const books = await Book.findAll(options);
    res.json(books);
  } catch (error) {
    res.status(500).send(errorMessage(error));
  }
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json(bookNotFound(id));
    }
    res.json(book);
  } catch (error) {
    res.status(500).send(errorMessage(error));
  }
});

app.post("/books", async (req, res) => {
  const { title, genre, published_year, author_id } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: "Title missing" });
  }

  try {
    const book = await Book.create({ title, genre, published_year, author_id });
    res.status(201).json(book);
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      return res.status(400).json({ error: "Author does not exists" });
    }
    res.status(500).send(errorMessage(error));
  }
});

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  const { title, genre, published_year } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: "Title missing" });
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json(bookNotFound(id));
    }
    await book.update({
      title,
      genre: genre ?? null,
      published_year: published_year ?? null,
    });
    res.json(book);
  } catch (error) {
    res.status(500).send(errorMessage(error));
  }
});

app.patch("/books/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  const { title, genre, published_year } = req.body;
  if (title !== undefined && title === "") {
    return res.status(400).json({ error: "Title cannot be empty" });
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json(bookNotFound(id));
    }
    const changes: any = {};
    if (title !== undefined) changes.title = title;
    if (genre !== undefined) changes.genre = genre;
    if (published_year !== undefined) changes.published_year = published_year;

    await book.update(changes);
    res.json(book);
  } catch (error) {
    res.status(500).send(errorMessage(error));
  }
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }
  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json(bookNotFound(id));
    }
    await book.destroy();
    return res.status(200).send("Book deleted");
  } catch (error) {
    res.status(500).send(errorMessage(error));
  }
});

app.get("/authors", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/authors", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name missing" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO authors (name) VALUES ($1) RETURNING *",
      [name],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/authors/:id/books", async (req, res) => {
  const { id } = req.params;
  if (!id || !Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  try {
    const result = await pool.query(
      `SELECT * FROM books 
       JOIN authors ON books.author_id = authors.id 
       WHERE authors.id = $1`,
      [id],
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(errorMessage(error));
  }
});

await testDbConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
