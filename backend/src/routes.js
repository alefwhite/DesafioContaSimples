const express = require('express'); 
const routes = express.Router(); 
const Autenticar = require('./middleware/autenticar'); 

const UsersController = require('./controllers/UsersController');


// Rotas
routes.get("/logout", (req, res) => {
    res.session.user = undefined;
    res.redirect("/");
});

routes.post("/autenticar", UsersController.Login);

routes.get("/login", (req, res) => res.redirect("/"));

routes.get("/admin/users", Autenticar, UsersController.Listar);

routes.post("/admin/users/criar", Autenticar, UsersController.Criar);

routes.post('/produtos', function(req, res){
    return res.json(req.body)
});

routes.get('/', function(req, res){
    return res.json({"Teste" : "get"})
});

routes.get('/produtos/:id', function(req, res){
    return res.json({"GetId" : req.params.id})
});

routes.put('/produtos/:id', function(req, res){
    return res.json({"Put" : req.params.id})
});

routes.delete('/produtos/:id', function(req, res){
    return res.json({"Delete" : req.params.id})
});

/***** Rotas */ 

module.exports = routes;