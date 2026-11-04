CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    genre VARCHAR(50),
    published_year INT
);

INSERT INTO books (title, genre, published_year)
VALUES
('The Hobbit', 'fantasy', 1937),
('1984', 'dystopian', 1949),
('Pippi Longstocking', 'children', 1945),
('The Hunger Games', 'dystopian', 2008);

CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

-- note: author_id can be NULL
ALTER TABLE books ADD COLUMN author_id INT REFERENCES authors(id);
CREATE TABLE members (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE loans (
  id SERIAL PRIMARY KEY,
  member_id INT NOT NULL REFERENCES members(id),
  book_id INT NOT NULL REFERENCES books(id),
  loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
  returned_at DATE
);

INSERT INTO authors (name)
VALUES
('J.R.R. Tolkien'),
('George Orwell'),
('Astrid Lindgren'),
('Suzanne Collins');

UPDATE books SET author_id = 1 WHERE title = 'The Hobbit';
UPDATE books SET author_id = 2 WHERE title = '1984';
UPDATE books SET author_id = 3 WHERE title = 'Pippi Longstocking';
UPDATE books SET author_id = 4 WHERE title = 'The Hunger Games';

INSERT INTO members (name)
VALUES
('Bob Andersson'),
('Laura Eriksson');

INSERT INTO loans (member_id, book_id, loan_date, returned_at)
VALUES
(1, 1, '2026-10-01', '2026-11-02'),
(1, 2, '2026-11-01', NULL);
