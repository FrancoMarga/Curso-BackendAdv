const express = require ('express');
const { getAllAuthors,createAuthor,getAuthorById,updateAuthor,deleteAuthor } = require ('../controllers/authors.controller');
const { errorMiddleware,mongoIdValidation } = require('../middlewares/common.middleware');
const { dataAuthorsValidations, editAuthorsValidations } = require('../middlewares/authors.middleware');


//Instanciamos express
const route = express();

//Peticion Post para crear un autor, contiene sus middlewares para manejar errores y la validacion de las solicitudes
route.post ('/create',
    dataAuthorsValidations,
    createAuthor,
    errorMiddleware
);

//Peticion Get para traer un listado de todos los autores existentes, contiente middlewar para manejar errores
route.get ('/',
    getAllAuthors,
    errorMiddleware
);

//Peticion Get para traer un autor por ID, contiene middleware de validacion de ID de mongo y manejo de errores
route.get ('/:id',
    mongoIdValidation,
    getAuthorById,
    errorMiddleware
);

//Peticion Put para actualizar un autor por ID, contiene middlewares para: validacion de la solicitud, validacion de ID de mongo y manejo de errores
route.put ('/edit/:id',
    editAuthorsValidations,
    mongoIdValidation,
    updateAuthor,
    errorMiddleware
);

//Peticion Delete para eliminar un autor por ID, contiene middleware para validacion de ID de mongo y manejo de errores
route.delete('/:id',
    mongoIdValidation,
    deleteAuthor,
    errorMiddleware
);

module.exports = route;