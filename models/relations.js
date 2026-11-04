import Author from "./Author.js";
import Book from "./Book.js";
import Member from "./Member.js";
import Loan from "./Loan.js";

// One author has many books, each book belongs to one author
Author.hasMany(Book, { foreignKey: "author_id", as: "books" });
Book.belongsTo(Author, { foreignKey: "author_id", as: "author" });

// Many-to-many: members and books through loans
Member.belongsToMany(Book, {
  through: Loan,
  foreignKey: "member_id",
  otherKey: "book_id",
  as: "books",
});
Book.belongsToMany(Member, {
  through: Loan,
  foreignKey: "book_id",
  otherKey: "member_id",
  as: "members",
});

// Direct links to Loan, so a loan can include its book or member
Member.hasMany(Loan, { foreignKey: "member_id", as: "loans" });
Loan.belongsTo(Member, { foreignKey: "member_id", as: "member" });
Book.hasMany(Loan, { foreignKey: "book_id", as: "loans" });
Loan.belongsTo(Book, { foreignKey: "book_id", as: "book" });

export { Author, Book, Member, Loan };
