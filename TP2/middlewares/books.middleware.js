const { body } = require("express-validator");
const { requestValidation } = require("./common.middleware");

//Middleware para validar los datos ingresados con los que estan en el modelo y asi manejar errores
const dataBooksValidations = [
    body('bookName').notEmpty().withMessage('bookName is required'),
    body('bookName').isString().withMessage('bookName must be a string'),
    body('gender').notEmpty().withMessage('gender is required'),
    body('gender').isString().withMessage('gender must be a string'),
    body('publisher').optional().isString().withMessage('publisher must be a string'),
    requestValidation
];
//Middleware para validar los datos ingresados para la edicion de libros ya que hay datos existentes y no hace falta que sean requeridos si o si
const EditBooksValidations = [
    body('bookName').optional().isString().withMessage('bookName must be a string'),
    body('gender').optional().isString().withMessage('gender must be a string'),
    body('publisher').optional().isString().withMessage('publisher must be a string'),
    requestValidation
]

module.exports ={
    dataBooksValidations,
    EditBooksValidations
}