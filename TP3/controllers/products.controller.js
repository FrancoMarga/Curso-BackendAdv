const categoryModel = require('../models/Category.model');
const productModel = require ('../models/Product.model');
const { makeSuccessResponse, makeErrorResponse } = require('../utils/response.utils');

//Controlador para crear un producto y agregar la relacion con cateogrias
const createProduct = async ( req, res, next ) => {
    try {
        const { name, price, description, category } = req.body;

        const product = await productModel.create ({ name, price, description, category });

        const categoryRel = await categoryModel.findById( category );

        categoryRel?.products?.push( product._id );
        await categoryRel?.save();

        res.status(201).json( makeSuccessResponse( product ) );
        
    } catch (err) {
        next(err);
    }

};

//Controlador para mostrar todos los productos con su relacion y sus caracteristicas con el metodo populate
const getAllProducts = async ( req, res, next ) => {
    try {
        const product = await productModel.find({}).populate({
            path: 'category',
            select: 'category description'
        });

        res.status(200).json( makeSuccessResponse ( product ) );

    } catch (err) {
        next(err);
    }
};

//Controlador para mostrar un producto por ID
const getProductById = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById ( id ).populate({
            path: 'category',
            select: 'category description'
        });

        if( !product ) res.status(400).json( makeErrorResponse ('No se encontro la categoría') );

        res.status(200).json( makeSuccessResponse ( product ) );

    } catch (err) {
        next(err);        
    }
};

//Controlador para actualizar o editar un producto por ID y actualizar su relacion con categorias tambien
const updateProductById = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        const { name, price, description, category } = req.body;

        const product = await productModel.findById (id);

        if(!product) res.status(400).json(makeErrorResponse('No se encontró la categoría'));

        name && ( product.name = name );
        price && ( product.price = price );
        description && ( product.description = description );

        if( category ){
            //En el caso de que hayamos ingresado una nueva categoria debemos eliminar la anterior y su relacion en el m}odel}o de categorias

            //Seccion para eliminar la relacion anterior que tenia nuestro producto si es que existiera alguna
            const oldCategory = product.category;
            if( oldCategory && oldCategory !== category ){
                const categoryOldRel = await categoryModel.findById( oldCategory );
                if( categoryOldRel ){
                    categoryOldRel.products = categoryOldRel.products.filter( (products) => (products != id) );
                    await categoryOldRel.save();
                }
            }

            //Seccion para guardar nuestro producto en la nueva categoria y mantener la} relacion
            const newCategory = category;
            const categoryNewRel = await categoryModel.findById( newCategory );
            if(categoryNewRel){
                console.log(categoryNewRel);
                if(!categoryNewRel.products.includes(id)){
                    categoryNewRel.products.push(id);
                    await categoryNewRel.save();
                }
            }
            
            product.category = category;
            await product.save();
        } 

        await product.save();

        res.status(200).json( makeSuccessResponse ( product ) );
        
    } catch (err) {
        next(err);    
    }
};

//Controlador para eliminar un producto por ID y eliminar la relacion en categorias
const deleteProductById = async ( req, res, next ) => {
    try {
        const { id } = req.params;
        
        const product = await productModel.findByIdAndDelete( id );
        
        if( product ){
            const categoryRel = await categoryModel.findById( product.category );

            if(categoryRel){
                categoryRel.products = categoryRel.products.filter ( (products) => (products != id) );
                await categoryRel.save();
            }

            res.status(200).json( makeSuccessResponse ( product ) );
                
        }else{
            res.status(400).json( makeErrorResponse ('No se encontró la categoría') );
        }
                
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};