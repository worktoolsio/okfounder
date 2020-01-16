import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider, theme, CSSReset, Flex } from '@chakra-ui/core'
import LoginWrapper from './auth/LoginWrapper'
import LogoutPage from './auth/LogoutPage'
import Frame from './components/ui/Frame'
import HomePage from './pages/HomePage'

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <LoginWrapper>
          {({ username, logout }) => (
            <Frame username={username}>
              <Flex direction="column" align="center">
                <Switch>
                  <Route path="/logout">
                    <LogoutPage logout={logout} />
                  </Route>
                  <Route path="/">
                    <HomePage username={username} />
                  </Route>
                </Switch>
              </Flex>
            </Frame>
          )}
        </LoginWrapper>
      </ThemeProvider>
    </Router>
  )
}

export default App
