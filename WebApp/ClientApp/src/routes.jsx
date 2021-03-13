import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={() => <h1>Hello, world</h1>} />;
      <Route path="/" component={() => <Redirect to="/" />} />;
    </Switch>
  );
}

export default Routes;
