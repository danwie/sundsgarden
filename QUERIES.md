**1.**

```sql
SELECT "Author"."id", "Author"."name", "books"."id" AS "books.id", "books"."title" AS "books.title", "books"."genre" AS "books.genre", "books"."published_year" AS "books.published_year", "books"."author_id" AS "books.author_id" FROM "authors" AS "Author" LEFT OUTER JOIN "books" AS "books" ON "Author"."id" = "books"."author_id" WHERE "Author"."id" = '1';
```

My query:

```sql
SELECT authors.id, authors.name, books.id, books.title, books.genre, books.published_year, books.author_id FROM authors LEFT JOIN books ON authors.id = books.author_id WHERE authors.id = 1;
```

**2.**

```sql
SELECT "id", "name" FROM "members" AS "Member" WHERE "Member"."id" = '1';
```

```sql
SELECT "Loan"."id", "Loan"."member_id", "Loan"."book_id", "Loan"."loan_date", "Loan"."returned_at", "book"."id" AS "book.id", "book"."title" AS "book.title", "book"."genre" AS "book.genre", "book"."published_year" AS "book.published_year", "book"."author_id" AS "book.author_id" FROM "loans" AS "Loan" LEFT OUTER JOIN "books" AS "book" ON "Loan"."book_id" = "book"."id" WHERE "Loan"."member_id" = '1';
```

My query:

```sql
SELECT members.id, members.name, loans.id, loans.member_id, loans.book_id, loans.loan_date, loans.returned_at, books.id, books.title, books.genre, books.published_year, books.author_id FROM members LEFT JOIN loans ON loans.member_id = members.id LEFT JOIN books ON books.id = loans.book_id WHERE members.id = 1;
```

**3.**

Sequeuelize choose LEFT OUTER JOIN to be safe. Reason: if a INNER JOIN was used then there would be a risk that some books or authors would not be returned. Example: Book.findAll should return books even though a book doesn't have an author. If I use include where or if I use required: true, then I can force to use a INNER JOIN.
