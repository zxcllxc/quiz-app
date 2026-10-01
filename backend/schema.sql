CREATE TABLE categories (id SERIAL PRIMARY KEY, name VARCHAR(50) NOT NULL);
CREATE TABLE quizzes (id SERIAL PRIMARY KEY, title VARCHAR(100) NOT NULL,
  category_id INT REFERENCES categories(id), time_limit_sec INT NOT NULL DEFAULT 120);
CREATE TABLE questions (id SERIAL PRIMARY KEY, quiz_id INT REFERENCES quizzes(id),
  text TEXT NOT NULL, option_a TEXT, option_b TEXT, option_c TEXT, option_d TEXT,
  correct_index INT NOT NULL);
CREATE TABLE results (id SERIAL PRIMARY KEY, quiz_id INT REFERENCES quizzes(id),
  nickname VARCHAR(20) NOT NULL, score INT NOT NULL, total INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW());
