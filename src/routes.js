import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./containers/Users";
import Home from "./containers/Home";


function Rotas() {

    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/usuarios" component={Users} />
            </Switch>
        </Router>

    )

}

export default Rotas;