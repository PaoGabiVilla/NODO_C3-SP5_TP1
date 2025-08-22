//paisesRepository.mjs se comunica con la base de datos

import Country from '../models/countryModel.mjs';
import IRepository from './IRepository.mjs';

class countryRepository extends IRepository {

//***************************************************************************************************** */
    async obtenerTodos() {
      return await Country.find({ capital: { $exists: true }});//puede usar status u otro campo de paises en luga de capital para mostrar los paises
  }

//***************************************************************************************************** */
    async obtenerPorId(id) {
      return await Country.findById(id);
  }

//***************************************************************************************************** */
    async actualizarPais(id, datosActualizar) {
      const paisActualizado = await Country.findByIdAndUpdate(id, datosActualizar, { new: true });
      return paisActualizado;
  }

//***************************************************************************************************** */
   async crearPais(datosPais){
     
        const nuevoPais = new Country(datosPais);

        return await nuevoPais.save()// guarda y retorna en una sola linea
        /*await nuevoPais.save();
        console.log(nuevoPais);
        return nuevoPais;*/
        }

//***************************************************************************************************** */
    async eliminarPorId(id){
            const paisEliminado = await Country.findByIdAndDelete(id);
            return paisEliminado;
        }    
}

export default new countryRepository();