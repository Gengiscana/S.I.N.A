
DROP DATABASE IF EXISTS sina;

CREATE DATABASE sina;

USE sina;

-- =========================
-- ALUNO
-- =========================

CREATE TABLE aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- =========================
-- PROFESSOR
-- =========================

CREATE TABLE professor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- =========================
-- SALA
-- =========================

CREATE TABLE sala (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    materia VARCHAR(100) NOT NULL
);

-- =========================
-- ALUNO_SALA
-- Relaciona alunos e salas
-- =========================

CREATE TABLE aluno_sala (
    aluno_id INT NOT NULL,
    sala_id INT NOT NULL,

    PRIMARY KEY (aluno_id, sala_id),

    FOREIGN KEY (aluno_id)
        REFERENCES aluno(id)
        ON DELETE CASCADE,

    FOREIGN KEY (sala_id)
        REFERENCES sala(id)
        ON DELETE CASCADE
);

-- =========================
-- PROFESSOR_SALA
-- Relaciona professores e salas
-- =========================

CREATE TABLE professor_sala (
    professor_id INT NOT NULL,
    sala_id INT NOT NULL,

    PRIMARY KEY (professor_id, sala_id),

    FOREIGN KEY (professor_id)
        REFERENCES professor(id)
        ON DELETE CASCADE,

    FOREIGN KEY (sala_id)
        REFERENCES sala(id)
        ON DELETE CASCADE
);

-- =========================
-- QUESTAO
-- =========================

CREATE TABLE questao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sala_id INT NOT NULL,
    questao TEXT NOT NULL,

    UNIQUE (sala_id, id),

    FOREIGN KEY (sala_id)
        REFERENCES sala(id)
        ON DELETE CASCADE
);

-- =========================
-- ALTERNATIVA
-- =========================

CREATE TABLE alternativa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    questao_id INT NOT NULL,
    texto_alternativa TEXT NOT NULL,
    is_correta BOOLEAN NOT NULL DEFAULT FALSE,

    UNIQUE (id, questao_id),

    FOREIGN KEY (questao_id)
        REFERENCES questao(id)
        ON DELETE CASCADE
);

-- =========================
-- RESPOSTA_ALUNO
-- =========================

CREATE TABLE resposta_aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    sala_id INT NOT NULL,
    questao_id INT NOT NULL,
    alternativa_id INT NOT NULL,

    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Uma resposta por aluno em cada questão
    UNIQUE (aluno_id, questao_id),

    -- O aluno precisa estar matriculado na sala
    FOREIGN KEY (aluno_id, sala_id)
        REFERENCES aluno_sala(aluno_id, sala_id)
        ON DELETE CASCADE,

    -- A questão precisa pertencer à sala
    FOREIGN KEY (sala_id, questao_id)
        REFERENCES questao(sala_id, id)
        ON DELETE CASCADE,

    -- A alternativa precisa pertencer à questão
    FOREIGN KEY (alternativa_id, questao_id)
        REFERENCES alternativa(id, questao_id)
        ON DELETE CASCADE
);

-- ===== Dados de teste =====
 
INSERT INTO aluno (nome, email, senha) VALUES
('Ana Souza',     'ana@teste.com',     '123456'),
('Bruno Lima',    'bruno@teste.com',   '123456'),
('Carla Mendes',  'carla@teste.com',   '123456');
 
INSERT INTO professor (nome, email, senha) VALUES
('Prof. Ricardo Alves', 'ricardo@teste.com', 'prof123'),
('Profa. Marina Costa', 'marina@teste.com',  'prof123');
 
INSERT INTO sala (aluno_id, professor_id, materia) VALUES
(1, 1, 'Matemática'),
(2, 1, 'Matemática'),
(1, 2, 'História'),
(3, 2, 'Geografia');
 
INSERT INTO questao (sala_id, questao, gabarito) VALUES
(1, 'Quanto é 7 x 8?', '56'),
(1, 'Qual é a raiz quadrada de 144?', '12'),
(2, 'Resolva: 2x + 4 = 10', 'x = 3'),
(3, 'Em que ano começou a Primeira Guerra Mundial?', '1914'),
(3, 'Quem proclamou a Independência do Brasil?', 'Dom Pedro I'),
(4, 'Qual é a capital da Austrália?', 'Camberra');