const express = require('express');
const app = express();
const port = 3333;

const session = require('express-session');
const routes = require('./routes');
const connection = require('./database/database');

// Sessions
app.use(session({
    secret : "aleatorio",
    cookie : {maxAge : 30000000}
}));

// database
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