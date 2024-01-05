const { body } = require('express-validator');
const { requestValidation } = require('./common.middleware');

const productValidationData = [
    body('name')
        .notEmpty().withMessage('name is required')
        .isString().withMessage('name must be a string'),
    body('price')
        .notEmpty().withMessage('price is required')
        .isNumeric().withMessage('price must be a number'),
    body('description')
        .notEmpty().withMessage('description is required')
        .isString().withMessage('description must be a string'),
    body('category').optional().isMongoId().withMessage('category must be a Mongo ID'),

    requestValidation
];
const productValidationEditData = [
    body('name').optional().isString().withMessage('name must be a string'),
    body('price').optional().isNumeric().withMessage('price must be a number'),
    body('description').optional().isString().withMessage('description must be a string'),
    body('category').optional().isMongoId().withMessage('category must be a Mongo ID'),

    requestValidation
];

module.exports = {
    productValidationData,
    productValidationEditData
};