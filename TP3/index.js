const express = require('express');
const categoriesRoutes = require ('./routes/categories.routes');
const productsRoutes = require ('./routes/products.routes');
const { EXPRESS_CONFIG, MONGO_CONFIG } = require('./config');
const { logger } = require('./loggers');
const mongoose = require ('mongoose');
// const morgan = require('morgan');

//Instanciamos express en app
const app = express();

//Instanciamos nuestros middlewares
app.use(express.json());
// app.use(morgan(''));

//Instanciamos nuestras rutas
app.use ('/categories',categoriesRoutes);
app.use ('/products', productsRoutes);

//Instanciamos la conexion a nuestra base de datos
mongoose
    .connect(MONGO_CONFIG.URI)
    .then(() => logger.info({ message: 'Base de datos conectada' }))
    .catch(() => logger.error({ message: 'No se pudo conectar a mongo' }))

//Instanciamos el puerto
app.listen ( EXPRESS_CONFIG.PORT, ()=> logger.info(
    {
        message: 'Servidor conectandose al puerto: '+ EXPRESS_CONFIG.PORT,
        date: new Date().toLocaleString
    }
));