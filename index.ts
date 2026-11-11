import "./instrument.js";
import * as Sentry from "@sentry/node";
import express from "express";
import { ForeignKeyConstraintError } from "sequelize";
import sequelize from "./sequelize.js";
import { Book, Author, Member, Loan } from "./models/relations.js";
import { reportError } from "./utils/reportError.js";

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

// ---------- Books ----------

app.get("/books", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Fetch books route",
    level: "info",
  });
  const { genre, sort } = req.query;
  try {
    const options: any = {
      include: [{ model: Author, as: "author", attributes: ["id", "name"] }],
    };

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
    reportError(error, "books");
    res.status(500).send(errorMessage(error));
  }
});

app.get("/books/:id", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Get book by id route",
    level: "info",
  });
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
    reportError(error, "books");
    res.status(500).send(errorMessage(error));
  }
});

app.post("/books", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Post new book route",
    level: "info",
  });
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
    reportError(error, "books");
    res.status(500).send(errorMessage(error));
  }
});

app.put("/books/:id", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Replace book by id route",
    level: "info",
  });
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
    reportError(error, "books");
    res.status(500).send(errorMessage(error));
  }
});

app.patch("/books/:id", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Edit book by id route",
    level: "info",
  });
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
    reportError(error, "books");
    res.status(500).send(errorMessage(error));
  }
});

app.delete("/books/:id", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Delete book by id route",
    level: "info",
  });
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
    reportError(error, "books");
    res.status(500).send(errorMessage(error));
  }
});

// ---------- Authors ----------

app.get("/authors", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Get authors route",
    level: "info",
  });
  try {
    const authors = await Author.findAll();
    res.json(authors);
  } catch (error) {
    reportError(error, "authors");
    res.status(500).send(errorMessage(error));
  }
});

app.post("/authors", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Create author route",
    level: "info",
  });
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name missing" });
  }

  try {
    const author = await Author.create({ name });
    res.status(201).json(author);
  } catch (error) {
    reportError(error, "authors");
    res.status(500).send(errorMessage(error));
  }
});

app.get("/authors/:id/books", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Get books from author route",
    level: "info",
  });
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  try {
    const author: any = await Author.findByPk(id, {
      include: [{ model: Book, as: "books" }],
    });
    if (!author) {
      return res.status(404).json({ error: `Author with id ${id} not found` });
    }
    res.json(author.books);
  } catch (error) {
    reportError(error, "authors");
    res.status(500).send(errorMessage(error));
  }
});

// ---------- Loans ----------

app.post("/loans", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Create loan route",
    level: "info",
  });
  const { member_id, book_id } = req.body;
  if (!isValidId(String(member_id)) || !isValidId(String(book_id))) {
    return res
      .status(400)
      .json({ error: "member_id and book_id must be numbers" });
  }

  try {
    const member = await Member.findByPk(member_id);
    if (!member) {
      return res
        .status(404)
        .json({ error: `Member with id ${member_id} not found` });
    }

    const book = await Book.findByPk(book_id);
    if (!book) {
      return res.status(404).json(bookNotFound(String(book_id)));
    }

    const activeLoan = await Loan.findOne({
      where: { book_id, returned_at: null },
    });
    if (activeLoan) {
      return res.status(409).json({ error: "Book is already on loan" }); // om boken redan är utlånad
    }

    const loan = await Loan.create({ member_id, book_id });
    res.status(201).json(loan);
  } catch (error) {
    reportError(error, "loans");
    res.status(500).send(errorMessage(error));
  }
});

app.get("/members/:id/loans", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Get loans for member route",
    level: "info",
  });
  const { id } = req.params;
  if (!isValidId(id)) {
    return res.status(400).json({ error: "Id is not a number" });
  }

  try {
    const member = await Member.findByPk(id);
    if (!member) {
      return res.status(404).json({ error: `Member with id ${id} not found` });
    }

    const loans = await Loan.findAll({
      where: { member_id: id },
      include: [{ model: Book, as: "book" }],
    });
    res.json(loans);
  } catch (error) {
    reportError(error, "loans");
    res.status(500).send(errorMessage(error));
  }
});

app.get("/loans/active", async (req, res) => {
  Sentry.addBreadcrumb({
    message: "Get active loans route",
    level: "info",
  });
  try {
    const loans = await Loan.findAll({
      where: { returned_at: null },
      include: [
        { model: Book, as: "book" },
        { model: Member, as: "member" },
      ],
    });
    res.json(loans);
  } catch (error) {
    reportError(error, "loans");
    res.status(500).send(errorMessage(error));
  }
});

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

// setupExpressErrorHandler is marked deprecated
Sentry.setupExpressErrorHandler(app);

await testDbConnection();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
