import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import auth from '../../utils/auth';
import './header.scss';

function Header() {
    const history = useHistory();

    const logout = () => {
        auth.clearAppStorage();
        history.push("/");
    }

    return (
        <header className="main-header">
            <Link to="/"><span className="main-header__heading">CityAxess</span></Link>
            {auth.getToken() ? <span>Welcome Back, {auth.getUserInfo().username} </span> : <span><Link to="/login">Login</Link></span>}
            {auth.getToken() ? <button onClick={logout}>Logout</button> : <Link to="/register">Register</Link>}
        </header>
    )
}

export default Header
