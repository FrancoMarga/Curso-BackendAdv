const { Schema, model} = require ('mongoose');

//Se instancia el esquema de clases
const authorsSchema = new Schema({

    //Se define "firstName" de tipo string y que es requerido
    firstName: {
        type: String,
        required : true
    },
    //Se define "lastName" de tipo string y que es requerido
    lastName: {
        type: String,
        required: true
    }
});

//Exportamos el modelo con el nombre que se guardara en la base de datos y como accedemos a ella
module.exports = model ('Authors', authorsSchema, 'Authors');