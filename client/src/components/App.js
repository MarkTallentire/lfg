import React, { useState } from "react";
import Header from "./ui/Header";
import { Route, Switch } from "react-router-dom";
import Footer from "./ui/Footer";
import LandingPage from "./Pages/LandingPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";

function App() {
  const [menuSelectedIndex, setMenuSelectedIndex] = useState(0);
  const [tabValue, setTabValue] = useState(false);

  return (
    <>
      <Header
        tabValue={tabValue}
        setTabValue={setTabValue}
        menuSelectedIndex={menuSelectedIndex}
        setMenuSelectedIndex={setMenuSelectedIndex}
      />

      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
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
        <Route
          exact
          path="/communitystandards"
          component={() => <div>Community Standards</div>}
        ></Route>
        <Route exact path="/login" component={LoginPage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
      </Switch>

      <Footer
        tabValue={tabValue}
        setTabValue={setTabValue}
        menuSelectedIndex={menuSelectedIndex}
        setMenuSelectedIndex={setMenuSelectedIndex}
      />
    </>
  );
}

export default App;
