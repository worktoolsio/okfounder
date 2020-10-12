import React, { useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/core";
import db from "../data/database";
import SkillBox from "../ui/SkillBox";

const skills = [
  "Marketing",
  "Leadership",
  "Fundraising",
  "Engineering",
  "Sales",
];
const generateSkillMap = () => skills.map((name) => ({ name, rank: 1 }));

const Settings = ({ username, onboarding = false }) => {
  const [user] = db.queryAll("founders", { query: { username }, limit: 1 });

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [location, setLocation] = useState(user?.location || "");
  const [contact, setContact] = useState(user?.contact || "");

  const [introduction, setIntroduction] = useState(user?.introduction || "");

  const [mySkills, setMySkills] = useState(user?.skills || generateSkillMap());
  const [cofounderSkills, setCofounderSkills] = useState(
    user?.cofounderSkills || generateSkillMap()
  );

  const updateMySkills = (name, rank) => {
    setMySkills(
      mySkills.map((skill) =>
        skill.name === name ? { ...skill, rank } : skill
      )
    );
  };
  const updateCofounderSkills = (name, rank) => {
    setCofounderSkills(
      cofounderSkills.map((skill) =>
        skill.name === name ? { ...skill, rank } : skill
      )
    );
  };

  const save = () => {
    db.insertOrUpdate(
      "founders",
      { username },
      {
        username,
        firstName,
        lastName,
        location,
        introduction,
        contact,
        skills: mySkills,
        cofounderSkills,
      }
    );
    db.commit();
    window.location = "/";
  };

  return (
    <>
      <Heading mt={10}>Profile Settings:</Heading>
      {onboarding && (
        <Alert fontSize={20} status="warning" mb={2}>
          Welcome! Please make sure to fill out the following form before
          proceeding to match with potential cofounders.
        </Alert>
      )}
      <Stack isInline spacing={10} mb={5}>
        <FormControl flex={1}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </FormControl>
        <FormControl flex={1}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </FormControl>
      </Stack>
      <FormControl mb={5}>
        <FormLabel htmlFor="location">Location</FormLabel>
        <Input
          id="location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </FormControl>
      <FormControl mb={5}>
        <FormLabel htmlFor="introduction">Introduction</FormLabel>
        <Textarea
          id="introduction"
          value={introduction}
          onChange={(event) => setIntroduction(event.target.value)}
        />
      </FormControl>
      <FormControl mb={5}>
        <FormLabel htmlFor="contact">Contact information</FormLabel>
        <Textarea
          id="contact"
          placeholder="Provide contact information (email, twitter, phone number) - only available to matches."
          value={contact}
          onChange={(event) => setContact(event.target.value)}
        />
      </FormControl>
      <Heading mt={10}>Experience and expectations:</Heading>
      {onboarding && (
        <Alert fontSize={20} status="warning" mb={2}>
          Choose your expectations wisely!
        </Alert>
      )}
      <Stack isInline spacing={10}>
        <Box flex={1}>
          <SkillBox
            skills={mySkills}
            description="Your skills"
            update={updateMySkills}
          />
        </Box>
        <Box flex={1}>
          <SkillBox
            skills={cofounderSkills}
            description="Looking for co-founder with"
            update={updateCofounderSkills}
          />
        </Box>
      </Stack>
      <Button
        onClick={save}
        mt={10}
        size="lg"
        variantColor="teal"
        type="submit"
      >
        Save
      </Button>
    </>
  );
};

export default Settings;
