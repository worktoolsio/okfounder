import React from "react";
import { Box, Button, Flex, Stack } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import Header from "./Header";

const Frame = ({ children, username }) => {
  return (
    <Flex direction="column" align="center">
      <Box width={"100%"} maxWidth={"1000px"} pl={2} pr={2}>
        <Header>
          <Stack isInline>
            <Button variant="outline">
              <Link to="/">All</Link>
            </Button>
            <Button variant="outline" variantColor="green">
              <Link to="/matches">Matches</Link>
            </Button>
            <Button variant="outline">
              <Link to="/settings">Settings</Link>
            </Button>
            <Button variant="outline">
              <Link to="/logout">Log Out</Link>
            </Button>
          </Stack>
        </Header>
        {children}
      </Box>
    </Flex>
  );
};
export default Frame;
