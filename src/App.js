import React from "react"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/core"
import LoginWrapper from "./auth/LoginWrapper"
import LogoutPage from "./auth/LogoutPage"
import Frame from "./ui/Frame"
import Home from "./Home"
import CoFounderSearch from "./components/CoFounderSearch"
import EditProfile from "./components/EditProfile"
import Matches from "./components/Matches"

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
                <Route path="/matches">
                  <Matches />
                </Route>
                <Route path="/profile">
                  <EditProfile username={username} />
                </Route>
                <Route path="/">
                  <CoFounderSearch />
                </Route>
              </Switch>
            </Frame>
          )}
        </LoginWrapper>
      </ThemeProvider>
    </Router>
  )
}

export default App
