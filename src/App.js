import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";
import LoginWrapper from "./auth/LoginWrapper";
import LogoutPage from "./auth/LogoutPage";
import Frame from "./ui/Frame";
import Home from "./Home";
import CreateProfile from "./features/CreateProfile";
import Connect from "./features/Connect";
import Founder from "./features/Founder";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <LoginWrapper>
          {({ username, logout }) => (
            <Frame username={username}>
              <Switch>
                <Route path="/logout">
                  <LogoutPage logout={logout} />
                </Route>
                <Route exact path="/">
                  <Home username={username} />
                </Route>
                <Route path="/create-profile">
                  <CreateProfile username={username} />
                </Route>
                <Route path="/connect">
                  <Connect username={username} />
                </Route>
                <Route path="/founder/:founder">
                  <Founder />
                </Route>
              </Switch>
            </Frame>
          )}
        </LoginWrapper>
      </ThemeProvider>
    </Router>
  );
}

export default App;
