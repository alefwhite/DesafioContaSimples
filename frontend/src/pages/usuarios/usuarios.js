import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Header from '../../assets/components/header/Header';
import {Jumbotron, Table, Container, ToggleButtonGroup, Button, Modal, Form} from 'react-bootstrap';
import api from '../../services/api';
import toastr from 'toastr';

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5500",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

class Usuarios extends Component{
    constructor(props) {
        super(props);

        this.state = {
            ListaDeUsuarios : [],
            show : false ,
            cadastrarUsuario : {
                email : "",
                senha : ""
            }         
        };

    }  

    // Após renderizar o componente
    async componentDidMount() {
        console.log("Carregado...");
        await this.ListarUsuarios();      
    }

    // Quando a uma atualização no componente
    componentDidUpdate() {
        console.log("Atualizando...");
    }

    async ListarUsuarios() {

        await api.get('/users')
        .then((response) => {
            console.log("Data: ", response);
            this.setState({ListaDeUsuarios : response.data.users})
        })
        .catch((error) => {
            console.log("Eerr0r: ", error);
        }); 
    }

    Cadastrar = () => {
        console.log("Cadastrando...")

        // Abrir Modal
        this.handleShow();
    }

    EfetuarCadastro = (event) => {
        event.preventDefault();
        console.log("Efetuar cadastro");

        if(this.state.cadastrarUsuario.senha !== null && this.state.cadastrarUsuario.email !== null && this.state.cadastrarUsuario.senha !== "" && this.state.cadastrarUsuario.email !== ""){
    
            api.post('/users/criar', this.state.cadastrarUsuario)
                .then((response => {        
                    console.log("Ok", response);
                    
                    if(response.status === 200) {                   
                        toastr.info("Usuário cadastrado com sucesso!");
                        this.setState({cadastrarUsuario : {
                            email : "",
                            senha : ""
                         }  
                        })
                        this.handleClose();
                        this.ListarUsuarios();                        
                    } 
            
                }))
                .catch((error) => {
                    console.log(error);
                });
    
        } else {
            toastr.error("Email e senha obrigatórios.", "Atenção");
        }
    }

    Editar = (id) => {
        console.log("Editando...")
    }

    Deletar = (id) => {
        console.log("Deletando...")
    }

    handleClose = () => this.setState({show : false});
    handleShow = () => this.setState({show : true});

    AtualizaEstado = (input) => {
        this.setState({
            cadastrarUsuario : {
                ...this.state.cadastrarUsuario, [input.target.name] : input.target.value
            }
        });
    }

    render() {
        return (
            <>
                <Header/>
                <Jumbotron fluid>
                    <Container>
                        <h1>Lista de Usuários</h1><br/>
                        <div>
                            <Button variant="success" size="lg" block onClick={() => this.Cadastrar()}>Cadastrar</Button>
                        </div>
                        <br/>

                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Email</th>
                                    <th>Senha</th>
                                    <th>Ações</th>                                   
                                                                   
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.ListaDeUsuarios.map(function(user) {

                                        return (

                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.senha}</td>
                                                <td>  
                                                    <ToggleButtonGroup type="checkbox">
                                                        <Button variant="primary" onClick={() => this.Editar(user.id)}>Editar</Button>
                                                        <Button variant="danger" onClick={() => this.Deletar(user.id)}>Deletar</Button>
                                                    </ToggleButtonGroup>                               
                                                </td>                              
                                            </tr>

                                        );

                                    }.bind(this))
                                }
                                
                            </tbody>
                        </Table>
                    </Container>
                </Jumbotron>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Usuário</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.EfetuarCadastro}>
                    <Modal.Body>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" value={this.state.cadastrarUsuario.email} onChange={this.AtualizaEstado}/>
                            <Form.Text className="text-muted">
                                Insira o email e senha para cadastrar.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="senha" value={this.state.cadastrarUsuario.senha} onChange={this.AtualizaEstado}/>
                        </Form.Group>                  
                                                                
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Sair
                    </Button>
                    <Button variant="primary" type="submit">
                        Cadastrar
                    </Button>
                    </Modal.Footer>
                    </Form>
                </Modal>
            </>
        );
    }
}

export default withRouter(Usuarios); // Conserta erros de redirecionamento

 
