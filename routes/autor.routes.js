const { Router, response } = require("express");
const {
  crearAutor,
  obtenerAutores,
  obtenerAutor,
  actualizarAutor,
  eliminarAutor
} = require("../controllers/autor.controller");
const router = Router();

router.get("", obtenerAutores);

router.get("/:id", obtenerAutor);

router.post("", crearAutor);

router.put("/:id", actualizarAutor);

router.delete("/:id", eliminarAutor);

module.exports = router;
