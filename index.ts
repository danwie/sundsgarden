import express from "express";
import dotenv from "dotenv";
import { pool } from "./db.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "Welcome. This is the place to be." });
});

app.get("/books", async (req, res) => {
  const { genre, sort } = req.query;
  try {
    let query = "SELECT * FROM books";

    if (genre) {
      query += " WHERE genre = $1";
    }

    if (sort) {
      const allowedSorts = ["title", "published_year", "genre"];
      if (!allowedSorts.includes(sort)) {
        return res.status(400).send("blasphemy sorting");
      }
      query += ` ORDER BY ${sort}`;
    }

    const result = await pool.query(query, genre ? [genre] : []);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/*
app.post("/books", async (req, res) => {
  const { title, genre, published_year } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: "Title missing" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO books (title, genre, published_year) VALUES ($1, $2, $3) RETURNING *",
      [title, genre, published_year],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
*/

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || !Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  const { title, genre, published_year } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: "Title missing" });
  }

  try {
    const result = await pool.query(
      "UPDATE books SET title = $1, genre = $2, published_year = $3 WHERE id = $4 RETURNING *",
      [title, genre, published_year, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || !Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Id is not a number" });
  }
  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send("Book deleted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || !Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Id is not a number" });
  }
  try {
    const result = await pool.query("SELECT * FROM BOOKS WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.patch("/books/:id", async (req, res) => {
  const { id } = req.params;
  if (!id || !Number.isInteger(Number(id))) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  const { title, genre, published_year } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: "Title missing" });
  }

  try {
    const result = await pool.query(
      "UPDATE books SET title = COALESCE($1, title), genre = COALESCE($2, genre), published_year = COALESCE($3, published_year) WHERE id = $4 RETURNING *",
      [title, genre, published_year, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
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
    res.status(500).send(error.message);
  }
});

app.post("/books", async (req, res) => {
  const { title, genre, published_year, author_id } = req.body;
  if (!title || title === "") {
    return res.status(400).json({ error: "Title missing" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO books (title, genre, published_year, author_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, genre, published_year, author_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === "23503") {
      return res.status(400).json({ error: "Author does not exists" });
    }
    res.status(500).send(error.message);
  }
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
