import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Home from "./pages/Home";
import Bag from "./pages/Bag";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />;
      <Route exact path="/sacola" component={Bag} />;
      <Route path="/" component={() => <Redirect to="/" />} />;
    </Switch>
  );
}

export default Routes;
