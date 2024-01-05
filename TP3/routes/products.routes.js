const express = require ('express');
const { createProduct, getAllProducts, getProductById, deleteProductById, updateProductById } = require('../controllers/products.controller');
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware');
const { productValidationEditData, productValidationData } = require('../middlewares/product.middleware');

const route = express();

//Instanciamos nuestra peticion POST con sus respectivos middlewares para valdacion de datos ingresados y manejo de errores 
route.post ('/create',
    productValidationData,
    createProduct,
    errorMiddleware
);
//Instanciamos nuestra peticion GET con su middleware manejo de errores 
route.get ( '/', 
    getAllProducts,
    errorMiddleware
);
//Instanciamos nuestra peticion GET con sus middlewares de validacion de mongoID y manejo de errores 
route.get ('/:id',
    validateMongoId,
    getProductById,
    errorMiddleware
);
//Instanciamos nuestra peticion PUT con sus respectivos middlewares para valdacion de mongo ID, validacion de datos ingresados y manejo de errores 
route.put ('/edit/:id',
    validateMongoId,
    productValidationEditData,
    updateProductById,
    errorMiddleware
);
//Instanciamos nuestra peticion DELETE con sus respectivos middlewares para valdacion de mongo ID y manejo de errores 
route.delete ('/delete/:id',
    validateMongoId,
    deleteProductById,
    errorMiddleware
);

module.exports = route;