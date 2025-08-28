//NODO_C3-SP5_TP1/src/repositories/IRepository.mjs
class IRepository {
  obtenerPorId(id) {
    throw new Error("Método 'obtenerPorId()' no implementado");
  }

  obtenerTodos() {
    throw new Error("Método 'obtenerTodos()' no implementado");
  }

  buscarPorAtributo(atributo, valor) {
    throw new Error("Método 'buscarPorAtributo()' no implementado");
  }
}

export default IRepository;