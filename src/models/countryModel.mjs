//NODO_C3-SP5_TP1/src/models/countryModel.mjs

import mongoose from 'mongoose';
const countrySchema = new mongoose.Schema({
  name: {
    official:{
    type: String,
    minlength: 3,
    maxlength: 90
    },
  },
  capital: [{
    type: String,
    minlength: 3,
    maxlength: 90
  }],
  borders: [{
    type: String,
    match: /^[A-Z]{3}$/ // 3 letras mayúsculas
  }],
  area: {
    type: Number,
    min: 1 // debe ser mayor a 0
  },
  timezones: [{ type: String }],
  population: {
    type: Number,
    min: 1 // debe ser mayor a 0
  },
  gini: {
    type: Number,
    min: 0,
    max: 100
  },
  creador: {
    type: String,
  }
});

const Country = mongoose.model('Country', countrySchema, 'Grupo-06');
export default Country;