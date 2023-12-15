const express = require('express');
const authorRoutes = require ('../routes/authors.routes');
const bookRoutes = require ('../routes/books.routes');

//Instanciamos express
const app = express();

//Instanciamos nuestro puerto y su valor
app.set('PORT', 3000);

//Middlewars
app.use(express.json());

//Instaciamos nuestras rutas
app.use ('/authors', authorRoutes);
app.use ('/books', bookRoutes);



module.exports =  app;
