const authorsModel = require("../models/authors.model");

//Peticion para crear un autor
const createAuthor = async (req, res, next ) => {
    try {
        //Desestructuramos la informacion del body para manejar mejor los datos
        const { firstName,lastName } = req.body;

        //Se crea el autor en nuestro base de datos segun nuestro modelo
        await authorsModel.create({firstName,lastName});

        //Se manejan las respuestas con codigos de respuesta http y muestra los autores
        res.status(201).send(`Autor ${firstName} ${lastName} creado con éxito`);
    } catch (err) {
        //En caso de error lo guarda y pasa al siguiente controlador para comprobar si hay otro error
        next(err);
    }
};

//Peticion para obtener todos los autores
const getAllAuthors = async (req, res,next) => {
    try {
        //Buscamos el listado de los autores en nuestra DB
        const authors = await authorsModel.find();
        //Se manejan las respuestas con codigos de respuesta http y muestra los autores
        res.status(200).json(authors);
    } catch (err) {
        //En caso de error lo guarda y pasa al siguiente para comprobar si hay otro error
        next(err);
    }
}

//Peticion para obtener un autor por su ID
const getAuthorById = async (req, res, next) => {
    try {
        //Se asigana en una constante los valores obtenidos del body para manejarlas en nuestro codigo
        const {id} = req.params;
        //Realiza la busqueda del autor por ID en nuestra DB
        const author= await authorsModel.findById (id);

        //Manejar errores en caso de no encontrar el autor
        if(!author){
            res.status(400);
            return res.json({ message : `El autor con el id:${id} no fue encontrado.` });
        }
        res.status(200).json(author);            
    } catch (err) {
        //En caso de error lo guarda y pasa al siguiente para comprobar si hay otro error
        next(err);
    }
}


//Peticion para actualizar o modificar un autor
const updateAuthor = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {firstName,lastName} =  req.body;
        //Busca el autor por su ID con el metodo findByID
        const author = await authorsModel.findById (id);

        //Comprueba si existe el autor que estamos buscando
        if(!author){
            //si no existe esta linea maneja errores
            res.status(400);
            return res.json({ message : `El autor con el id:${id} no fue encontrado.` });
        }}

        //Guardamos el nombre del auto anterior para mostrarlo en el mensaje de confirmacion de la peticion
        const oldAuthor = `${author.firstName} ${author.lastName}`;
        //En caso de encontrarlo modifica el autor con los datos ingresados, si no ingreso cierto dato se rellena con los ya existentes
        author.firstName = firstName ?? author.firstName;
        author.lastName = lastName ?? author.lastName;
        //Guardamos los cambios
        await author.save();
        //Enviamos al respuesta con un estado 200 y un mensaje de confirmacion
        res.status(200).send(`Autor ${oldAuthor} actualizado con éxito`);

    } catch (err) {
        next(err);
    }
}

//Peticion para eliminar un autor
const deleteAuthor = async (req, res, next) => {
    try {
        const {id} = req.params;
        //Buscamos el autor por el id y lo eliminamos
        const author = await authorsModel.findByIdAndDelete(id);
        //Comprueba si existe el autor que estamos buscando
        if(!author){
            //si no existe esta linea maneja errores
            res.status(400);
            return res.json({ message : `El autor con el id:${id} no fue encontrado.` })
        }
    
        //En caso de encontrarlo envia una respuesta 202 y un mensaje de confirmacion
        res.status(202).send(`Autor ${author.firstName} ${author.lastName} eliminado con éxito`);
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}