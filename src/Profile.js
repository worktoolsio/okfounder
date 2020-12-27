import React, { useState } from "react";
import Card from "./ui/Card";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Flex,
  Tag,
  TagIcon,
  TagRightIcon,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
// import DataAccessDemo from './features/DemoDataAccess'

const Profile = ({ username }) => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [remainingSkills, setRemainingSkills] = useState([
    "design",
    "marketing",
    "operations",
    "management",
    "programming",
    "sales",
  ]);

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

  return (
    <Box maxW="xl" borderWidth="1px" rounded="lg" p={6} overflow="hidden">
      <FormLabel>Bio</FormLabel>
      <Input />
      <Input />
      <FormControl>
        <Flex
          direction="row"
          wrap="wrap"
          mx={-1}
          borderWidth={1}
          borderRadius={12}
          borderColor="gray.200"
          p={1}
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
                <TagLabel>{item}</TagLabel>
                <TagRightIcon boxSize="12px" as={AddIcon} />
              </Tag>
            );
          })}
        </Flex>
      </FormControl>
      <FormControl mt={4}>
        <Button mr={2}>Cancel</Button>
        <Button colorScheme="teal">Save</Button>
      </FormControl>
    </Box>
  );
};

export default Profile;
