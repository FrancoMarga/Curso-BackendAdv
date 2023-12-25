const { validationResult, param } = require('express-validator');
const { logger } = require('../loggers');

const requestValidation = (req, res, next) => {
    const result = validationResult(req);

    if (!result.isEmpty()) return res.json({ errors: result.array() });

    next();
};

const errorMiddleware = (err, req, res, next) => {
    logger.error(err);
    res.status(500);
    res.json({ message: 'Internal server error' });
};

const validateMongoId = [
    param('id').isMongoId().withMessage('id must be a Mongo ID'),
    requestValidation,
];

module.exports = {
    requestValidation,
    errorMiddleware,
    validateMongoId
};