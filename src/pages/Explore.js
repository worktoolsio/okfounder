import React, { useState, useEffect } from "react";
import {
  Flex,
  Spinner,
  Avatar,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Tag,
} from "@chakra-ui/react";
import db from "../data/database";
import { AddIcon, CloseIcon, CheckIcon } from "@chakra-ui/icons";

const Explore = ({ username }) => {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    setLoading(true);
    const res1 = db.queryAll("users", {
      query: {},
    });
    setUsers(res1);

    const res2 = db.queryAll("matches", {
      query: {},
    });
    setMatches(res2);

    setLoading(false);
  };

  const connectButtonSetup = (toUser) => {
    let text = "Connect";
    let variant = "solid";
    let icon = <AddIcon />;
    let color = "teal";
    matches.forEach((match) => {
      if (match.from === username && match.to === toUser) {
        text = "Cancel request";
        variant = "outline";
        color = "red";
        icon = <CloseIcon />;
      } else if (match.from === toUser && match.to === username) {
        text = "Accept request";
        color = "blue";
        icon = <CheckIcon />;
      }
    });
    return (
      <Button
        onClick={(e) => onButtonClicked(toUser)}
        mt={4}
        leftIcon={icon}
        colorScheme={color}
        variant={variant}
        isLoading={loading}
      >
        {text}
      </Button>
    );
  };

  const onButtonClicked = (toUser) => {
    let count = 0;
    matches.forEach((match) => {
      if (match.from === username && match.to === toUser) {
        db.deleteRows("matches", { from: username, to: toUser });
        count++;
      } else if (match.from === toUser && match.to === username) {
        db.insertOrUpdate(
          "matches",
          { from: toUser, to: username },
          { status: "matched" }
        );
        count++;
      }
    });
    if (count === 0) {
      db.insert("matches", {
        from: username,
        to: toUser,
        status: "pending",
      });
      count++;
    }
    db.commit();
    fetch();
  };

  if (!loading) {
    return (
      <Flex direction="column">
        <Heading mb={4}>Explore</Heading>
        <SimpleGrid columns={[1, 1, 2]} spacing={(2, 2, 10)} mx={(2, 2, 0)}>
          {users
            .filter((user) => {
              return username !== user.username;
            })
            .filter((user) => {
              let matchedUsers = [];
              matches.forEach((match) => {
                if (match.status === "matched") {
                  if (match.to === username) {
                    matchedUsers.push(match.from);
                  } else matchedUsers.push(match.to);
                }
              });
              return !matchedUsers.includes(user.username);
            })
            .map((user) => {
              return (
                <Flex
                  direction="row"
                  p={4}
                  key={user.username}
                  borderWidth="1px"
                  rounded="lg"
                  pb={6}
                >
                  <Avatar
                    size="lg"
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                  <Flex direction="column" ml={2}>
                    <Heading as="h5" size="md">
                      {user.username}
                    </Heading>
                    <Text fontSize="md">{user.bio}</Text>
                    <Flex direction="row" wrap="wrap" mb={2} mx={-1}>
                      {user.skills.map((skill) => {
                        return (
                          <Tag
                            size="sm"
                            variant="outline"
                            colorScheme="orange"
                            key={skill}
                            m={1}
                          >
                            {skill}
                          </Tag>
                        );
                      })}
                    </Flex>
                    {connectButtonSetup(user.username)}
                  </Flex>
                </Flex>
              );
            })}
        </SimpleGrid>
      </Flex>
    );
  } else {
    return (
      <Flex justify="center">
        <Spinner
          thickness="4px"
          speed="0.5s"
          emptyColor="gray.200"
          color="teal.500"
          size="lg"
          mt={64}
        />
      </Flex>
    );
  }
};

export default Explore;
