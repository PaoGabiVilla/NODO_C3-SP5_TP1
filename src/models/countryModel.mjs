//countryModel.mjs
import mongoose from 'mongoose';
const countrySchema = new mongoose.Schema({
  name: {
    common: { type: String, required: true },
    official: { type: String, required: true,
      minlength: 3, maxlength: 90
     },
  nativeName: mongoose.Schema.Types.Mixed, // puede tener claves dinámicas como "spa"
  },
  independent: Boolean,
  status: String,
  unMember: Boolean,
  currencies: mongoose.Schema.Types.Mixed, // claves dinámicas como "VES", "USD"
  
  capital: [{
    type: String,
    minlength: 3, maxlength: 90 
  }],
  
  region: String,
  subregion: String,
  languages: mongoose.Schema.Types.Mixed, // claves dinámicas como "spa", "eng"
  latlng: [Number],
  landlocked: Boolean,
  
  borders: [{type: String,
    match: /^[A-Z]{3}$/     // exactamente 3 letras mayúsculas
  }],

  area: { 
    type: Number,
    min: [0, "El área debe ser un número positivo"] 
  },

  flag: String,
  maps: {
    googleMaps: String,
    openStreetMaps: String,
  },
  
  population: { 
    type: Number,
    min: [0, "La población debe ser un entero positivo"],
    validate: {
      validator: Number.isInteger,
      message: "La población debe ser un número entero"
    }
  },

  // gini: {
  //   type: Map,
  //   of: {
  //     type: Number,
  //     min: [0, "El índice GINI no puede ser menor que 0"],
  //     max: [100, "El índice GINI no puede ser mayor que 100"]
  //   }
  // },
  
  fifa: String,
  timezones: [String],
  continents: [String],
  flags: {
    png: String,
    svg: String,
    alt: String,
  },
  startOfWeek: String,
  capitalInfo: {
    latlng: [Number],
  },
  creador: { type: String, default: 'Paola Gabriela Villafañez' },
  createdAt: { type: Date, default: Date.now }
});

const Country = mongoose.model('Country', countrySchema, 'Grupo-06');
export default Country;