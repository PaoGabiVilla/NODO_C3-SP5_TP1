//paisesController.mjs
import {
        obtenerTodosLosPaises,
        obtenerPaisPorId, actualizarPais,
        crearNuevoPais,
        eliminarPaisPorId
        }
        from '../services/paisesService.mjs';

//*************************************************************************************************************** */
export const obtenerTodosLosPaisesController = async (req, res) => {
  try {
    
    const paises = await obtenerTodosLosPaises(); // Llama al servicio que trae los paises
    const successMessage = req.session.successMessage;
    delete req.session.successMessage;
    res.render('dashboard', 
          {title: 'Dashboard de Países', 
          paises, 
          successMessage}); // Renderiza la vista con los datos
  } catch (error) {
    console.error('Error al obtener países:', error);
    res.status(500).send('Error interno del servidor');
  }
};
//*************************************************************************************************************** */

export async function renderizarFormularioEdicionController(req, res) {
  try {
    const { id } = req.params;
    const pais = await obtenerPaisPorId(id); 

    if (!pais) {
      return res.status(404).send({ mensaje: 'País no encontrado' });
    }

    res.render('editPaises', {title: 'Editar país', pais },); // Esto es lo que carga el archivo EJS
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
      return res.status(404).send({ mensaje: 'País no encontrado' });
    }

    const paisFormateado = renderizarPais(pais);
    res.status(200).send(paisFormateado);
  } catch (error) {
    res.status(500).send({ mensaje: 'Error al obtener al país',
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
            return res.status(404).send({ mensaje: 'País a actualizar no encontrado.' });
        }

        // Guardar mensaje de éxito en sesión
        req.session.successMessage = 'País editado exitosamente!';
        res.redirect('/api/paises');
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar el País', error: error.message });
    }
}

//*************************************************************************************************************** */

export async function agregarNuevoPaisController(req, res) {
    try {
        const datos = req.body; // Obtiene los datos del cuerpo de la solicitud
        const paisCreado = await crearNuevoPais(datos);

        if (!paisCreado) {
            return res.status(404).send({ mensaje: 'Error al crear país' });
        }
        // Guardamos el mensaje de éxito en la sesión
        req.session.successMessage = '¡País creado exitosamente!';
       // Redirigimos al dashboard
      res.redirect('/api/paises'); 
    } 
    catch (error) {
        res.render('addPaises', {title: 'Agregar de País',
            errorMessage: 'Hubo un error al crear el país. Asegúrate de completar todos los campos correctamente.'
        });
    }
}


//*************************************************************************************************************** */



export async function eliminarPaisPorIdController(req, res) {
    try {
        const { id } = req.params;
        const paisEliminado = await eliminarPaisPorId(id);

        if (!paisEliminado) {
            return res.status(404).send({ mensaje: 'País a eliminar no encontrado.' });
        }
         
        // Guardamos el mensaje de éxito en la sesión
        req.session.successMessage = '¡País eliminado exitosamente!';
       // Redirigimos al dashboard
      res.redirect('/api/paises'); 
    } 
    
    catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar el país', error: error.message });
    }
}
