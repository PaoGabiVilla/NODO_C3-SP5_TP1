import paisesRepository from '../repositories/paisesRepository.mjs';

export async function obtenerTodosLosPaises() {
  return await paisesRepository.obtenerTodos();
}

export async function obtenerPaisPorId(id) {
   return await paisesRepository.obtenerPorId(id); 
}

export async function actualizarPais(id, datosActualizarPais) {
     return await paisesRepository.actualizarPais(id, datosActualizarPais);
}




// export async function buscarSuperheroesPorAtributo(atributo, valor) {
//   return await superHeroRepository.buscarPorAtributo(atributo, valor);
// }

// export async function crearNuevoSuperheroe(datosNuevoSuperheroe) {
//     return await superHeroRepository.crearSuperheroe(datosNuevoSuperheroe);
// }



// export async function eliminarSuperheroePorId(id) {
//     console.log('Capa services - función eliminar por Id');
//     return await superHeroRepository.eliminarPorId(id);
    
// }
// export async function eliminarSuperheroePorNombre(nombre) {
//     console.log('Capa Services - función eliminar por Nombre');
//     return await superHeroRepository.eliminarPorNombre(nombre);

// }