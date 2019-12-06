// model user criado com sequelize
const user = require('../models/user');

//biblicoteca bcrypt para fazer hash de senha do usuario
const bcrypt = require('bcryptjs');

function Deletar(req, res) {
    let id = req.params.id;

    if(id != undefined) {
        if(!isNaN(id)) {
            user.destroy({
                where : {
                    id : id
                }
            })
            .then(() => {
                res.json({Ok : true})
            })
        }
    } else {
        res.error({"message" : "Não foi possível deletar!"})
    }

}

function Listar(req, res) {
    user.findAll()
    .then(users => {
        res.json({users : users});
    });
  
}

function Editar(req, res) {
    let id = req.params.id;   
    
    if(isNaN(id) && isNaN(req.body.id)) {
        res.error({"message" : "Parâmetro inválido!"})
    } else {
        let senha = req.body.senha;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(senha, salt);   

        user.update({email : req.body.email, senha : hash },{
            where : {
                id : id
            }
        })
        .then(() => {
            res.json({"message" : "Usuário alterado com sucesso!"})
        })
        .catch((error) => {
            res.error({"message" : "Não foi possível alterar o usuário!"})
        });

    }
}

function Criar(req, res) {
    let email = req.body.email;
    let senha = req.body.senha;
   

    if(email && senha) {        

        // Criptografamos a senha do usuário
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(senha, salt);      
        
        // Criação do login do usuário
        user.create({
            email : email,
            senha : hash
        })
        .then(() => {
            res.json({"Message" : "Usuário cadastrado com sucesso", "error" : false});
        })
        .catch((error) => {
            console.error(error);
            res.json({"Message" : "Email já cadastrado.", "error" : true});
        });        
    } 
    else {
        res.json({"Message" : "Email e senha são obrigatórios.", "error" : true});

    } 

    
}

function Login(req, res) {
    let email = req.body.email;
    let senha = req.body.senha;

    user.findOne({where : {
        email : email
    }})
    .then(user => {
        if(user != undefined) { // se exister um usuário com esse email
            let correta = bcrypt.compareSync(senha, user.senha);

             if(correta) {
                // req.session.user = {
                //     id : user.id,
                //     email : user.email
                // }

                res.json({
                    id : user.id,
                    email : user.email
                });

             } else {
                res.json({Ok : false});
             }

        } else {
            res.json({Ok : false});
        }
    })
}

module.exports = {Listar, Criar, Login, Deletar, Editar};
