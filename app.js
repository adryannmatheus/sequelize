const express = require("express");
const sequelize = require("./config/db");
const { engine } = require("express-handlebars");

const Produto = require("./models/produto");
const Usuario = require("./models/usuario");
const Video = require("./models/video");

const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync().then(() => {
  console.log("Banco de dados sincronizado.");
});

app.get("/exercicio4", async (req, res) => {
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
  const produto = await Produto.findByPk(2);

  if (!produto) {
    return res.send("Produto não encontrado");
  }

  console.log("Nome:", produto.nome);
  console.log("Preço:", produto.preco);

  res.send("Produto encontrado!");
});

app.get("/exercicio6", async (req, res) => {
  const produto = await Produto.findByPk(2);

  if (!produto) {
    return res.send("Produto não encontrado");
  }

  produto.preco = 100;

  await produto.save();

  res.send("Produto atualizado!");
});

app.get("/exercicio7", async (req, res) => {
  const produto = await Produto.findByPk(3);

  if (!produto) {
    return res.send("Produto não encontrado");
  }

  await produto.destroy();

  const produtos = await Produto.findAll();

  console.log(produtos);

  res.send("Produto removido!");
});

app.get("/produtos", async (req, res) => {
  const produtos = await Produto.findAll();

  res.json(produtos);
});

app.post("/produtos", async (req, res) => {
  const { nome, preco } = req.body;

  const produto = await Produto.create({
    nome,
    preco,
  });

  res.json(produto);
});

app.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;

  const produto = await Produto.findByPk(id);

  if (!produto) {
    return res.send("Produto não encontrado");
  }

  await produto.destroy();

  res.send("Produto removido com sucesso!");
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await Usuario.findAll({
    raw: true,
  });

  res.render("usuarios", { usuarios });
});

app.get("/cadastrarUsuario", (req, res) => {
  res.render("cadastrarUsuario");
});

app.post("/usuarios", async (req, res) => {
  const { nome, email, idade } = req.body;

  await Usuario.create({
    nome,
    email,
    idade,
  });

  res.redirect("/usuarios");
});

app.post("/usuarios/delete/:id", async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (usuario) {
    await usuario.destroy();
  }

  res.redirect("/usuarios");
});

app.get("/", (req, res) => {
  res.render("Home");
});

app.get("/videos", async (req, res) => {
  const videos = await Video.findAll({
    raw: true,
  });

  res.render("Videos", { videos });
});

app.get("/videos/cadastrar", (req, res) => {
  res.render("CadastrarVideo");
});

app.post("/videos", async (req, res) => {
  await Video.create(req.body);

  res.redirect("/videos");
});

app.get("/videos/editar/:id", async (req, res) => {
  const video = await Video.findByPk(req.params.id, {
    raw: true,
  });

  if (!video) {
    return res.send("Vídeo não encontrado");
  }

  res.render("EditarVideo", { video });
});

app.post("/videos/editar/:id", async (req, res) => {
  await Video.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  res.redirect("/videos");
});

app.post("/videos/deletar/:id", async (req, res) => {
  await Video.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.redirect("/videos");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000.");
});
