<a id="readme-top"></a>

<div align="center">

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]

</div>

<br />
<div align="center">
  <a href="https://github.com/Gengiscana/S.I.N.A">
    <img src="images/sinawithoutbackground.png" alt="Logo" width="120" height="120">
  </a>

<h3 align="center">S.I.N.A</h3>

  <p align="center">
    <strong>Sistema Integrado de Aprendizagem Ativa</strong>
    <br />
    Uma solução de engajamento educacional baseada em visão computacional para a rede SESI.
    <br />
    <br />
    <a href="https://github.com/Gengiscana/S.I.N.A">Explorar Docs</a>
    ·
    <a href="https://github.com/Gengiscana/S.I.N.A/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/Gengiscana/S.I.N.A/issues">Sugestões</a>
  </p>
</div>

<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o Projeto</a>
      <ul>
        <li><a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#primeiros-passos">Primeiros Passos</a>
      <ul>
        <li><a href="#pré-requisitos">Pré-requisitos</a></li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#funcionalidades">Funcionalidades</a></li>
    <li><a href="#requisitos-não-funcionais">Requisitos Não Funcionais</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contribuição">Contribuição</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

## Sobre o Projeto

O **S.I.N.A** é um sistema inovador que utiliza visão computacional para coletar respostas em sala de aula de forma instantânea e lúdica. Inspirado no sistema Plickers, o projeto foi adaptado para a realidade tecnológica e pedagógica da rede SESI.

**O Problema:** A necessidade de engajamento ativo sem depender de celulares individuais (em conformidade com a Lei 15.100/2025).
**A Solução:** Um sistema centralizado composto por uma câmera, um tripé e cartões de MDF fabricados via corte a laser (Maker).

### Como funciona:
* **Hardware:** Uma câmera posicionada à frente da sala escaneia os cartões levantados pelos alunos.
* **Processamento Local:** Os dados são buscados em um servidor local (**Raspberry Pi**) para garantir autonomia e velocidade.
* **Dados:** O sistema gera relatórios automáticos para o professor e alimenta rankings de desempenho integrados ao **Power BI**.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

### Tecnologias Utilizadas

* [![OpenCV][OpenCV-badge]][OpenCV-url]
* [![Python][Python-badge]][Python-url]
* [![RaspberryPi][Raspberry-badge]][Raspberry-url]
* [![PowerBI][PowerBI-badge]][PowerBI-url]

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Primeiros Passos

Para rodar o ambiente de desenvolvimento ou instalar na rede escolar, siga os passos abaixo.

### Pré-requisitos

* Câmera USB ou Módulo de Câmera Raspberry Pi.
* Python 3.10+ instalado.
* Cartões de marcadores visuais (arquivos de corte inclusos na pasta `/maker`).

### Instalação

1. Clone o repositório
   ```sh
   git clone [https://github.com/Gengiscana/S.I.N.A.git](https://github.com/Gengiscana/S.I.N.A.git)
