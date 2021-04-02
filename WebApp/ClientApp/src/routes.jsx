import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Home from "./pages/Home";
import Bag from "./pages/Bag";
import Login from "./pages/Login";
import ProductsManagement from "./pages/ProductsManagement";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />;
      <Route exact path="/sacola" component={Bag} />;
      <Route exact path="/admin" component={Login} />;
      <Route exact path="/admin/produtos" component={ProductsManagement} />;
      <Route path="/" component={() => <Redirect to="/" />} />;
    </Switch>
  );
}

export default Routes;
