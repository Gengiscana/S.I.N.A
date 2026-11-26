DROP DATABASE IF EXISTS sina;
CREATE DATABASE sina;
USE sina;

CREATE TABLE sala (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sala_id INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    UNIQUE (id, sala_id),
    FOREIGN KEY (sala_id)
        REFERENCES sala(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE professor (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

CREATE TABLE materia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE sala_materia (
    sala_id INT NOT NULL,
    materia_id INT NOT NULL,

    PRIMARY KEY (sala_id, materia_id),

    FOREIGN KEY (sala_id)
        REFERENCES sala(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (materia_id)
        REFERENCES materia(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE professor_materia_sala (
    professor_id INT NOT NULL,
    sala_id INT NOT NULL,
    materia_id INT NOT NULL,

    PRIMARY KEY (professor_id, sala_id, materia_id),

    FOREIGN KEY (professor_id)
        REFERENCES professor(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (sala_id, materia_id)
        REFERENCES sala_materia(sala_id, materia_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE questao (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sala_id INT NOT NULL,
    materia_id INT NOT NULL,
    professor_id INT NOT NULL,
    enunciado TEXT NOT NULL,
    UNIQUE (id, sala_id),

    FOREIGN KEY (sala_id, materia_id)
        REFERENCES sala_materia(sala_id, materia_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (professor_id, sala_id, materia_id)
        REFERENCES professor_materia_sala(professor_id, sala_id, materia_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE alternativa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    questao_id INT NOT NULL,
    texto_alternativa TEXT NOT NULL,
    is_correta BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (id, questao_id),

    FOREIGN KEY (questao_id)
        REFERENCES questao(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE resposta_aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    sala_id INT NOT NULL,
    questao_id INT NOT NULL,
    alternativa_id INT NOT NULL,
    data_envio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (aluno_id, questao_id),

    FOREIGN KEY (aluno_id, sala_id)
        REFERENCES aluno(id, sala_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (questao_id, sala_id)
        REFERENCES questao(id, sala_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (alternativa_id, questao_id)
        REFERENCES alternativa(id, questao_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

INSERT INTO sala (nome) VALUES
('1A'),
('1B'),
('2A'),
('2C');

INSERT INTO aluno (sala_id, nome, email, senha) VALUES
(1, 'João Silva', 'joao@email.com', 'HASH_DA_SENHA'),
(1, 'Maria Souza', 'maria@email.com', 'HASH_DA_SENHA'),
(2, 'Pedro Santos', 'pedro@email.com', 'HASH_DA_SENHA'),
(3, 'Lucas Oliveira', 'lucas@email.com', 'HASH_DA_SENHA');

INSERT INTO professor (nome, email, senha) VALUES
('Carlos Mendes', 'carlos@email.com', 'HASH_DA_SENHA'),
('Ana Ferreira', 'ana@email.com', 'HASH_DA_SENHA');

INSERT INTO materia (nome) VALUES
('Matemática'),
('História'),
('Física'),
('Português');

INSERT INTO sala_materia (sala_id, materia_id) VALUES
(1, 1),
(1, 2),
(1, 4),
(2, 1),
(2, 2),
(3, 1),
(3, 3),
(4, 2),
(4, 4);

INSERT INTO professor_materia_sala
(professor_id, sala_id, materia_id) VALUES
(1, 1, 1),
(1, 2, 1),
(1, 3, 3),
(2, 1, 2),
(2, 4, 2),
(2, 1, 4);
<<<<<<< HEAD

INSERT INTO questao
(sala_id, materia_id, professor_id, enunciado) VALUES
(1, 4, 2, 'Qual das opções abaixo apresenta uma figura de linguagem?'), 
(1, 1, 1, 'Quanto é 2 + 2 * 2?'),
(2, 1, 1, 'Resolva a equação do segundo grau: x^2 - 5x + 6 = 0'),
(3, 3, 1, 'Qual é a unidade de medida da força no Sistema Internacional?'),
(1, 2, 2, 'Em que ano ocorreu a Proclamação da República no Brasil?');

INSERT INTO alternativas 
(questao_id, texto_alternativa, is_correta) VALUES
(1, 'Metáfora', 1),
(1, 'Fotossíntese', 0),
(1, 'Gravidade', 0),
(2, '6', 0),
(2, '8', 0),
(2, '4', 1),
(3, 'x = 2 e x = 3', 1),
(3, 'x = -2 e x = -3', 0),
(4, 'Joule', 0),
(4, 'Newton', 1),
(4, 'Watt', 0),
(5, '1500', 0),
(5, '1822', 0),
(5, '1889', 1);

INSERT INTO resposta_aluno
(aluno_id, sala_id, questao_id, alternativa_id) VALUES
(1, 1, 1, 1),
(2, 1, 1, 2),
(3, 2, 3, 7),
(1, 1, 2, 6);
=======
>>>>>>> 36cf8633836e31e49b0870e6e4d33930316a5db7
