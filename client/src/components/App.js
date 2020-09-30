import React, { useState, useEffect } from "react";
import Header from "./ui/Header";
import { Route, Switch, useLocation } from "react-router-dom";
import Footer from "./ui/Footer";
import LandingPage from "./Pages/LandingPage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ApiClient from "../ApiClient";
import CreateGroup from "./Pages/CreateGroup";
import UserSearch from "./Pages/UserSearch";
import LFG from "./Pages/LFG";
import Profile from "./Pages/Profile/Profile";

function App() {
  const [menuSelectedIndex, setMenuSelectedIndex] = useState(0);
  const [tabValue, setTabValue] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [onAuthPage, setOnAuthPage] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log(location);
    if (location.pathname === "/login" || location.pathname === "/register") {
      setOnAuthPage(true);
    } else {
      setOnAuthPage(false);
    }
  }, [location]);

  useEffect(() => {
    if (!currentUser || currentUser === true) {
      if (localStorage.getItem("jwt")) {
        ApiClient.get("/auth")
          .then((response) => setCurrentUser(response.data))
          .catch((error) => localStorage.removeItem("jwt"));
      }
    }
  }, [currentUser]);

  return (
    <>
      {!onAuthPage && (
        <Header
          tabValue={tabValue}
          setTabValue={setTabValue}
          menuSelectedIndex={menuSelectedIndex}
          setMenuSelectedIndex={setMenuSelectedIndex}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <LandingPage {...props} currentUser={currentUser} />
            )}
          ></Route>
          <Route exact path="/creategroup" component={CreateGroup} />
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
          <Route
            exact
            path="/login"
            render={(props) => (
              <LoginPage
                {...props}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            )}
          ></Route>
          <Route exact path="/lfm" component={UserSearch}></Route>
          <Route exact path="/lfg" component={LFG}></Route>
          <Route
            exact
            path="/register"
            render={(props) => (
              <RegisterPage
                {...props}
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            )}
          ></Route>
          <Route
            exact
            path="/profile/:id"
            render={(props) => <Profile currentUser={currentUser} />}
          />
        </Switch>
      </main>
      {!onAuthPage && (
        <Footer
          tabValue={tabValue}
          setTabValue={setTabValue}
          menuSelectedIndex={menuSelectedIndex}
          setMenuSelectedIndex={setMenuSelectedIndex}
        />
      )}
    </>
  );
}

export default App;
