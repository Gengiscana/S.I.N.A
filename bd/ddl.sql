drop database if exists sina;

create database sina;

use sina;

create table cadastro(
    id int (11) primary key not null auto_increment
    email varchar(100) not null,
    senha varchar(50) not null,
    status enum ('PROFESSOR', 'ALUNO')
);


