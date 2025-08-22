//paisesService.mjs
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

export async function crearNuevoPais(datosPais) {
  return await paisesRepository.crearPais(datosPais);
}

export async function eliminarPaisPorId(id) {
    return await paisesRepository.eliminarPorId(id);
    
}

