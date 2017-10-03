CREATE TABLE albums (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  join_date DATE DEFAULT current_date
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  album INT REFERENCES albums(id),
  author INT REFERENCES users(id),
  content TEXT NOT NULL,
  review_date DATE DEFAULT current_date
);
