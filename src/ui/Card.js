import React, { useState } from "react";
import {
  Box,
  Avatar,
  Icon,
  IconButton,
  Collapse,
  Button,
  Text,
  Alert,
  AlertTitle,
} from "@chakra-ui/core";

import { FaLocationArrow, FaRegClock } from "react-icons/fa";

const randomGravatar = (id) =>
  `https://www.gravatar.com/avatar/${id}?s=60&d=identicon&r=PG`;

const MatchStatusButton = ({ status, onClick }) => {
  switch (status) {
    case "invited":
      return (
        <IconButton
          variant="outline"
          variantColor="gray"
          isDisabled
          icon={FaRegClock}
        />
      );
    case "completed":
      return <></>;
    default:
      return (
        <IconButton
          variant="outline"
          variantColor="teal"
          icon="add"
          onClick={onClick}
        />
      );
  }
};
const Card = ({
  id,
  username,
  firstName,
  lastName,
  location,
  introduction,
  contact,
  skills,
  matchStatus,
  sendInvitation,
}) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Box shadow="md" borderWidth="1px" rounded="lg" overflow="hidden">
      {matchStatus === "completed" && (
        <Alert status="success">
          <AlertTitle>Cofounder matched!</AlertTitle>
        </Alert>
      )}
      <Box p="6" position="relative">
        <Box position="absolute" right={4}>
          <MatchStatusButton
            status={matchStatus}
            onClick={() => sendInvitation(username)}
          />
        </Box>
        <Box d="flex" alignItems="end">
          <Avatar src={randomGravatar(id)} />
          <Box ml="2">
            <Box fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
              {firstName} {lastName}
            </Box>
            <Box
              as="h5"
              fontSize={15}
              d="flex"
              flexDirection="row"
              alignItems="center"
            >
              <Box as={FaLocationArrow} mr={1} size={2} />
              {location}
            </Box>
          </Box>
        </Box>

        {matchStatus === "completed" && (
          <Box status="success" mt={3} textAlign="center">
            <Text fontWeight="bolder">Contact information:</Text>
            <Text>{contact}</Text>
          </Box>
        )}

        <Box textAlign="justify">
          <Collapse startingHeight={0} isOpen={show} mt={2}>
            {introduction}
          </Collapse>
          <Button size="sm" onClick={handleToggle} mt="1rem">
            {show ? "Hide" : "Show"} introduction
          </Button>
        </Box>

        <Box d="flex" mt="2" alignItems="center" flexWrap="wrap">
          {skills.map(({ name, rank }, index) => (
            <Box
              d="flex"
              width="100%"
              key={index}
              mb={1}
              justifyContent="space-between"
            >
              {name}
              <Box>
                {Array(5)
                  .fill("")
                  .map((_, i) => (
                    <Icon
                      name="star"
                      key={i}
                      color={i < rank ? "teal.500" : "gray.300"}
                    />
                  ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
