const express = require("express");
const sequelize = require("./config/db");

const Produto = require("./models/produto");
const Usuario = require("./models/usuario");

const app = express();

app.use(express.json());

sequelize.sync().then(() => {
  console.log("Banco de dados sincronizado.");
});

app.get("/produtos", async (req, res) => {
  await Produto.create({
    nome: "Produto 1",
    preco: 19.99,
  });

  await Produto.create({
    nome: "Produto 2",
    preco: 29.99,
  });

  await Produto.create({
    nome: "Produto 3",
    preco: 39.99,
  });

  const produtos = await Produto.findAll();

  console.log(produtos);

  res.send("Produtos criados e listados no console.");
});

app.get("/exercicio5", async (req, res) => {
  const id = 2;
  const produto = await Produto.findByPk(id);

  if (!produto) {
    console.log("Produto não encontrado");
    res.send("Produto não encontrado");
  } else {
    console.log("Nome:", produto.nome);
    console.log("Preço:", produto.preco);
    res.send("Produto encontrado!");
  }
});

app.get("/exercicio6", async (req, res) => {
  const produto = await Produto.findByPk(2);

  if (!produto) {
    return res.send("Produto não encontrado");
  }

  produto.preco = 100.0;

  await produto.save();

  res.send("Produto atualizado!");
});

app.get("/exercicio7", async (req, res) => {
  const id = 3;
  const produto = await Produto.findByPk(id);

  if (!produto) {
    console.log("Produto não encontrado");
    res.send("Produto não encontrado");
  } else {
    await produto.destroy();
    console.log("Produto excluído!");
    res.send("Produto excluído com sucesso!");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
