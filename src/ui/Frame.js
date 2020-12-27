import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Frame = ({ children, username }) => {
  return (
    <Flex direction="column" align="center">
      <Box width={"100%"} maxWidth={"1000px"} pl={2} pr={2}>
        <Header>
          <Link>Home</Link>
          <Link>Matches</Link>
          <Link>Profile</Link>

          <Text>
            Hello {username}! <Link to="/logout">Log Out</Link>
          </Text>
        </Header>
        {children}
      </Box>
    </Flex>
  );
};
export default Frame;
