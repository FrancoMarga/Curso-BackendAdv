const express = require('express');
const app = express();

app.set('PORT', 3000)
app.use(express.json());

// Datos mockeados (para simular una base de datos)
let authors = [
    // { id: 1, firstName: 'Jane', lastName: 'Doe' }
];

let books = [
    // { id: 1, book: 'Jerry Potter', authorId: 1 }
];

//Peticion para obtener todos los autores
const getAllAuthors = (req, res) => {
    try {
        //Se manejan las respuestas con codigos de respuesta http y muestra los autores
        res.status(200).json(authors);
    } catch (error) {
        //Linea para manejar los errores
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

//Peticion para obtener un autor por su ID
const getAuthorById = (req, res) => {
    try {
        //Se asigana en una constante los valores obtenidos del body para manejarlas en nuestro codigo
        const {id} = req.params;
        //Realiza la busqueda del autor con el metodo find de JS
        const author= authors.find (author=>author.id == id);

        //Manejar errores en caso de no encontrar el autor
        if(!author)throw new Error ("Autor no encontrado");
        res.status(200).json(author);            
    } catch (error) {
        //Linea para manejar los errores
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

//Peticion para crear un autor
const createAuthor = (req, res) => {
    try {
        //Se asigana en una constante los valores obtenidos del body para manejarlas en nuestro codigo
        const { id,firstName,lastName } = req.body;
        const author = {id,firstName,lastName};

        //Se agregan los datos ingresados al array de autores
        authors.push(author);
        //Se manejan las respuestas con codigos de respuesta http y muestra los autores
        res.status(201).send('Autor Creado con Éxito');
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
};

//Peticion para actualizar o modificar un autor
const updateAuthor = (req, res) => {
    try {
        const {id} = req.params;
        const {name,lastName} =  req.body;
        //Busca el autor por su ID con el metodo find
        const author = authors.find(author => author.id == id);
        //Comprueba si existe el usuario que estamos buscando
        if(author){
            //Si existe modifica los datos de ese autor con los ingresados 
            author.firstName=name;
            author.lastName=lastName;
            res.status(202).send("Autor Modificado con Éxito")     
        }else{
            //Si no existe devuelve un codigo de solicitud incorrecta y un mensaje
            res.status(400).send("Autor no encontrado");
        }
    } catch (error) {
        console.log(error);
        res.status(304).send({error: error.message});
    }
}

//Peticion para eliminar un autor
const deleteAuthor = (req, res) => {
    try {
        const {id} = req.params;
        //Al no tener un modelo para los autores ingresados no podremos utilizar el metodo delete. Y los simulamos utilizando el metodo filter
        authors = authors.filter(author => author.id !== id);
        res.status(202).send("Autor Eliminado con Éxito");
    } catch (error) {
        console.log(error);        
        res.status(500).send({error : error.message});
    }
}

//Peticion para obtener todos los libros
const getAllBooks = (req, res) => {
    try {
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});
    }
}

//Peticion para obtener un libro por su ID
const getBookById = (req, res) => {
    try {
        const {id} = req.params;
        const book = books.find(book => book.id == id);
        
        if(!book)throw new Error ('Libro no encontrado')
        res.status(200).json(book)
    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});
        
    }
}

//Peticion para crear un libro
const createBook = (req, res) => {
    try {
        const { id,book,authorId } = req.body;
        //Compara el ID de autores ingresados y con el listado de ID de autores
        const author = authors.find(author => author.id == authorId);
        //Guarda los datos ingresados por el body y la informacion del autor encontrado anteriormente 
        const bookItem = { id,book,author };
        
        //Si el autor no existe crea el libro pero con un mensaje expesificando que se creo pero no se econtro el autor
        if(!author)res.status(201).send("Libro Creado con Éxito pero NO se encontro el autor")
        
        //Si el autor ingresado existe se agrega el libro en nuestro array con los datos ingresados y los del autor
        books.push(bookItem);
        res.status(201).send("Libro Creado con Éxito");    
    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});  
    }
}

//Peticion para actualizar o modificar un libro
const updateBook = (req, res) => {
    try {
        const {id} = req.params;
        const {book,authorId} = req.body;

        //Busca y compara el id ingresado del autro en el listado de autores
        const author = authors.find(author => author.id == authorId);

        const bookItem = books.find(book => book.id == id);
        if(bookItem){
            bookItem.book = book;
            //Funcion ternaria para verificar si el id autor existe 
            author?
                //Si el autor existe modifica el libro correspondiente con datos ingresados y incluye los datos del autor 
                (bookItem.author = author,
                res.status(200).send("Libro Modificado con Éxito"))
            : 
                //Si el autor no existe modifica el libro pero expecifica con un mensaje que el autor no se encontro
                res.status(200).send("Libro Modificado con éxito pero el autor no fue encontrado")
        }else{
            res.status(400).send("Libro no encontrado");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});        
    }
}

//Peticion para eliminar un libro
const deleteBook = (req, res) => {
    try {
        const {id} = req.params;
        books = books.filter(book => book.id !== id);
        res.status(202).send("Libro Eliminado Exitosamente");
    } catch (error) {
        console.log(error);
        res.status(500).send({error : error.message});
    }
}

// Rutas para los autores instanciadas aqui ---
app.post ('/createAuthor',createAuthor);
app.get ('/getAuthors',getAllAuthors);
app.get ('/author/:id', getAuthorById);
app.put ('/authorEdit/:id', updateAuthor);
app.delete( '/authorDelete/:id', deleteAuthor);
// Rutas para los libros instanciadas aqui ---
app.post ('/createBook', createBook);
app.get ('/getBooks', getAllBooks);
app.get ('/book/:id', getBookById);
app.put ('/bookEdit/:id', updateBook);
app.delete ('/bookDelete/:id', deleteBook);


module.exports = {
    app,
    createAuthor,
    createBook,
    deleteAuthor,
    deleteBook,
    getAllAuthors,
    getAllBooks,
    getAuthorById,
    getBookById,
    updateAuthor,
    updateBook,
}