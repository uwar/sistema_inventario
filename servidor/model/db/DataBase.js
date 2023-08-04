const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data_farmacia.db3",
});
module.exports = sequelize;
