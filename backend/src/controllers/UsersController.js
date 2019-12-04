const user = require('../models/user');


function Listar(req, res) {
    res.send("Listando Usuarios");
}

function Criar(req, res) {
    let email = req.body.email;
    let senha = req.body.senha;

    if(email && senha) {
        
        res.json({"Message" : "Usuário cadastrado com sucesso", "error" : false});
    } else {
        res.json({"Message" : "Email e senha obrigatórios", "error" : true});
    }
    
}

module.exports = {Listar, Criar};
