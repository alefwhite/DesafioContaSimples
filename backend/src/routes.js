const express = require('express');
const routes = express.Router();

const UsersController = require('./controllers/UsersController');

routes.get("/admin/users", UsersController.Listar);

routes.post("/admin/users/criar", UsersController.Criar);

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

module.exports = routes;