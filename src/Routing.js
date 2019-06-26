import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home"
import Dogs from "./components/Dogs"
import Form from "./components/Form"

function Routing() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/dogs" component={Dogs} />
                <Route path="/form" component={Form} />
            </Switch>
        </Router>
    );
}
export default Routing