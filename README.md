<h1 align="center">Snakz </h1>

<p align="center">Site de lanchonete fictícia feito para aprender C#</p>

<p align="center">
  <img src="https://img.shields.io/github/last-commit/viniciusrodrigues1a/snakz" alt="Last commit date" />
</p>

<h2 align="center">App showcase</h2>

<br />

<div style="display: inline-block;" align="center">
  <img width="45%" src="./.github-assets/header.png" alt="Primeira seção do site" />
  <img width="45%" src="./.github-assets/offers.png" alt="Seção de descontos do site" />
  <img width="45%" src="./.github-assets/menu-0.png" alt="Primeira parte do cardápio do site" />
  <img width="45%" src="./.github-assets/menu-1.png" alt="Segunda parte do cardápio do site" />
</div>

<br />

<h3 align="center">Área do admin</h3>

<br />

<div style="display: inline-block;" align="center">
  <img width="45%" src="./.github-assets/admin-0.png" alt="Tela de login para o admin" />
  <img width="45%" src="./.github-assets/admin-1.png" alt="Tela de login para o admin, com os dados preenchidos" />
  <img width="90%" src="./.github-assets/products.png" alt="Tela de gerenciamento de produtos" />
</div>

<br />

<div align="center">
  <a href="https://insomnia.rest/run/?label=Snakz&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fviniciusrodrigues1a%2Fsnakz%2Fmain%2FInsomnia_2022-07-14.json" target="_blank">
    <img width="225px" src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia">
  </a>
</div>

<br />

## :page_facing_up: Índice

- [Sobre o projeto](#about)
- [Tecnologias e ferramentas](#built-using)
- [Rodando localmente](#running-locally)
- [Rodando testes](#running-tests)

<br />

## :monocle_face: Sobre o projeto <a name="about"></a>

Projeto para uma lanchonete fictícia, desenvolvido para aprimorar meus conhecimentos em C# e MVC.

<br />

## :hammer: Tecnologias e ferramentas <a name="built-using"></a>

<div style="display: inline-block;">
  <img height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg" alt="CSharp" />
  <img height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg" alt="Dotnet Core" />
  <img height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" />
</div>

<br />

Desenvolvido utilizando **C#**, **.NET Core** e **React**.

<br />

## :computer: Rodando localmente <a name="running-locally"></a>

Clone o repositório

```bash
  git clone https://github.com/viniciusrodrigues1a/snakz
```

Vá à pasta WebApp/ no diretório do projeto

```bash
  cd snakz/WebApp/
```

Adicione as *user-secrets* da conta de admin

```bash
  dotnet user-secrets set "ADMIN_USERNAME" "admin"
  dotnet user-secrets set "ADMIN_PASSWORD" "admin"
```

Inicie a aplicação

```bash
  dotnet run
```

A aplicação estará rodando na url **http://localhost:5000/**

<br />

## :test_tube: Rodando testes <a name="running-tests"></a>

Na pasta raiz do projeto rode o comando de testes

```bash
  dotnet test
```
