import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginWrapper from "./auth/LoginWrapper";
import LogoutPage from "./auth/LogoutPage";
import Frame from "./ui/Frame";
import Home from "./Home";
import Matches from "./Matches.js";
import Profile from "./Profile";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <LoginWrapper>
          {({ username, logout }) => (
            <Frame username={username}>
              <Switch>
                <Route path="/logout">
                  <LogoutPage logout={logout} />
                </Route>
                <Route path="/home">
                  <Home username={username} />
                </Route>
                <Route path="/matches">
                  <Matches username={username} />
                </Route>
                <Route path="/profile">
                  <Profile username={username} />
                </Route>
              </Switch>
            </Frame>
          )}
        </LoginWrapper>
      </Router>
    </ChakraProvider>
  );
};

export default App;
