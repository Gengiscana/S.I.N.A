drop database if exists sina;

create database sina;

use sina;

create table aluno(
    id int (11) primary key not null auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null, 
    senha varchar(50) not null
);
create table professor(
    id int (11) primary key not null auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null, 
    senha varchar(50) not null
);

create table sala(
    id int primary key not null auto_increment,
    aluno_id int not null,
    professor_id int not null,
    materia varchar(100) not null,
    foreign key (aluno_id) references aluno(id) on delete cascade,
    foreign key (professor_id) references professor(id) on delete cascade
);
create table questao(
    id int primary key not null auto_increment,
    sala_id int not null,
    questao text not null,
    resposta text not null,
    foreign key (sala_id) references sala(id) on delete cascade
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
 
INSERT INTO questao (sala_id, questao, resposta) VALUES
(1, 'Quanto é 7 x 8?', '56'),
(1, 'Qual é a raiz quadrada de 144?', '12'),
(2, 'Resolva: 2x + 4 = 10', 'x = 3'),
(3, 'Em que ano começou a Primeira Guerra Mundial?', '1914'),
(3, 'Quem proclamou a Independência do Brasil?', 'Dom Pedro I'),
(4, 'Qual é a capital da Austrália?', 'Camberra');