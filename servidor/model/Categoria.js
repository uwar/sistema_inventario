const { Model, DataTypes } = require("sequelize");
const sequelize = require("../model/db/DataBase");

class Categoria extends Model {}

Categoria.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      defaultValue: "",
    },
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Categoria",
    tableName: "categoria",
    timestamps: false,
  }
);

module.exports = Categoria;
