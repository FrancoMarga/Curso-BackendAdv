const { validationResult, param } = require ('express-validator');

//Middleware para validar que la solicitud no sea vacía
const requestValidation = (req, res, next) => {
    const results = validationResult(req);

    if(!results.isEmpty()) return res.json({ errors: results.array() });

    next();
};
//Middleware para capturar y manejar errores
const errorMiddleware = ( err, req, res,next) => {
    console.log('Error capturado',err);
    res.status(500).json({message : 'Internal server error'});
};
//Middleware para validar que el ID ingresado pertenezca a un ID de mongoDb
const mongoIdValidation = [
    param('id').isMongoId().withMessage('Id must be a Mongo ID'),
    requestValidation
];

module.exports = {
    requestValidation,
    errorMiddleware,
    mongoIdValidation
};