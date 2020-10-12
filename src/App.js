import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core";
import LoginWrapper from "./auth/LoginWrapper";
import LogoutPage from "./auth/LogoutPage";
import Frame from "./ui/Frame";
import Settings from "./pages/Settings";
import Founders from "./pages/Founders";

const OnboardingApp = ({ username, logout }) => (
  <Frame username={username}>
    <Switch>
      <Route path="/logout">
        <LogoutPage logout={logout} />
      </Route>
      <Route path="*">
        <Settings username={username} onboarding />
      </Route>
    </Switch>
  </Frame>
);

const OnboardedApp = ({ username, logout }) => (
  <Frame username={username}>
    <Switch>
      <Route path="/logout">
        <LogoutPage logout={logout} />
      </Route>
      <Route path="/settings">
        <Settings username={username} />
      </Route>
      <Route path="/matches">
        <Founders username={username} completed />
      </Route>
      <Route path="/">
        <Founders username={username} />
      </Route>
    </Switch>
  </Frame>
);

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <LoginWrapper>
          {({ username, logout, onboarded }) =>
            onboarded ? (
              <OnboardedApp username={username} logout={logout} />
            ) : (
              <OnboardingApp username={username} logout={logout} />
            )
          }
        </LoginWrapper>
      </ThemeProvider>
    </Router>
  );
}

export default App;
