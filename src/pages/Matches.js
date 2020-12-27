import React, { useState, useEffect } from "react";
import {
  Flex,
  Spinner,
  Avatar,
  Heading,
  Text,
  Link,
  Tag,
} from "@chakra-ui/react";
import db from "../data/database";

const Matches = ({ username }) => {
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

  if (!loading) {
    return (
      <Flex direction="column" w="100%">
        <Heading mb={4}>Matches</Heading>
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
            return matchedUsers.includes(user.username);
          })
          .map((user) => {
            return (
              <Flex
                direction="column"
                w="100%"
                p={4}
                key={user.username}
                borderWidth="1px"
                rounded="lg"
                pb={6}
                mb={4}
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
                  <Link href={`mailto:${user.contact}`} fontSize="md">
                    {user.contact}
                  </Link>
                </Flex>
              </Flex>
            );
          })}
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

export default Matches;
