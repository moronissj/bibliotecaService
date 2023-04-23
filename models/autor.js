const { Schema, model } = require("mongoose");

const AutorSchema = Schema({
  nombre: {
    type: String,
    required: [true, "el nombre es obligatorio"],
  },
  apellido: {
    type: String,
    required: [true, "el apellido es obligatorio"],
  },
  fechaNacimiento: {
    type: String,
    required: [true, "la fecha de nacimientoes es obligatoria"],
  },
  nacionalidad: {
    type: String,
    required: [true, "la nacionalidad es obligatoria"],
  },
  estado: {
    type: Boolean,
    required: [true, "el estado es obligatorio"],
    default: true,
  },
});

AutorSchema.methods.toJSON = function () {
  const { __v, estado, _id, ...autor } = this.toObject();
  autor.uid = _id;
  return autor;
};

module.exports = model("Autor", AutorSchema);
