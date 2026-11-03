Skill 1: Understand the ORM

1. It translates between JavaScript/TypeScript and SQL
2. Object Relational Mapper. An object is like a row in a table. Relational is the database, with relations between tables. The mapper translates between the two.
3. select * from books, select * from books where id = 3;
4. Extra info for sequelize. host is like a address and port is like a door number. dialect ? what kind of database. logging is used to enable/disable logging (this is optional).
5. Sync creates the tables that are missing. Sync force first deletes all existing tables, then creates them again.
6. When needing complex answers (several joins, group by, having, subqueries) then ORM is not sufficient. Also, ORM can give slow queries.

Skill 4: Loan is a junction table. If the loan date was on book, then every member that loans the book would have the same loan date. If the loan date was on member, then every member could only have one loan date.
