import express from 'express';
import {
      obtenerTodosLosPaisesController,
      obtenerPaisPorIdController, 
      actualizarPaisController,
     //buscarSuperheroesPorAtributoController, 
    //agregarNuevoSuperheroeController,
    
    //eliminarSuperheroePorIdController,
    //eliminarSuperheroePorNombreController
} from '../controllers/paisesController.mjs';

import Country from '../models/countryModel.mjs';


//Validaciones

// import { registerValidationRules } from '../middlewares/validationRules.mjs';
// import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';
import { renderizarFormularioEdicionController } from '../controllers/paisesController.mjs';

//Rutas

const router = express.Router();
//Todos los paises
router.get('/paises', obtenerTodosLosPaisesController);


//Editar
router.get('/paises/:id/edit', renderizarFormularioEdicionController);
router.put('/paises/:id', actualizarPaisController); // debe ir router.put('/paises/:id', registerValidationRules(),handleValidationErrors, actualizarPaisController);


// router.post('/heroes/agregar', registerValidationRules(), handleValidationErrors, agregarNuevoSuperheroeController);
// router.put('/heroes/actualizar/:id', registerValidationRules(),handleValidationErrors, actualizarSuperheroeController);

// router.put('/heroes/editar', registerValidationRules(),handleValidationErrors, actualizarSuperheroeController);
// router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);


// router.delete('/heroes/eliminar/id/:id', eliminarSuperheroePorIdController);
// router.delete('/heroes/eliminar/nombre/:nombre', eliminarSuperheroePorNombreController);
// router.delete('/heroes/:id', eliminarSuperheroePorIdController);
// // Ruta para la vista de edición de un superhéroe



// router.get('/heroes/agregar',agregarNuevoSuperheroeController);


export default router;