const getEfectos = require("express").Router();
const { Efecto, Sim, Estado, Almacenamiento } = require("../db");

getEfectos.get("/", async (req, res) => {
  //* todos los efectos
  try {
    const efectos = await Efecto.findAll({ include: { all: true } });
    return res.status(200).send(efectos);
  } catch (error) {
    console.log(error);
  }
});

getEfectos.get("/:id", async (req, res) => {
  // * solo por ID
  const id = req.params.id;
  try {
    const efectos = await Efecto.findAll({
      include: { all: true },
    });
    const response = efectos.filter((efecto) => efecto.Bolsa.acta_id === Number(id));
    if (response !== null) {
      return res.status(200).send(response);
    } else {
      return res.status(404).send("Efecto not found or not exist");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = getEfectos;
