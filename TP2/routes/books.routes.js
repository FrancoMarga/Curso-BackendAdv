const express = require ('express');
const {  mongoIdValidation, errorMiddleware } = require('../middlewares/common.middleware');
const { dataBooksValidations,EditBooksValidations } = require('../middlewares/books.middleware');
const { createBook, getAllBooks, getBookById, updateBookById, deleteBookById } = require('../controllers/books.controller');

const route = express();

//Peticion Post para crear un libro, contiene sus middlewares para manejar errores y la validacion de las solicitudes
route.post ('/create',
    dataBooksValidations, 
    createBook,
    errorMiddleware,
);
//Peticion Get para traer un listado de todos los libros existentes, contiente middlewar para manejar errores
route.get ('/',
    getAllBooks,
    errorMiddleware
);
//Peticion Get para traer un libro por ID, contiene middleware de validacion de ID de mongo y manejo de errores
route.get('/:id',
    mongoIdValidation,
    getBookById,
    errorMiddleware
);
//Peticion Put para actualizar un libro por ID, contiene middlewares para: validacion de la solicitud, validacion de ID de mongo y manejo de errores
route.put ('/edit/:id',
    mongoIdValidation,
    EditBooksValidations,
    updateBookById,
    errorMiddleware
);
//Peticion Delete para eliminar un libro por ID, contiene middleware para validacion de ID de mongo y manejo de errores
route.delete ('/delete/:id', 
    mongoIdValidation,
    mongoIdValidation,
    deleteBookById,
    errorMiddleware
);

module.exports = route;