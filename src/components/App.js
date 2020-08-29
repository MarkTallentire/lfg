import React from "react";
import Header from "./ui/Header";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={() => <div>Home</div>}></Route>
        <Route
          exact
          path="/aboutus"
          component={() => <div>About Us</div>}
        ></Route>
        <Route
          exact
          path="/comingsoon"
          component={() => <div>Coming Soon</div>}
        ></Route>
        <Route exact path="/faqs" component={() => <div>FAQs</div>}></Route>
        <Route exact path="/merch" component={() => <div>Merch</div>}></Route>
        <Route
          exact
          path="/partners"
          component={() => <div>Partners</div>}
        ></Route>
        <Route
          exact
          path="/support"
          component={() => <div>Support</div>}
        ></Route>
        <Route
          exact
          path="/contact"
          component={() => <div>Contact</div>}
        ></Route>
        <Route exact path="/login" component={() => <div>Login</div>}></Route>
        <Route
          exact
          path="/register"
          component={() => <div>SignUp</div>}
        ></Route>
      </Switch>
    </>
  );
}

export default App;
