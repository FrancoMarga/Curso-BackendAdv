const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }]
});

const Category = mongoose.model('Categories', CategorySchema, 'Categories');

module.exports = Category;