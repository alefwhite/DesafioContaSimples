const express = require('express');
const app = express();
const port = 3333;

const routes = require('./routes');
const connection = require('./database/database');

connection.authenticate()
.then(() => {
    console.log("Conexão feita com o banco de dados...");
})
.catch((error) => {
    console.error(error);
});

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`Server starter port: ${port}.`);
});