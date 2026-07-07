# Tripleten web_project_around_express

Este projeto utiliza **Node.js** e **Express** para criar uma API simples que lê dados de arquivos JSON usando os módulos nativos **fs** e **path**.

## Estrutura do projeto

```text
web_project_around_express/
│
├── app.js
├── package.json
├── routes/
│   ├── users.js
│   └── cards.js
└── data/
    ├── users.json
    └── cards.json
```

---

## Tecnologias

- Node.js
- Express
- fs
- path
- Nodemon

---

## Instalação

Clone o projeto:

```bash
git clone <url-do-repositório>
```

Instale as dependências:

```bash
npm install
```

---

## Executando o projeto

Modo desenvolvimento:

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

---

# app.js

```javascript
const express = require("express");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const app = express();
const PORT = 3000;

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

---

# Rotas

## GET /users

Retorna todos os usuários armazenados em `users.json`.

```javascript
const router = require("express").Router();
const path = require("path");
const fs = require("fs");

router.get("/", (req, res) => {
  const usersPath = path.join(__dirname, "../data/users.json");

  fs.readFile(usersPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Erro ao ler o arquivo",
      });
    }

    res.send(JSON.parse(data));
  });
});

module.exports = router;
```

---

## GET /cards

Retorna todos os cards.

```javascript
router.get("/", (req, res) => {
  const cardsPath = path.join(__dirname, "../data/cards.json");

  fs.readFile(cardsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Erro ao ler o arquivo",
      });
    }

    res.send(JSON.parse(data));
  });
});
```

---

## GET /cards/:cardId

Retorna um card específico pelo seu `_id`.

```javascript
router.get("/:cardId", (req, res) => {
  const cardsPath = path.join(__dirname, "../data/cards.json");

  fs.readFile(cardsPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send({
        message: "Erro ao ler o arquivo",
      });
    }

    const cards = JSON.parse(data);

    const card = cards.find(
      (card) => card._id === req.params.cardId
    );

    if (!card) {
      return res.status(404).send({
        message: "Card não encontrado",
      });
    }

    res.send(card);
  });
});
```

---

# Uso do módulo fs

O módulo **fs** é utilizado para ler arquivos do sistema.

```javascript
fs.readFile(caminho, "utf8", (err, data) => {
  if (err) {
    return res.status(500).send({
      message: "Erro ao ler o arquivo",
    });
  }

  const dados = JSON.parse(data);

  res.send(dados);
});
```

---

# Uso do módulo path

O módulo **path** cria caminhos compatíveis com diferentes sistemas operacionais.

```javascript
const path = require("path");

const cardsPath = path.join(__dirname, "../data/cards.json");
```

---

# Códigos de resposta HTTP

| Código | Significado |
|---------|-------------|
| 200 | Requisição realizada com sucesso |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

# Rotas disponíveis

| Método | Endpoint | Descrição |
|---------|----------|-----------|
| GET | `/users` | Lista todos os usuários |
| GET | `/cards` | Lista todos os cards |
| GET | `/cards/:cardId` | Retorna um card pelo ID |

---

# Conceitos praticados

- Organização de rotas com `express.Router()`
- Leitura de arquivos JSON usando `fs.readFile()`
- Construção de caminhos com `path.join()`
- Conversão de JSON com `JSON.parse()`
- Busca de elementos utilizando `Array.find()`
- Tratamento de erros com códigos HTTP `404` e `500`
- Estruturação de uma API REST utilizando Express
