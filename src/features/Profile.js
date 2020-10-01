import React from "react";
import Avatar from "react-avatar";
import { Text, Flex } from "@chakra-ui/core";

export default function Profile({ profile }) {
  if (!profile) return null;

  return (
    <Flex
      flexDirection="column"
      width="35%"
      backgroundColor="#f0f0f0"
      padding="20px"
      borderRadius="5px"
      margin="0 auto"
    >
      <Avatar
        name={profile.name}
        email={profile.email}
        round
        style={{ alignSelf: "center", marginBottom: "20px" }}
      />
      {Object.keys(profile).map((key) => (
        <Flex key={key}>
          <Text width="40%" fontWeight="bold">
            {key}
          </Text>
          <Text>{profile[key]}</Text>
        </Flex>
      ))}
    </Flex>
  );
}
