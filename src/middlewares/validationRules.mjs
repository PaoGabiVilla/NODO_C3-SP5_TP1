//NODO_C3-SP5_TP1/src/middlewares/validationRules.mjs

import { body, validationResult } from "express-validator";

// Middleware para normalizar campos tipo array
export const normalizeArrays = (req, res, next) => {
  ["capital", "borders", "timezones"].forEach(field => {
    if (req.body[field] && typeof req.body[field] === "string") {
      req.body[field] = req.body[field]
        .split(",")
        .map(el => el.trim())
        .filter(el => el.length > 0);
    }
  });
  next();
};

// Reglas de validación
export const registerValidationRules = () => [
  // Nombre oficial
  body("name[official]")
    .exists().withMessage("El nombre oficial es obligatorio")
    .isLength({ min: 3, max: 90 }).withMessage("El nombre oficial debe tener entre 3 y 90 caracteres"),

  // Capital
  body("capital")
    .exists().withMessage("La capital es obligatoria")
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",") // separa las fronteras por comas
          .map((p) => p.trim()) // recorre el array y elimina los espacios en blanco al principio y al final de la cadena
          .filter(Boolean); // elimina cadenas vacías automáticamente
      }
      return value;
    })
    .isArray().withMessage("La capital debe ser un array"),
  body("capital.*")
    .isLength({ min: 3, max: 90 }).withMessage("Cada capital debe tener entre 3 y 90 caracteres"),

  // Borders - Frontera
  body("borders")
    .notEmpty()
    .withMessage("La frontera es requerido, no puede estar vacío")
    .customSanitizer((value) => {
      if (typeof value === "string") {
        return value
          .split(",") // separa las fronteras por comas
          .map((p) => p.trim()) // recorre el array y elimina los espacios en blanco al principio y al final de la cadena
          .filter(Boolean); // elimina cadenas vacías automáticamente
      }
      return value;
    })

    .isArray()
    .withMessage("Debe ingresar un array"),
  body("borders.*") // - validar cada elemento individual del array
    .notEmpty()
    .withMessage("Debe indicar al menos una frontera, no puede estar vacío")
    .isLength({ min: 3, max: 3 }).withMessage("Cada frontera debe tener exactamente 3 letras") 
    .isUppercase().withMessage("Cada frontera debe estar en mayúsculas")
    .isString() //Filtra entradas no textuales
    .withMessage("La frontera debe ser un string (NO: numeros: decimal, entero, fechas,booleanos, arrays, objetos)"),

  // Área
  body("area")
    .exists().withMessage("El área es obligatoria")
    .isFloat({ min: 0 }).withMessage("El área debe ser un número positivo"),

  // Población
  body("population")
    .exists().withMessage("La población es obligatoria")
    .isInt({ min: 1 }).withMessage("La población debe ser un número entero positivo"),

  // Gini
  body("gini")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0, max: 100 }).withMessage("Gini debe estar entre 0 y 100"),
    
  // Timezones
  // body("timezones")
  //   .exists().withMessage("La zona horaria es obligatoria")
  //   .isArray().withMessage("La zona horaria debe ser un array"),
  // body("timezones.*")
  //   .matches(/^UTC[+-]\d{2}:\d{2}$/).withMessage("Cada zona horaria debe tener el formato UTC±hh:mm"),

  // Creador
  // body("creador")
  //   .exists().withMessage("El campo creador es obligatorio")
  //   .isLength({ min: 3 }).withMessage("El creador debe tener al menos 3 caracteres"),
];

// Middleware para manejar errores de validación
export const validateCountry = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: errors.array().map(err => ({ message: err.msg }))
    });
  }
  next();
};
