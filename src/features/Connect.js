import React from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Text, Grid, Flex, Box } from "@chakra-ui/core";
import db from "../data/database";

function useUsers(username) {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const userProfiles = db.queryAll("users");
    if (userProfiles.length > 0) {
      setUsers(userProfiles);
    }
  }, []);

  return users.filter((user) => user.username !== username); // exclude user profile from connections
}

export default function Connect({ username }) {
  const users = useUsers(username);

  return (
    <div>
      <Text fontSize="5xl" textAlign="center" marginBottom="20px">
        Connect
      </Text>
      {users.map((user) => (
        <FounderDetails key={user.ID} user={user} />
      ))}
    </div>
  );
}

function FounderDetails({ user }) {
  return (
    <Link to={`/founder/${user.ID}`}>
      <Grid
        templateColumns="100px 1fr"
        gap="50px"
        alignItems="center"
        backgroundColor="#f0f0f0"
        marginBottom="20px"
        padding="20px"
        borderRadius="5px"
      >
        <Avatar name={user.name} email={user.email} round />
        <Flex flexDirection="column">
          <Flex width="35%">
            <Text width="40%" fontWeight="bold">
              Name:
            </Text>
            <Text>{user.name}</Text>
          </Flex>
          <Flex width="35%">
            <Text width="40%" fontWeight="bold">
              Email:
            </Text>
            <Text>{user.email}</Text>
          </Flex>
          <Flex width="35%">
            <Text width="40%" fontWeight="bold">
              Company:
            </Text>
            <Text>{user.company}</Text>
          </Flex>
          <Flex width="35%">
            <Text width="40%" fontWeight="bold">
              Job title:
            </Text>
            <Text>{user.jobTitle}</Text>
          </Flex>
        </Flex>
      </Grid>
    </Link>
  );
}
