const categoryModel = require ('../models/Category.model');
const productsModel = require ('../models/Product.model');
const { makeSuccessResponse, makeErrorResponse } = require('../utils/response.utils');

//Controlador para crear una categoria
const createCategory = async ( req,res,next) => {
    try {
        const { category, description } = req.body;

        const categoryItem = await categoryModel.create ({ category, description });

        res.status(201).json( makeSuccessResponse( categoryItem ) );
        
    } catch (err) {
        next(err);
    }

};

//Controlador para mostrar todas las categorias
const getAllCategories = async ( req, res, next ) => {
    try {
        const categories = await categoryModel.find({}).populate({
            path: 'products',
            select: 'name price description'
        });

        res.status(200).json( makeSuccessResponse( categories ) );

    } catch (err) {
        next(err);
    }
};

//Controlador para mostrar una categoria por ID
const getCategoryById = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findById (id);

        if( !category ) res.status(400).json( makeErrorResponse( 'No se encontro la categoría' ) );

        res.status(200).json( makeSuccessResponse( category ) );

    } catch (err) {
        next(err);        
    }
};

//Controlador para actualizar o editar una categoria por ID
const updateCategoryById = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const { category, description } = req.body;

        const categoryItem = await categoryModel.findById ( id );

        if(!categoryItem) res.status(400).json( makeErrorResponse( 'No se encontró la categoría' ) );

        category && ( categoryItem.category = category );

        description && ( categoryItem.description = description );

        await categoryItem.save();

        res.status(200).json( makeSuccessResponse( categoryItem ) );
        
    } catch (err) {
        next(err);        
    }
};

//Controlador para eliminar una categoria por ID y eliminar su relacion con productos
const deleteCategoryById = async ( req, res, next ) => {
    try {
        const { id } = req.params;

        const category = await categoryModel.findByIdAndDelete( id );

        if(!category) res.status(400).json( makeErrorResponse( 'No se encontró la categoría' ) );

        const productsIds = [ category.products ];

        if( productsIds ){
            productsIds.map( (productId) => (async ()=>{
                const productsRel = await productsModel.findById( productId );
                if( productsRel ){
                    productsRel.category= undefined;
                    await productsRel.save();
                }
            }));
        }

        res.status(200).json( makeSuccessResponse( category ) );
        
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