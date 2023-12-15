const { app } = require("./app");

const PORT = app.get('PORT')
app.listen(PORT, () => console.log('Library API Server running on port', PORT))