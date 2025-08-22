//validationRules.mjs
import { body } from 'express-validator';

export const registerValidationRules = () => [
  body('name.official')
    .exists().withMessage('El nombre oficial es obligatorio')
    .isLength({ min: 3, max: 90 }).withMessage('El nombre oficial debe tener entre 3 y 90 caracteres'),

  body('capital')
    .isArray().withMessage('La capital debe ser un array')
    .custom(arr => arr.every(c => typeof c === 'string' && c.length >= 3 && c.length <= 90))
    .withMessage('Cada capital debe tener entre 3 y 90 caracteres'),

  body('borders')
    .optional()
    .isArray().withMessage('Borders debe ser un array')
    .custom(arr => arr.every(c => /^[A-Z]{3}$/.test(c)))
    .withMessage('Cada border debe ser 3 letras mayúsculas'),

  body('area')
    .isFloat({ min: 0 }).withMessage('Area debe ser un número positivo'),

  body('population')
    .isInt({ min: 0 }).withMessage('Population debe ser un entero positivo'),

  body('gini')
    .optional()
    .isFloat({ min: 0, max: 100 }).withMessage('Gini debe estar entre 0 y 100'),

  body('timezones')
    .optional()
    .isArray().withMessage('Timezones debe ser un array'),

  body('creador')
    .exists().withMessage('El campo creador es obligatorio')
];

export const validateCountry = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }
  next();
};
