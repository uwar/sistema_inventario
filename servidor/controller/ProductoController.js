const producto = require("../model/Producto");
const unidad = require("../model/Unidad");
const categoria = require("../model/Categoria");
const getAll = async (req, res) => {
  try {
    let item = await producto.findAll({
      include: [
        {
          model: categoria,
          as: "categoria",
        },
        {
          model: unidad,
          as: "unidad",
        },
      ],
      order: [
        ["categoria_id", "ASC"],
        ["codigo_item", "ASC"],
      ],
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
    let item = await producto.create(data);
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
    let item = await producto.update(data, {
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
    let item = await producto.destroy({
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
  create,
  update,
  destroy,
};
