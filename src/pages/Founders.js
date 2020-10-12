import React, { useState } from "react";
import { SimpleGrid, Heading } from "@chakra-ui/core";
import db from "../data/database";
import Card from "../ui/Card";

export default ({ username, completed }) => {
  const [founders, setFounders] = useState(
    db.queryAll("founders", {
      query: (row) => row.username !== username,
    })
  );

  const sendInvitation = (founder) => {
    const [match] = db.queryAll("matches", {
      query: { username: founder, invitedUsername: username },
      limit: 1,
    });

    if (match) {
      // connection already exist, time to match both parties
      db.insertOrUpdate(
        "matches",
        { username: founder, invitedUsername: username },
        { username: founder, invitedUsername: username, status: "completed" }
      );
      db.insertOrUpdate(
        "matches",
        { username: username, invitedUsername: founder },
        { username: username, invitedUsername: founder, status: "completed" }
      );
    } else {
      // send one way invitation
      db.insertOrUpdate(
        "matches",
        { username, invitedUsername: founder },
        { username, invitedUsername: founder, status: "invited" }
      );
    }
    db.commit();
    setFounders(
      founders.map((element) =>
        element.username === founder.username
          ? { ...element, matchStatus: "pending" }
          : element
      )
    );
  };

  const renderPosts = () => {
    const invitations = db.queryAll("matches", { query: { username } });
    const results = founders
      .map((founder) => ({
        ...founder,
        matchStatus:
          invitations.find(
            (invitation) => invitation.invitedUsername === founder.username
          )?.status || "new",
      }))
      .filter((founder) =>
        completed ? founder.matchStatus === "completed" : true
      );
    if (!results.length) return <Heading>No founders found :(</Heading>;
    return results.map((founder, index) => (
      <Card
        {...founder}
        id={index}
        matchStatus={founder.matchStatus}
        key={index}
        sendInvitation={sendInvitation}
      ></Card>
    ));
  };

  return (
    <SimpleGrid columns={2} spacing={5}>
      {renderPosts()}
    </SimpleGrid>
  );
};
