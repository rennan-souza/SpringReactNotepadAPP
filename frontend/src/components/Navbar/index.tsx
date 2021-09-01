import './styles.css';

import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { getAuthData, getTokenData, isAuthenticated, removeAuthData } from "../../util/requests";

const Navbar = () => {

    const history = useHistory();

    const { authContextData, setAuthContextData } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated()) {
            setAuthContextData({
                autheticated: true,
                tokenData: getTokenData(),
            });
        } else {
            setAuthContextData({
                autheticated: false,
            });
        }
    }, [setAuthContextData]);

    const handleLogoutClick = () => {
        removeAuthData();
        setAuthContextData({
            autheticated: false,
        });
        history.replace("/home");
    };

    return (
        <>
            {
                authContextData.autheticated ? (
                    <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                        <Link className="navbar-brand" to="/notes"> <span className="logo-sm">NoteAPP</span> <span className="logo">NotepadAPP</span>  </Link >
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown">
                                    <button className="nav-link dropdown-toggle btn shadow-none" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {getAuthData().userFullName}
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <Link className="dropdown-item" to="/user/profile">Meus dados</Link>
                                        <Link className="dropdown-item" to="/user/security">Alterar minha senha</Link>
                                        <div className="dropdown-divider"></div>
                                        <button className="dropdown-item" onClick={handleLogoutClick}>Sair</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                ) : (
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                        <Link className="navbar-brand" to="/home"> <span className="logo-sm">NoteAPP</span> <span className="logo">NotepadAPP</span> </Link >
                        <div className="ml-auto">
                            <Link to="/auth/signup" className="btn btn-sm btn-primary mr-1">CRIAR CONTA</Link>
                            <Link to="/auth/signin" className="btn btn-sm btn-outline-primary">LOGIN</Link>
                        </div>
                    </nav >
                )
            }
        </>
    )
}

export default Navbar;