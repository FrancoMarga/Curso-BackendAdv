const { Schema, model } = require ('mongoose');

//Se instancia el esquema de clases
const booksSchema = new Schema ({
    //Se define "bookName" de tipo string y que es requerido
    bookName: {
        type: String,
        required: true
    },
    //Se define "gender" de tipo string y que es requerido
    gender: {
        type: String,
        required: true
    },
    //Se define "publisher" de tipo string y que no es requerido
    publisher: {
        type: String,
        required: false,
    }
});

//Exportamos el modelo con el nombre que se guardara en la base de datos y como accedemos a ella
module.exports= model ( 'Books', booksSchema, 'Books');