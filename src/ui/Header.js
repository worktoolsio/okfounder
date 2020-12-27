import React from "react";
import { Flex } from "@chakra-ui/react";
import Logo from "./Logo";

const Header = ({ children }) => {
  return (
    <Flex
      width="100%"
      align="center"
      justify="space-between"
      direction="row"
      wrap="wrap"
      p={4}
      m={4}
    >
      <Logo />
      <Flex direction="row">{children}</Flex>
    </Flex>
  );
};

export default Header;
