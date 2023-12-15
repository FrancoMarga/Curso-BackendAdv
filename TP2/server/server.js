const mongoose = require("mongoose");
const  app  = require("./app");

require('dotenv').config();

const APIURL = process.env.STRING_CONNECTION;

const PORT = app.get('PORT')
app.listen(PORT, () => console.log('Estamos escuchando el puerto:', PORT));

mongoose
    .connect(APIURL)
    .then(()=> console.log('CONECTADO'))
    .catch(()=> console.log('NO CONECTADO'))
