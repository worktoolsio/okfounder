import React from "react";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";
import { Flex, Text, Button } from "@chakra-ui/core";
import db from "../data/database";

function useFounder() {
  const params = useParams();
  const [founder, setFounder] = React.useState(null);

  React.useEffect(() => {
    const user = db.queryAll("users", {
      query: { ID: params.founder },
      limit: 1,
    });

    if (user) setFounder(user);
  }, [params.founder]);

  return founder ? founder[0] : founder;
}

function useConnect(username) {
  const params = useParams();
  const [isConnected, setConnected] = React.useState(false);

  // check if founders are already connected
  React.useEffect(() => {
    const user = db.queryAll("users", {
      query: { username },
      limit: 1,
    });

    if (user?.[0].connections?.includes(params.founder)) {
      setConnected(true);
    }
  }, [params.founder, username]);

  function onConnect() {
    db.update("users", { username }, (row) => {
      row.connections = [...(row.connections || []), params.founder];
      return row;
    });
    db.commit();
    setConnected(true);
  }

  return { isConnected, onConnect };
}

export default function Founder({ username }) {
  const founder = useFounder();
  const { isConnected, onConnect } = useConnect(username);

  if (!founder) return null;

  return (
    <Flex
      flexDirection="column"
      width="35%"
      backgroundColor="#f0f0f0"
      padding="20px"
      borderRadius="5px"
      margin="0 auto"
      position="relative"
    >
      <Avatar
        name={founder.name}
        email={founder.email}
        round
        style={{ alignSelf: "center", marginBottom: "20px" }}
      />
      {Object.keys(founder).map((key) => (
        <Flex key={key}>
          <Text width="40%" fontWeight="bold">
            {key}
          </Text>
          <Text>
            {key === "connections"
              ? founder?.connections?.length
              : founder[key]}
          </Text>
        </Flex>
      ))}
      {!isConnected ? (
        <Button
          variantColor="green"
          alignSelf="center"
          marginTop="10px"
          onClick={onConnect}
        >
          Connect
        </Button>
      ) : (
        <Text marginTop="10px">
          You are connected{" "}
          <span role="img" aria-label="celebrate">
            🎉
          </span>
        </Text>
      )}
    </Flex>
  );
}
