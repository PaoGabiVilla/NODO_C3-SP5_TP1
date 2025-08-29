//NODO_C3-SP5_TP1/src/routes/paisesRoutes
import express from 'express';
import {
      obtenerTodosLosPaisesController, actualizarPaisController,
      agregarNuevoPaisController, mostrarFormularioAgregarPais,
      eliminarPaisPorIdController
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
router.get('/paises/agregar',mostrarFormularioAgregarPais);
router.post('/paises/agregar', registerValidationRules(), handleValidationErrors, agregarNuevoPaisController);


//****************************************************************************************************** */
//Eliminar
router.delete('/paises/eliminar/id/:id', eliminarPaisPorIdController);
router.delete('/paises/:id', eliminarPaisPorIdController);

//****************************************************************************************************** */
export default router;