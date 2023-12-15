const booksModel = require("../models/books.model");

const createBook = async ( req, res, next ) => {
    try{
        //Desestructuramos la informacion del body para manejar mejor los datos
        const {bookName,gender,publisher} = req.body;
        
    
        //Se crea el libro en nuestro base de datos segun nuestro modelo
        await booksModel.create({bookName,gender,publisher});
    
        
        //Se manejan las respuestas con codigos de respuesta http y muestra los autores
        res.status(201).send(`Libro ${bookName} creado con éxito`);
    }catch(err){
        //En caso de error lo guarda y pasa al siguiente controlador para comprobar si hay otro error
        next(err);
    }
};

const getAllBooks = async ( req, res, next ) => {
    try {
        //Buscamos la lista de todo los libros
        const books = await booksModel.find();
        //Se manejan las respuestas con codigos de respuesta http y muestra los autores
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
};

const getBookById = async ( req, res, next ) => {
    try {
        //Desestructuramos el id de nuestros parametros
        const {id} = req.params;
        //Buscamos el libro con el id ingresado
        const book = await booksModel.findById(id);

        //Maneja errores en caso de no econtrar el libro
        if(!book) res.status(400).json({ message : `El libro con el id:${id} no fue encontrado.` });

        //En caso de encontrarlo al libro, se manejan las respuestas con codigos de respuesta http y lo muestra
        res.status(200).json(book);
        

    } catch (err) {
        next(err)
    }
};

const updateBookById = async ( req, res, next ) => {
    try {
        const {id} = req.params;
        const {bookName, gender, publisher} =  req.body;
        //Busca el autor por su ID con el metodo findByID
        const book = await booksModel.findById (id);

        //Maneja errores en caso de no econtrar el libro
        if(!book) res.status(400).json({ message : `El libro con el id:${id} no fue encontrado.` });

        //En caso de encontrarlo modifica el libro con los datos ingresados, si no ingreso cierto dato se rellena con los ya existentes
        book.bookName = bookName ?? book.bookName;
        book.gender = gender ?? book.gender;
        book.publisher = publisher ?? book.publisher;
        //Guardamos los cambios
        await book.save();
        //Enviamos al respuesta con un estado 200 y un mensaje de confirmacion
        res.status(200).send(`Libro ${book.bookName} actualizado con éxito`)
        
    } catch (err) {
        next(err);
    }
};

const deleteBookById = async ( req, res, next ) => {
    try {
        const {id} = req.params;

        //Busca por ID el libro y luego lo elimna
        const book = await booksModel.findByIdAndDelete(id);

        //Maneja errores en el caso de no encontrar el libro 
        if(!book) res.status(400).json({ message : `El libro con el id:${id} no fue encontrado.` });
        
        res.status(200).send(`Libro ${book.bookName} eliminado con éxito`)

    } catch (err) {
        next(err);
    }
}

module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
}