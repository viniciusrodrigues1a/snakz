import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import Home from "./pages/Home";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />;
      <Route path="/" component={() => <Redirect to="/" />} />;
    </Switch>
  );
}

export default Routes;
