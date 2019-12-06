import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/home/App';
import Login from './pages/login/login';
import NotFound from './pages/notfound/notfound';
import Usuarios from '../src/pages/usuarios/usuarios';

// Importamos a biblioteca react-router-dom
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import {usuarioAutenticado} from './services/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/style.css';

// Importamos o css da bibliotec toastr
import './assets/css/toastr.css';

const PermissaoAdmin = ({ component : Component}) => (
    <Route
            render={props => usuarioAutenticado() ? (
                <Component {...props} />
            ) 
            : 
            (
                <Redirect to={{ pathname: "/" }} />
            )
        }
    />
)

const Rotas = (
    <Router>
        <>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PermissaoAdmin exact path="/home" component={App}/>
                <PermissaoAdmin exact path="/usuarios" component={Usuarios}/>
                <PermissaoAdmin component={NotFound}/>
                {/* <Route component={NotFound}/> */}
            </Switch>
        </>
    </Router>
);

ReactDOM.render(Rotas, document.getElementById('root'));

