import React, { useState, useEffect } from "react";
import db from "../data/database";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Tag,
  Heading,
  TagLeftIcon,
  TagCloseButton,
  TagLabel,
  Spinner,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
// import DataAccessDemo from './features/DemoDataAccess'

const Profile = ({ username }) => {
  const skills = [
    "administrative",
    "communication",
    "design",
    "UX/UI",
    "finance",
    "marketing",
    "operations",
    "management",
    "programming",
    "sales",
  ].sort();
  const [user, setUser] = useState();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [remainingSkills, setRemainingSkills] = useState(skills);
  const [bio, setBio] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData(username);
  }, []);

  useEffect(() => {
    setRemainingSkills(
      remainingSkills.filter((item) => {
        return !selectedSkills.includes(item);
      })
    );
  }, [selectedSkills]);

  const fetchUserData = (username) => {
    setLoading(true);
    const result = db.queryAll("users", {
      query: { username: username },
    });
    const userTemp = result[0];
    setUser(userTemp);

    setSelectedSkills(userTemp.skills);
    setBio(userTemp.bio);
    setContact(userTemp.contact);
    setRemainingSkills(
      remainingSkills.filter((item) => {
        return !selectedSkills.includes(item);
      })
    );
    setLoading(false);
  };

  const updateProfile = (username) => {
    setLoading(true);
    db.insertOrUpdate(
      "users",
      { username: username },
      { ...user, bio: bio, skills: selectedSkills, contact: contact }
    );
    db.commit();
    fetchUserData(username);
  };

  const onSkillSetHandler = (skillSet, type) => {
    if (type === "remove") {
      setRemainingSkills(
        remainingSkills.filter((item) => {
          return skillSet !== item;
        })
      );
      setSelectedSkills([...selectedSkills, skillSet]);
    }
    if (type === "add") {
      setSelectedSkills(
        selectedSkills.filter((item) => {
          return skillSet !== item;
        })
      );
      setRemainingSkills([...remainingSkills, skillSet]);
    }
  };

  if (!loading) {
    return (
      <Box borderWidth="1px" rounded="lg" p={6} overflow="hidden">
        <Heading>Profile</Heading>
        <FormControl mt={6}>
          <FormLabel>Username</FormLabel>
          <Input isReadOnly value={username} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Bio</FormLabel>
          <Input value={bio} onChange={(e) => setBio(e.target.value)} />
        </FormControl>
        <FormControl mt={4}>
          <FormLabel>Contact</FormLabel>
          <Input value={contact} onChange={(e) => setContact(e.target.value)} />
        </FormControl>
        <FormControl mt={6}>
          <FormLabel>Skills</FormLabel>
          <Flex
            direction="row"
            wrap="wrap"
            borderWidth={1}
            borderRadius={6}
            borderColor="gray.200"
            p={1}
            mb={2}
            minH={10}
          >
            {selectedSkills.map((item) => {
              return (
                <Tag
                  size="md"
                  variant="solid"
                  colorScheme="teal"
                  key={item}
                  m={1}
                  onClick={(e) => onSkillSetHandler(item, "add")}
                >
                  <TagLabel>{item}</TagLabel>
                  <TagCloseButton />
                </Tag>
              );
            })}
          </Flex>

          <Flex direction="row" wrap="wrap" mx={-1}>
            {remainingSkills.map((item) => {
              return (
                <Tag
                  size="md"
                  key={item}
                  m={1}
                  onClick={(e) => onSkillSetHandler(item, "remove")}
                >
                  <TagLeftIcon boxSize="12px" as={AddIcon} />
                  <TagLabel>{item}</TagLabel>
                </Tag>
              );
            })}
          </Flex>
        </FormControl>
        <FormControl mt={8}>
          <Button mr={2} onClick={(e) => fetchUserData(username)}>
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            onClick={(e) => updateProfile(username)}
            isLoading={loading}
          >
            Save
          </Button>
        </FormControl>
      </Box>
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

export default Profile;
