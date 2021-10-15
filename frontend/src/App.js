import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "components/Footer";
import Home from "pages/Home";
import New from "pages/New";
import View from "pages/View";

const App = () => {
  return (
    <Fragment>
      <main>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/new">
            <New />
          </Route>
          <Route path="/view">
            <View />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
