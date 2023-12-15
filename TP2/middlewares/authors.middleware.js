const { body } = require("express-validator");
const { requestValidation } = require("./common.middleware");

//Middleware para validar los datos ingresados con los que estan en el modelo y asi manejar errores
const dataAuthorsValidations = [
    body('firstName').notEmpty().withMessage('firstName is required'),
    body('firstName').isString().withMessage('firstName must be a string'),
    body('lastName').notEmpty().withMessage('lastName is required'),
    body('lastName').isString().withMessage('lastName must be a string'),
    requestValidation
];
//Middleware para validar los datos ingresados para la edicion de autores ya que hay datos existentes y no hace falta que sean requeridos si o si
const editAuthorsValidations = [
    body('firstName').optional().isString().withMessage('firstName must be a string'),
    body('lastName').optional().isString().withMessage('lastName must be a string'),
    requestValidation
];

module.exports = {
    dataAuthorsValidations,
    editAuthorsValidations
}