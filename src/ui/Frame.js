import React from "react"
import { Box, Flex, Text, Tabs, TabList, Tab } from "@chakra-ui/core"
import { Link } from "react-router-dom"
import Header from "./Header"

const Frame = ({ children, username }) => {
  return (
    <Flex direction="column" align="center">
    <Box width={"100%"} maxWidth={"1000px"} pl={2} pr={2}>
        <Header>
          <Tabs>
            <TabList>
              <Tab>
                <Link to="/">CoFounder Search</Link>
              </Tab>
              <Tab>
                <Link to="/matches">My Matches</Link>
              </Tab>
              <Tab>
                <Link to="/profile">Edit Profile</Link>
              </Tab>
              <Tab>
                <Link to="/logout">Log Out</Link>
              </Tab>
            </TabList>
          </Tabs>
        </Header>
        {children}
      </Box>
    </Flex>
  )
}
export default Frame
