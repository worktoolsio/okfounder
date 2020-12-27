import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";
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
                <Route path="/">
                  <Tabs>
                    <TabList>
                      <Tab>Home</Tab>
                      <Tab>Matches</Tab>
                      <Tab>Profile</Tab>
                    </TabList>
                    <TabPanels p="2rem">
                      <TabPanel>
                        <Home username={username} />
                      </TabPanel>
                      <TabPanel>
                        <Matches username={username} />
                      </TabPanel>
                      <TabPanel>
                        <Profile username={username} />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
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
