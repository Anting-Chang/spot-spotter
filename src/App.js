import logo from './logo.svg';
import './App.css';
import React, {useContext} from "react";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
    useHistory
} from 'react-router-dom';

import {useAuth} from "./shared/hooks/auth-hook";
import {AuthContext} from "./shared/context/auth-context";
import Auth from "./pages/user/pages/Auth";
import Map from "./pages/main/components/Map";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Main from "./pages/main/pages/Main";
import AddPoint from "./pages/add-point/pages/AddPoint";

function App() {
    const {token, logout, login, userId} = useAuth()
    const auth = useContext(AuthContext)

    let routes

    if (!!token) {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Main />
                </Route>
                <Route path="/add-point">
                    <AddPoint />
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    } else {
        routes = (
            <Switch>
                <Route path="/" exact>
                    <Main />
                </Route>

                <Route path="/login">
                    <Auth />
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login: login,
            logout: logout
        }}>
            <Router>
                <div style={{display: 'flex'}}>
                    <MainNavigation/>
                    {routes}
                </div>

            </Router>

        </AuthContext.Provider>
    );
}

export default App;
