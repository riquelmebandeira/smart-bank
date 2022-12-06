# Smart Bank

# Contexto

Esta é uma aplicação full-stack que replica algumas funcionalidades de um sistema financeiro.
A interface foi criada com base em um simples protótipo feito por mim no [Figma](https://www.figma.com/file/CfmBMOR3QynSat8xAoFkhh/Untitled?node-id=0%3A1).

Funcionalidades:

- [x] Cadastrar-se no site;
- [x] Realizar transferências entre usuários;
- [x] Exibir transações de um usuário;
- [x] Filtrar transações.

![Preview da aplicação](preview.gif)

# Tecnologias usadas

- React
- Typescript
- Context API
- Express
- Prisma
- PostgreSQL
- Docker

<br>

# Orientações

<details>
  <summary><strong>Rodando o projeto com o Docker</strong></summary><br />

1. Clone o repositório:

```
git clone git@github.com:riquelmebandeira/smart-bank.git
```

2. Entre na pasta do repositório clonado:

```
cd smart-bank
```

3. Suba as aplicações com o comando:

```
docker-compose up
```

A interface ficará acessível no endereço: http://localhost:3000

Para encerrar as aplicações, execute:

```
docker-compose down
```
