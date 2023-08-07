const { Model, DataTypes } = require("sequelize");
const sequelize = require("../model/db/DataBase");

class Area extends Model {}

Area.init(
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
    modelName: "Area",
    tableName: "area",
    timestamps: false,
  }
);

module.exports = Area;
