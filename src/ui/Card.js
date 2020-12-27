import React from "react";
import {
  Avatar,
  Box,
  Image,
  Flex,
  Badge,
  Text,
  Button,
  StarIcon,
  Icon,
  Heading,
} from "@chakra-ui/react";

const Card = ({ title, author }) => {
  let rating = 3;
  let count = 42;
  return (
    <Flex direction="row" maxW="sm" my={4} p={4} borderWidth="1px" rounded="lg">
      <Avatar size="lg" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
      <Flex direction="column" ml={2}>
        <Heading as="h5" size="md">
          {author}
        </Heading>
        <Text fontSize="md">
          I work on the most commonly used JSFramework in the world
        </Text>
        <Button colorScheme="teal">Let's chat!</Button>
      </Flex>
    </Flex>
  );
};

export default Card;
