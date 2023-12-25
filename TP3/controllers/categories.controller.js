const categoryModel = require ('../models/Category.model');
const { makeSuccessResponse, makeErrorResponse } = require('../utils/response.utils');

const createCategory = async ( req,res,next) => {
    try {
        const { category, description } = req.body;

        const categoryItem = categoryModel.create ({ category, description });

        res.status(201).json (makeSuccessResponse(categoryItem));
        
    } catch (err) {
        next(err);
    }

};

const getAllCategories = async ( req, res, next ) => {
    try {
        const categories = await categoryModel.find ({});

        res.status(201).json(makeSuccessResponse(categories));

    } catch (err) {
        next(err);
    }
};

const getCategoryById = async ( req, res, next ) => {
    try {
        const {id} = req.params;
        const category = await categoryModel.findById (id);

        if(!category) res.status(400).json(makeErrorResponse('No se encontro la categoría'));

        res.status(201).json(makeSuccessResponse(category));

    } catch (err) {
        next(err);        
    }
};

const updateCategoryById = async ( req, res, next ) => {
    try {
        const {id} = req.params;
        const { category, description } = req.body;

        const categoryItem = await categoryModel.findById (id);

        if(!categoryItem) res.status(400).json(makeErrorResponse('No se encontró la categoría'));

        category && (categoryItem.category = category);

        description && (categoryItem.description = description);

        await categoryItem.save();

        res.status(201).json(makeSuccessResponse(categoryItem));
        
    } catch (err) {
        next(err);        
    }
};

const deleteCategoryById = async ( req, res, next ) => {
    try {
        const {id} = req.params;

        const category = await categoryModel.findByIdAndDelete(id);

        if(!category) res.status(400).json(makeErrorResponse('No se encontró la categoría'));

        res.status(201).json(makeSuccessResponse(category));
        
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};