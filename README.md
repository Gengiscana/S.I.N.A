<a id="readme-top"></a>

<div align="center">

  <img src="https://img.shields.io/github/contributors/Gengiscana/S.I.N.A?style=for-the-badge" alt="Contributors">
  <img src="https://img.shields.io/github/forks/Gengiscana/S.I.N.A?style=for-the-badge" alt="Forks">
  <img src="https://img.shields.io/github/stars/Gengiscana/S.I.N.A?style=for-the-badge" alt="Stars">
  <img src="https://img.shields.io/github/issues/Gengiscana/S.I.N.A?style=for-the-badge" alt="Issues">
  <img src="https://img.shields.io/github/license/Gengiscana/S.I.N.A?style=for-the-badge" alt="License">

</div>

<br />
<div align="center">
  <a href="https://github.com/Gengiscana/S.I.N.A">
    <img src="logo.png" alt="Logo" width="150">
  </a>

<h3 align="center">S.I.N.A</h3>

  <p align="center">
    <strong>Sistema Integrado de Aprendizagem Ativa</strong>
    <br />
    Engajamento educacional via visão computacional integrado ao ecossistema SESI.
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
      <div style="margin-left: 15px; margin-top: 5px;">
        <span>╰ <a href="#requisitos-funcionais">Requisitos Funcionais</a></span><br />
        <span>╰ <a href="#requisitos-não-funcionais">Requisitos Não-Funcionais</a></span><br />
        <span>╰ <a href="#tecnologias-utilizadas">Tecnologias Utilizadas</a></span>
      </div>
    </li>
    <li>
      <a href="#primeiros-passos">Primeiros Passos</a>
      <div style="margin-left: 15px; margin-top: 5px;">
        <span>╰ <a href="#pré-requisitos">Pré-requisitos</a></span><br />
        <span>╰ <a href="#instalação">Instalação</a></span>
      </div>
    </li>
    <li><a href="#contribuição">Contribuição</a></li>
  </ol>
</details>



## Sobre o Projeto

A **S.I.N.A** é um ecossistema desenvolvido para transformar a dinâmica de sala de aula. Através de uma câmera acoplada a um tripé e cartões físicos de MDF (produzidos via corte a laser), o sistema escaneia as respostas dos alunos simultaneamente utilizando **OpenCV**.

**Por que a S.I.N.A?**
* **Conformidade Legal:** Respeita a proibição de celulares em sala (Lei 15.100/2025).
* **Autonomia:** Utiliza processamento local via **Raspberry Pi** dentro da rede SESI.
* **Gamificação:** Gera rankings automáticos e dashboards no **Power BI** para visualização em TVs escolares.

<a id="requisitos-funcionais"></a>
<details>
  <summary>Requisitos Funcionais</summary>
  <br />
  <table width="100%">
    <thead>
      <tr>
        <th align="center">ID</th>
        <th align="left">Descrição do Requisito</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">RF001</td>
        <td>Tela de Cadastro pedindo as informações do E-Mail, Senha, CPF e com as opções se é Professor ou Estudante.</td>
      </tr>
      <tr>
        <td align="center">RF002</td>
        <td>Botão de Login como Professor, selecionando que é um Professor e colocando suas informações, E-mail Educacional e Senha.</td>
      </tr>
      <tr>
        <td align="center">RF003</td>
        <td>Botão de Login como Aluno, selecionando que é um Aluno e colocando suas informações, E-mail Educacional e Senha.</td>
      </tr>
      <tr>
        <td align="center">RF004</td>
        <td>Tela para o Aluno que mostra seu desempenho individual e classificação na turma e escola.</td>
      </tr>
      <tr>
        <td align="center">RF005</td>
        <td>O Aluno deve ser capaz de rever as questões, suas respectivas respostas e correções.</td>
      </tr>
      <tr>
        <td align="center">RF006</td>
        <td>O Professor deve possuir em sua conta uma opção para fazer as questões usadas das atividades da S.I.N.A e caso necessário, fazer as devidas alterações.</td>
      </tr>
      <tr>
        <td align="center">RF007</td>
        <td>O Professor deve ser capaz de definir o nível de dificuldade das questões e a série (Fácil, Médio, Difícil / 1º Fundamental, 2º Fundamental e Ensino Médio) baseadas no conteúdo sendo lecionado.</td>
      </tr>
      <tr>
        <td align="center">RF008</td>
        <td>Tela para o Professor com gráficos de acertos e erros das turmas em porcentagens, e quais questões tiveram mais erros e quais tiveram mais acertos.</td>
      </tr>
      <tr>
        <td align="center">RF009</td>
        <td>Tela em que ambos aluno e professor devem ser capazes de ver o histórico de atividades realizadas na sala e o desempenho geral da turma.</td>
      </tr>
      <tr>
        <td align="center">RF010</td>
        <td>Tela de classificação onde os alunos e professores poderão ver a classificação das salas e alunos em um rank, classificando por número de questões acertadas.</td>
      </tr>
    </tbody>
  </table>
</details>

<br />

<a id="requisitos-não-funcionais"></a>
<details>
  <summary> Requisitos Não-Funcionais </summary>
  <br />
  <table width="100%">
    <thead>
      <tr>
        <th align="center">ID</th>
        <th align="left">Descrição do Requisito</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td align="center">NF001</td>
        <td>O site deve aguentar no mínimo 1000 acessos simultâneos para que a rede SESI possa ter uma boa estabilidade.</td>
      </tr>
      <tr>
        <td align="center">NF002</td>
        <td>O site deve estar disponível durante todo o horário escolar.</td>
      </tr>
      <tr>
        <td align="center">NF003</td>
        <td>A plataforma deve conter proteções básicas contra ameaças comuns.</td>
      </tr>
      <tr>
        <td align="center">NF004</td>
        <td>O Sistema web deve funcionar nos navegadores Chrome, Edge e Firefox.</td>
      </tr>
      <tr>
        <td align="center">NF005</td>
        <td>O Sistema deve retornar as requisições das telas e os relatórios em, no máximo, 3 segundos durante o horário de maior fluxo.</td>
      </tr>
      <tr>
        <td align="center">NF006</td>
        <td>Os Dados de login dos alunos/professores devem ser guardados em um banco de dados criptografado para maior segurança.</td>
      </tr>
      <tr>
        <td align="center">NF007</td>
        <td>Deve ser feito, diariamente, um backup automático das informações para evitar a perda de dados acadêmicos.</td>
      </tr>
      <tr>
        <td align="center">NF008</td>
        <td>O sistema deve estar acessível aos alunos fora do horário de aula para consulta de desempenho.</td>
      </tr>
      <tr>
        <td align="center">NF009</td>
        <td>Os dados individuais dos alunos devem ser acessíveis apenas pelo próprio aluno e professores autorizados.</td>
      </tr>
      <tr>
        <td align="center">NF010</td>
        <td>O acesso deve ser feito apenas com e-mail institucional e senha criptografada, com a senha podendo ser alterada depois.</td>
      </tr>
      <tr>
        <td align="center">NF011</td>
        <td>A interface tanto do professor quanto do aluno deve ser simples e compreensível, permitindo visualização do desempenho sem necessidade de treinamento.</td>
      </tr>
      <tr>
        <td align="center">NF012</td>
        <td>O sistema deve ser capaz de autenticar os usuários utilizando as credenciais institucionais já existentes da rede SESI, facilitando o gerenciamento de identidade.</td>
      </tr>
      <tr>
        <td align="center">NF013</td>
        <td>O sistema deve analisar a taxa de acertos e erros, e caso haja mais erros do que o desejado, ele alertará o professor sobre o problema.</td>
      </tr>
      <tr>
        <td align="center">NF014</td>
        <td>A tela de classificação deve possuir os dados de até os 10 primeiros colocados, após isso, será necessário clicar em um botão “ver mais” para mostrar o resto.</td>
      </tr>
      <tr>
        <td align="center">NF015</td>
        <td>O desempenho da turma na hora das questões será percebido por meio de cores, sendo elas verde para um bom desempenho, amarelo requirindo atenção para o conceito, e vermelho para turma com dúvidas gerais.</td>
      </tr>
      <tr>
        <td align="center">NF016</td>
        <td>O professor deve possuir em sua tela de “definição de dificuldade” o ano e o nível atual das turmas.</td>
      </tr>
      <tr>
        <td align="center">NF017</td>
        <td>O sistema pode usar os dados acumulados para alertar o professor sobre quais alunos correm risco de reprovação ou dificuldade na matéria para fornecer apoio imediato.</td>
      </tr>
      <tr>
        <td align="center">NF018</td>
        <td>No “Histórico de Atividades” deve haver todas as últimas 5 atividades e a cor indicativa, verde para “Bom Desempenho”, amarelo para “Na Média” e vermelho para “Requer Atenção”, levando em consideração a porcentagem de acerto das questões e o número de pontos.</td>
      </tr>
      <tr>
        <td align="center">NF019</td>
        <td>Os rankings devem ser separados por turmas, por exemplo: “Os 10 melhores do 9º ano”, “Os 10 melhores do 2º E.M.”.</td>
      </tr>
      <tr>
        <td align="center">NF020</td>
        <td>O sistema deve classificar os alunos baseado na quantidade de acertos e o valor da questão, pois questões difíceis valem mais pontos que as fáceis.</td>
      </tr>
    </tbody>
  </table>
</details>

### Tecnologias Utilizadas

<div align="left">
  <img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=raspberrypi&logoColor=white" alt="Raspberry Pi">
  <img src="https://img.shields.io/badge/Power_BI-F2C811?style=for-the-badge&logo=temporal&logoColor=black" alt="Power BI">
</div>


## Primeiros Passos

### Pré-requisitos
* Python 3.10 ou superior.
* Câmera USB ou módulo de câmera para Raspberry.
* Bibliotecas: `opencv-python` e `numpy`.

### Instalação
1. Clone o repositório:
   ```sh
   git clone [https://github.com/Gengiscana/S.I.N.A.git](https://github.com/Gengiscana/S.I.N.A.git)

## Contribuição

Contribuições para o aprimoramento do projeto será **muito apreciada**, caso queria, siga os passos abaixo:

1. Faça um Fork do projeto
2. Crie sua Feature Branch (`git checkout -b feature/coisabiglegal`)
3. Commite suas mudanças (`git commit -m 'Add some coisabiglegal'`)
4. Faça o Push para a Branch (`git push origin feature/coisamuitolegal`)
5. Abra um Pull Request

### Desenvolvedores:

<a href="https://github.com/Gengiscana/S.I.N.A/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Gengiscana/S.I.N.A" />
</a>

<p align="right"><a href="#readme-top">voltar ao topo ↺</a></p>
