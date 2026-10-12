import express from "express";
import { env } from "./env.ts";
import { pool } from "./db.ts";
import { z } from "zod";
import pg from "pg";
import { bookSchema, bookPatchSchema, idSchema, type Book } from "./schemas.ts";

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : "Unknown error";
}

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ message: "Welcome." });
});

const booksSchema = z.object({
  genre: z.string().optional(),
  sort: z.enum(["title", "published_year", "genre"]).optional(),
});

app.get("/books", async (req, res) => {
  const parsed = booksSchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: "could not parse query" });
  }
  const { genre, sort } = parsed.data;

  try {
    let query = "SELECT * FROM books";

    if (genre) {
      query += " WHERE genre = $1";
    }

    if (sort) {
      query += ` ORDER BY ${sort}`;
    }

    const result = await pool.query<Book>(query, genre ? [genre] : []);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.put("/books/:id", async (req, res) => {
  const idParams = idSchema.safeParse(req.params);
  if (!idParams.success) {
    return res.status(400).json({ errors: z.flattenError(idParams.error) });
  }
  const { id } = idParams.data;

  const parsed = bookSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: z.flattenError(parsed.error) });
  }
  const { title, genre, published_year } = parsed.data;

  try {
    const result = await pool.query<Book>(
      "UPDATE books SET title = $1, genre = $2, published_year = $3 WHERE id = $4 RETURNING *",
      [title, genre, published_year, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.delete("/books/:id", async (req, res) => {
  const idParams = idSchema.safeParse(req.params);
  if (!idParams.success) {
    return res.status(400).json({ errors: z.flattenError(idParams.error) });
  }
  const { id } = idParams.data;

  try {
    const result = await pool.query<Book>(
      "DELETE FROM books WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send("Book deleted");
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.get("/books/:id", async (req, res) => {
  const idParams = idSchema.safeParse(req.params);
  if (!idParams.success) {
    return res.status(400).json({ errors: z.flattenError(idParams.error) });
  }
  const { id } = idParams.data;

  try {
    const result = await pool.query<Book>("SELECT * FROM BOOKS WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.patch("/books/:id", async (req, res) => {
  const idParams = idSchema.safeParse(req.params);
  if (!idParams.success) {
    return res.status(400).json({ errors: z.flattenError(idParams.error) });
  }
  const { id } = idParams.data;

  const parsed = bookPatchSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: z.flattenError(parsed.error) });
  }
  const { title, genre, published_year } = parsed.data;

  try {
    const result = await pool.query<Book>(
      "UPDATE books SET title = COALESCE($1, title), genre = COALESCE($2, genre), published_year = COALESCE($3, published_year) WHERE id = $4 RETURNING *",
      [title, genre, published_year, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Book not found");
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.get("/authors", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM authors");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
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
    res.status(500).send(getErrorMessage(error));
  }
});

app.get("/authors/:id/books", async (req, res) => {
  const idParams = idSchema.safeParse(req.params);
  if (!idParams.success) {
    return res.status(400).json({ errors: z.flattenError(idParams.error) });
  }
  const { id } = idParams.data;

  try {
    const result = await pool.query(
      `SELECT * FROM books 
       JOIN authors ON books.author_id = authors.id 
       WHERE authors.id = $1`,
      [id],
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(getErrorMessage(error));
  }
});

app.post("/books", async (req, res) => {
  const parsed = bookSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ errors: z.flattenError(parsed.error) });
  }
  const { title, genre, published_year, author_id } = parsed.data;

  try {
    const result = await pool.query<Book>(
      "INSERT INTO books (title, genre, published_year, author_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, genre, published_year, author_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error instanceof pg.DatabaseError && error.code === "23503") {
      return res.status(400).json({ error: "Author does not exists" });
    }
    res.status(500).send(getErrorMessage(error));
  }
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
