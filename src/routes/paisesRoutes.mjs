//paisesRoutes
import express from 'express';
import {
      obtenerTodosLosPaisesController,
      obtenerPaisPorIdController, 
      actualizarPaisController,
      agregarNuevoPaisController,
      eliminarPaisPorIdController,
} from '../controllers/paisesController.mjs';

import Country from '../models/countryModel.mjs';


//Validaciones

import { registerValidationRules } from '../middlewares/validationRules.mjs';
import { handleValidationErrors } from '../middlewares/errorMiddleware.mjs';
import { renderizarFormularioEdicionController } from '../controllers/paisesController.mjs';

//Rutas
//****************************************************************************************************** */
const router = express.Router();
//Todos los paises
router.get('/paises', obtenerTodosLosPaisesController);

//****************************************************************************************************** */
//Editar
router.get('/paises/:id/edit', renderizarFormularioEdicionController);
router.put('/paises/:id', registerValidationRules(),handleValidationErrors, actualizarPaisController);

//****************************************************************************************************** */
//Agreagar
router.get('/paises/agregar',agregarNuevoPaisController);
router.post('/paises/agregar', registerValidationRules(), handleValidationErrors, agregarNuevoPaisController);
router.put('/paises/actualizar/:id', registerValidationRules(),handleValidationErrors, actualizarPaisController);

//****************************************************************************************************** */
//Eliminar
router.delete('/paises/eliminar/id/:id', eliminarPaisPorIdController);
router.delete('/paises/:id', eliminarPaisPorIdController);

//****************************************************************************************************** */
export default router;