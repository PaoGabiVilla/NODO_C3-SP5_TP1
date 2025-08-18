import {
        obtenerTodosLosPaises,
        obtenerPaisPorId, actualizarPais
        // buscarSuperheroesPorAtributo,
        // crearNuevoSuperheroe, 
        // eliminarSuperheroePorId, eliminarSuperheroePorNombre 
        }
        from '../services/paisesService.mjs';

//*************************************************************************************************************** */
export const obtenerTodosLosPaisesController = async (req, res) => {
  try {
    
    const paises = await obtenerTodosLosPaises(); // Llama al servicio que trae los paises
    const successMessage = req.session.successMessage;
    delete req.session.successMessage;
    res.render('dashboard', 
          {title: 'Dashboard de Paises', 
          paises, 
          successMessage}); // Renderiza la vista con los datos
  } catch (error) {
    console.error('Error al obtener paises:', error);
    res.status(500).send('Error interno del servidor');
  }
};
//*************************************************************************************************************** */

export async function renderizarFormularioEdicionController(req, res) {
  try {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id); 

    if (!pais) {
      return res.status(404).send({ mensaje: 'Pais no encontrado' });
    }

    res.render('editPaises', {title: 'Editar pais', pais },); // Esto es lo que carga el archivo EJS
  } catch (error) {
    res.status(500).send({
      mensaje: 'Error al cargar el formulario de edición',
      error: error.message,
    });
  }
}

//*************************************************************************************************************** */

export async function obtenerPaisPorIdController(req, res) {
  try {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id);
    if (!pais) {
      return res.status(404).send({ mensaje: 'Pais no encontrado' });
    }

    const paisFormateado = renderizarPais(pais);
    res.status(200).send(paisFormateado);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener al pais',
      error: error.message });
  }
}

//*************************************************************************************************************** */


export async function actualizarPaisController(req, res) {
    try {
        const { id } = req.params;
        const datosActualizar = req.body;

        const paisActualizado = await actualizarPais(id, datosActualizar);
        if (!paisActualizado) {
            return res.status(404).send({ mensaje: 'Pais a actualizar no encontrado.' });
        }

        // Guardar mensaje de éxito en sesión
        req.session.successMessage = 'Pais editado exitosamente!';
        res.redirect('/api/paises');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el Pais', error: error.message });
    }
}

//*************************************************************************************************************** */

// export async function buscarSuperheroesPorAtributoController(req, res) {
//   try {
//     const { atributo, valor } = req.params;
//     const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);
//     if (superheroes.length === 0) {
//       return res.status(404).send({
//         mensaje: 'No se encontraron superhéroes con ese atributo'
//       });
//     }

//     const superheroesFormateados = renderizarListaSuperheroes(superheroes);
//     res.status(200).send(superheroesFormateados);
//   } catch (error) {
//     res.status(500).send({ mensaje: 'Error al buscar los superhéroes',
//       error: error.message });
//   }
// }


// export async function agregarNuevoSuperheroeController(req, res) {
//     try {
//         const datos = req.body; // Obtiene los datos del cuerpo de la solicitud
//         const superheroeCreado = await crearNuevoSuperheroe(datos);

//         if (!superheroeCreado) {
//             return res.status(404).send({ mensaje: 'Error al crear superhéroe' });
//         }
//         // Guardamos el mensaje de éxito en la sesión
//         req.session.successMessage = '¡Superhéroe creado exitosamente!';
//        // Redirigimos al dashboard
//       res.redirect('/api/heroes'); 
//     } 
//     catch (error) {
//         res.render('addSuperhero', {title: 'Agregar de Superhéroe',
//             errorMessage: 'Hubo un error al crear el superhéroe. Asegúrate de completar todos los campos correctamente.'
//         });
//     }
// }



// export async function eliminarSuperheroePorIdController(req, res) {
//     try {
//         const { id } = req.params;
//         const superheroeEliminado = await eliminarSuperheroePorId(id);

//         if (!superheroeEliminado) {
//             return res.status(404).send({ mensaje: 'Superhéroe a eliminar no encontrado.' });
//         }
         
//         // Guardamos el mensaje de éxito en la sesión
//         req.session.successMessage = '¡Superhéroe eliminado exitosamente!';
//        // Redirigimos al dashboard
//       res.redirect('/api/heroes'); 
//     } 
    
//     catch (error) {
//         res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
//     }
// }

// export async function eliminarSuperheroePorNombreController(req, res){

//     try{
//         console.log('Capa controller - función eliminar por Nombre');
//         const { nombre } = req.params;
//         const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);
//         if (!superheroeEliminado) {
//             return res.status(404).send({ mensaje: 'Superhéroe a eliminado no encontrado.' });
//         }

//         const superheroeFormateado = renderizarSuperheroe(superheroeEliminado);
//         res.status(200).json(superheroeFormateado);

//     } catch (error) {
//         res.status(500).send({ mensaje: 'Error al eliminar el superhéroe', error: error.message });
//     }
// }

