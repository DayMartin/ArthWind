-- Criação do banco de dados, caso não exista
CREATE DATABASE IF NOT EXISTS musicalidade;

-- Seleção do banco de dados para operações subsequentes
USE musicalidade;

-- Criação da tabela 'musico', se não existir
CREATE TABLE IF NOT EXISTS musico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  fullName VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  valorEvento INT NOT NULL
);

-- Inserção do administrador na tabela 'musico'
INSERT INTO musico (fullName, email, senha, type, status, valorEvento)
VALUES 
  ('Administrador2', 'adm2@gmail.com', 'senha123', 'admin', 'Ativo', 1000);
