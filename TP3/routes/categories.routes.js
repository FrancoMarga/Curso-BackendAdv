const express = require ('express');
const { errorMiddleware, validateMongoId } = require('../middlewares/common.middleware');
const { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } = require('../controllers/categories.controller');
const { categoryValidationData, categoryValidationEditData } = require('../middlewares/category.middleware');

const route = express();

route.post ('/create', 
    categoryValidationData,
    createCategory,
    errorMiddleware
);
route.get ( '/', 
    getAllCategories,
    errorMiddleware
);
route.get ('/:id',
    validateMongoId,
    getCategoryById,
    errorMiddleware
);
route.put ('/edit/:id',
    validateMongoId,
    categoryValidationEditData,
    updateCategoryById,
    errorMiddleware
);
route.delete ('/delete/:id',
    validateMongoId,
    deleteCategoryById,
    errorMiddleware
);

module.exports = route;