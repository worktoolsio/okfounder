import React from "react";
import { Heading, Icon } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Heading>
      <Link to="/">
        <Icon name="chat"></Icon>OkFounder
      </Link>
    </Heading>
  );
};

export default Logo;
