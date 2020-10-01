import React from "react";
import Avatar from "react-avatar";
import { useParams } from "react-router-dom";
import { Flex, Text } from "@chakra-ui/core";
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

export default function Founder() {
  const founder = useFounder();

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
          <Text>{founder[key]}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
