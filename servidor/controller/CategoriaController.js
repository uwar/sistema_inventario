const categoria = require("../model/Categoria");

const getAll = async (req, res) => {
  try {
    let item = await categoria.findAll();
    return res.status(200).send({ status: true, registros: item });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ status: false, error: error });
  }
};
const getAllActivas = async (req, res) => {
  try {
    let item = await categoria.findAll({
      where: { activo: true },
    });
    return res.status(200).send({ status: true, registros: item });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ status: false, error: error });
  }
};

const create = async (req, res) => {
  const data = req.body;
  try {
    let item = await categoria.create(data);
    return res.status(200).send({ status: true, registro: item });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ status: false, error: error });
  }
};
const update = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    let item = await categoria.update(data, {
      where: {
        id: id,
      },
    });
    return res.status(200).send({ status: true, registro: item });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ status: false, error: error });
  }
};
const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    let item = await categoria.destroy({
      where: {
        id: id,
      },
    });
    return res.status(200).send({ status: true, registro: item });
  } catch (error) {
    console.log(error);
    return res.status(200).send({ status: false, error: error });
  }
};
module.exports = {
  getAll,
  getAllActivas,
  create,
  update,
  destroy,
};
