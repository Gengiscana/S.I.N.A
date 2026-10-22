drop database if exists sina;

create database sina;

use sina;

create table cadastro(
    id int (11) primary key not null auto_increment,
    email varchar(100) not null,
    senha varchar(50) not null
);
create table aluno(
    id
);
create table professor(

);

create table turma(
    id int primary key not null auto_increment,
    aluno_id
    professor_id int not null,
    materia varchar(100) not null
);
create table questao(
    id int primary key not null auto_increment,
    sala_id int not null,
    questao text not null,
    resposta text not null
);