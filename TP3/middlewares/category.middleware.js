const {body} = require ('express-validator');
const { requestValidation } = require('./common.middleware');

const categoryValidationData = [
    body('category')
        .notEmpty().withMessage('category is required')
        .isString().withMessage('category must be a string'),
    body('description')
        .notEmpty().withMessage('description is required')
        .isString().withMessage('description must be a string'),
    requestValidation
];

const categoryValidationEditData = [
    body('category').optional().isString().withMessage('category must be a string'),
    body('description').optional().isString().withMessage('description must be a string'),
    requestValidation
];

module.exports = {
    categoryValidationData,
    categoryValidationEditData
};