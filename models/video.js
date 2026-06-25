const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Video = sequelize.define("Video", {
  titulo: DataTypes.STRING,
  nomeCriador: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  qtdVisualizacoes: DataTypes.INTEGER,
  qtdCurtidas: DataTypes.INTEGER,
  hastagPrinc: DataTypes.STRING,
  urlVideo: DataTypes.STRING,
  urlThumb: DataTypes.STRING,
});

module.exports = Video;
