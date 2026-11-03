import Author from "./Author.js";
import Book from "./Book.js";

// en författare har många böcker, en bok tillhör en författare
Author.hasMany(Book, { foreignKey: "author_id", as: "books" });
Book.belongsTo(Author, { foreignKey: "author_id", as: "author" });

export { Author, Book };
