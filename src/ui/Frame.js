import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Header from "./Header";

const Frame = ({ children, username }) => {
  return (
    <Flex align="center" w="100vw" justify="center">
      <Flex
        direction="column"
        w={["95%", "90%", 650, 800, 900]}
        justify="center"
      >
        <Header>
          <Button mr={2}>
            <Link to="/explore">Explore</Link>
          </Button>
          <Button mr={2}>
            <Link to="/matches">Matches</Link>
          </Button>
          <Button mr={2}>
            <Link to="/profile">Profile</Link>
          </Button>
          <Button mr={2}>
            <Link to="/logout">Log out</Link>
          </Button>
        </Header>
        {children}
      </Flex>
    </Flex>
  );
};
export default Frame;
