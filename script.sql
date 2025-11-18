CREATE DATABASE db_kelvyn 
    CHARACTER SET utf8mb4 
    COLLATE utf8mb4_unicode_ci;
USE db_kelvyn;
CREATE TABLE alunos (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    usuario_acesso VARCHAR(100) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    email_aluno VARCHAR(255) NOT NULL UNIQUE,
    observacao TEXT,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);