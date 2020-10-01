import React from "react";
import { Link } from "react-router-dom";
import { Text, Button } from "@chakra-ui/core";
import db from "./data/database";
import Profile from "./features/Profile";

function useProfile(username) {
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    const usersProfile = db.queryAll("users", {
      query: { username: username },
      limit: 1, // only return first profile incase there are duplicates
    });

    if (usersProfile) setProfile(usersProfile[0]);
  }, [username]);

  return profile;
}

export default function Home({ username }) {
  const profile = useProfile(username);

  return (
    <section>
      <Text fontSize="4xl" mb="20px" textAlign="center">
        Welcome {username}
      </Text>
      {profile && <Profile profile={profile} />}
      {!profile && (
        <Link to="/create-profile">
          <Button>Create your profile</Button>
        </Link>
      )}
    </section>
  );
}
