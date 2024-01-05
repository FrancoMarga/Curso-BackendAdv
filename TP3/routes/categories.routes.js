const express = require ('express');
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware');
const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/categories.controller');
const { categoryValidationData, categoryValidationEditData } = require('../middlewares/category.middleware');

const route = express();

//Instanciamos nuestra peticion POST con sus respectivos middlewares para valdacion de datos ingresados y manejo de errores 
route.post ('/create', 
    categoryValidationData,
    createCategory,
    errorMiddleware
);

//Instanciamos nuestra peticion GET con su middleware manejo de errores 
route.get ( '/', 
    getAllCategories,
    errorMiddleware
);

//Instanciamos nuestra peticion GET con sus middlewares de validacion de mongoID y manejo de errores 
route.get ('/:id',
    validateMongoId,
    getCategoryById,
    errorMiddleware
);
//Instanciamos nuestra peticion PUT con sus respectivos middlewares para valdacion de mongo ID, validacion de datos ingresados y manejo de errores 
route.put ('/edit/:id',
    validateMongoId,
    categoryValidationEditData,
    updateCategoryById,
    errorMiddleware
);
//Instanciamos nuestra peticion DELETE con sus respectivos middlewares para valdacion de mongo ID y manejo de errores 
route.delete ('/delete/:id',
    validateMongoId,
    deleteCategoryById,
    errorMiddleware
);

module.exports = route;