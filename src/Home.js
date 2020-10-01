import React from "react";
import { Link } from "react-router-dom";
import { Text, Button } from "@chakra-ui/core";

export default function Home({ username }) {
  return (
    <section>
      <Text fontSize="4xl">Welcome {username}</Text>
      <Link to="/create-profile">
        <Button>Create your profile</Button>
      </Link>
    </section>
  );
}
