const express = require('express'); 
const routes = express.Router(); 
//const Autenticar = require('./middleware/autenticar'); 

const UsersController = require('./controllers/UsersController');


// Rotas
routes.get("/api/logout", (req, res) => {
    req.session.user = undefined;
    res.json({"Logout" : true});
});

routes.post("/api/autenticar", UsersController.Login);

routes.post("/api/users/criar", UsersController.Criar);

routes.get("/api/users", UsersController.Listar);

routes.get('/api/users/:id', function(req, res){
    return res.json({"GetId" : req.params.id})
});

routes.put('/api/users/:id', function(req, res){
    return res.json({"Put" : req.params.id})
});

routes.delete('/api/users/:id', function(req, res){
    return res.json({"Delete" : req.params.id})
});

/***** Rotas */ 

module.exports = routes;