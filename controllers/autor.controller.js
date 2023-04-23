const { response } = require("express");
const Autor = require("../models/autor");

const crearAutor = async (req, res = response) => {
  try {
    const { estado, _id, ...data } = req.body;
    const autor = new Autor(data);

    await autor.save();

    return res.json({ autor, ok: true, msg: "autor creado" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "error en el servidor al crear autor" });
  }
};

const obtenerAutores = async (req, res = response) => {
  try {
    const { limit = "10", from = "0" } = req.query;
    const [total, autores] = await Promise.all([
      Autor.countDocuments({ estado: true }),
      Autor.find({ estado: true }).skip(Number(from)).limit(Number(limit)),
    ]);

    return res.json({ total, autores, ok: true, msg: "lista de autores" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error al listar autores" });
  }
};

const obtenerAutor = async (req, res = response) => {
  try {
    const { id } = req.params;
    const autor = await Autor.findOne({ _id: id, estado: true });

    if (!autor) {
      return res.status(400).json({ error: "autor no encontrado" });
    }

    return res.json({ autor, ok: true, msg: "autor encontrado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error al obtener usuario" });
  }
};

const actualizarAutor = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { estado, _id, ...data } = req.body;
    const autor = await Autor.findByIdAndUpdate(id, data, { new: true });

    if (!autor) {
      return res.status(400).json({ error: "autor no encontrado" });
    }

    return res.json({ autor, ok: true, msg: "autor autualizado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error al actualizar usuario" });
  }
};

const eliminarAutor = async (req, res = response) => {
  try {
    const { id } = req.params;
    const autor = await Autor.findByIdAndUpdate(id, {estado: false}, { new: true });

    if (!autor) {
      return res.status(400).json({ error: "autor no encontrado" });
    }

    return res.json({ autor, ok: true, msg: "autor eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "error al eliminar usuario" });
  }
};

module.exports = { crearAutor, obtenerAutores, obtenerAutor, actualizarAutor, eliminarAutor };
