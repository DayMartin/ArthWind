CREATE DATABASE IF NOT EXISTS musicalidade;

USE musicalidade;

CREATE TABLE IF NOT EXISTS musicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  valorEvento INT NOT NULL
);

INSERT INTO musicos (fullName, email, senha, type, status, valorEvento)
VALUES 
  ('Administrador', 'adm@gmail.com', 'senha123', 'admin', 'Ativo', 1000);
