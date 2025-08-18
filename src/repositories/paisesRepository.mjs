//paisesRepository se comunica con la base de datos

import Country from '../models/countryModel.mjs';
import IRepository from './IRepository.mjs';

class countryRepository extends IRepository {

    async obtenerTodos() {
      return await Country.find({ capital: { $exists: true }});//puede usar status u otro campo de paises en luga de capital para mostrar los paises
  }

    async obtenerPorId(id) {
      return await Country.findById(id);
  }

  
    async actualizarPais(id, datosActualizar) {
      const paisActualizado = await Country.findByIdAndUpdate(id, datosActualizar, { new: true });
      return paisActualizado;
  }

//   async buscarPorAtributo(atributo, valor) {
//     const filtrar = {};
        
//         filtrar[atributo] = {$regex: valor,$options:'i'};
//   //Búsqueda insencible a mayúsculas
//         return await SuperHero.find(filtrar);
//   }


//  async crearSuperheroe(datosSuperheroe){
     
//         const nuevoHeroe = new SuperHero(datosSuperheroe);

//         return await nuevoHeroe.save()// guarda y retorna en una sola linea
//         /*await nuevoHeroe.save();
//         console.log(nuevoHeroe);
//         return nuevoHeroe;*/
//         }

//         
//         async eliminarPorId(id){
//             console.log('Capa Repository - función eliminar por Id');
//             const heroeEliminado = await SuperHero.findByIdAndDelete(id);
//             console.log(heroeEliminado);
//             return heroeEliminado;
//         }
        
//         async eliminarPorNombre(nombre){
//             console.log('Capa Repository - función eliminar por Nombre');
//             const heroeEliminado = await SuperHero.findOneAndDelete({nombreSuperHeroe: nombre});
//             console.log(heroeEliminado);
//             return heroeEliminado;
//         }
      
}

export default new countryRepository();