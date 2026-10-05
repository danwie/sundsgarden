-- One to one
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
)

INSERT INTO users (firstname, email)
VALUES
('Vera Larsson', 'vera@gmail.com'),
('Alexander Larsson', 'alexander@gmail.com');

SELECT * FROM users;

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE,
  bio TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO users (name, email) VALUES ('Michiel', 'michiel.vandergragt@sundsgarden.se');

INSERT INTO profiles (user_id, bio) VALUES (4, 'loves coding');

SELECT users.name, profiles.bio
FROM USERS
JOIN profiles ON users.id = profiles.user_id

-- One to many
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR (100),
  author_id INT,
  FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO authors (name) VALUES (
  'J.K. Rowling'
);

INSERT INTO books(title, author_id) VALUES
  ('Harry Potter', 1),
  ('Fantastic Beasts', 1);

SELECT authors.name, books.title
  FROM authors
  JOIN books ON authors.id = books.author_id;

-- Many to many
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100)
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100)
);

CREATE TABLE student_courses (
  student_id INT,
  course_id INT,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

INSERT INTO students (name) VALUES ('Tom'), ('Sara');
INSERT INTO courses (title) VALUES ('Math'), ('Science');
INSERT INTO student_courses (student_id, course_id) VALUES (1,1), (1,2), (2,1);

SELECT students.name, courses.title
FROM students
JOIN student_courses ON students.id = student_courses.student_id
JOIN courses ON courses.id = student_courses.course_id;

-- Break it
INSERT INTO books(title, author_id)
VALUES ('The Bible', 2);

-- ERROR:  insert or update on table "books" violates foreign key constraint "books_author_id_fkey"
-- Key (author_id)=(2) is not present in table "authors". 
-- SQL state: 23503
-- Detail: Key (author_id)=(2) is not present in table "authors".

INSERT INTO student_courses (student_id, course_id)
VALUES (1,1);

-- ERROR:  duplicate key value violates unique constraint "student_courses_pkey"
-- Key (student_id, course_id)=(1, 1) already exists. 
-- SQL state: 23505
-- Detail: Key (student_id, course_id)=(1, 1) already exists.