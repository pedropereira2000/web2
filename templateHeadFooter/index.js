import React, {useState} from 'react';
import './navbar.css';
import { Link, Redirect} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../../config/firebase';

function Navbar() {
    const dispatch = useDispatch();

    return(
    <nav className="navbar navbar-expand-lg container-conteudo text-center">
        {
            useSelector(state => state.usuarioLogado) > 0 ? null : <Redirect to="/login" />
        }
        <div className="container-fluid">
            <Link to="/" className="nav-link">
                <i class="fas fa-hourglass-half text-white fa-2x" id="ptMax"></i>
            </Link>
            <Link to="/" className="nav-link">
                <label className="text-white" id="ptMax">Ponto Max</label>
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-ellipsis-h mb-1 fa-2x text-white"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                <ul className=" navbar-nav mr-4" >
                    <li className="nav-item active">
                        <Link className="nav-link" to="/btponto"><i class="fas fa-stopwatch-20 text-white fa-2x"></i></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/historico"><i class="fas fa-history text-white fa-2x"></i></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/perfil"><i class="fas fa-address-card text-white fa-2x"></i></Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" onClick={() => dispatch({type: 'LOGOUT'})} id="logoutLink"><i class="fas fa-sign-out-alt text-white fa-2x"></i></Link>
                    </li>
                    
                </ul>
            </div>
            
            
        </div>
    </nav>
    )
}

export default Navbar;