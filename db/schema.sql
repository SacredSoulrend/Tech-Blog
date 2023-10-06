CREATE DATABASE my_blog_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  userId INT,
  FOREIGN KEY (userId) REFERENCES users(id)
);

CREATE TABLE comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  text TEXT NOT NULL,
  userId INT,
  blogPostId INT,
  FOREIGN KEY (userId) REFERENCES users(id),
  FOREIGN KEY (blogPostId) REFERENCES blog_posts(id)
);
