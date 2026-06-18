const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados.");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

module.exports = sequelize;
