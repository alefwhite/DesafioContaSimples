const express = require('express'); 
const routes = express.Router(); 
//const Autenticar = require('./middleware/autenticar'); 

const UsersController = require('./controllers/UsersController');


/***** Rotas */ 
// routes.get("/api/logout", (req, res) => {
//     req.session.user = undefined;
//     res.json({"Logout" : true});
// });

routes.get("/api/users", UsersController.Listar);

routes.post("/api/autenticar", UsersController.Login);

routes.post("/api/users/criar", UsersController.Criar);

routes.put('/api/users/:id', UsersController.Editar);

routes.delete('/api/users/:id', UsersController.Deletar);
/***** Rotas */ 

module.exports = routes;