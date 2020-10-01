import React from "react";
import Avatar from "react-avatar";
import { Text, Flex, Button, Input, FormLabel } from "@chakra-ui/core";
import db from "../data/database";

export default function Profile({ profile }) {
  const [isEditingProfile, setEditingProfile] = React.useState(false);

  if (!profile) return null;

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
      <Button
        backgroundColor={isEditingProfile ? "#e53e3e" : "#63b3ed"}
        _hover={{ backgroundColor: isEditingProfile ? "#9b2c2c" : "#3182ce" }}
        position="absolute"
        right="20px"
        color="#fff"
        onClick={() => setEditingProfile(!isEditingProfile)}
      >
        {isEditingProfile ? "Cancel" : "Edit"}
      </Button>
      <Avatar
        name={profile.name}
        email={profile.email}
        round
        style={{ alignSelf: "center", marginBottom: "20px" }}
      />
      {isEditingProfile ? (
        <EditProfile profile={profile} setEditingProfile={setEditingProfile} />
      ) : (
        <ViewProfile profile={profile} />
      )}
    </Flex>
  );
}

function useEditProfile({ profile, setEditingProfile }) {
  const initialFormState = { name: "", email: "", company: "", jobTitle: "" };
  const [formState, setFormState] = React.useState(initialFormState);

  function onSubmitForm(e) {
    e.preventDefault();
    db.update("users", { ID: profile.ID }, (row) => {
      row.name = formState.name || profile.name;
      row.email = formState.email || profile.email;
      row.company = formState.company || profile.company;
      row.jobTitle = formState.jobTitle || profile.jobTitle;

      return row;
    });
    db.commit();
    setEditingProfile(false);
    // todo - update profile state so we can see the changes without refreshing
  }

  function onSetFormState(newState = {}) {
    setFormState((state) => ({ ...state, ...newState }));
  }

  return { formState, onSetFormState, onSubmitForm };
}

// todo - move component to another file
function EditProfile({ profile, setEditingProfile }) {
  const { formState, onSetFormState, onSubmitForm } = useEditProfile({
    profile,
    setEditingProfile,
  });

  return (
    <form onSubmit={onSubmitForm}>
      <FormLabel htmlFor="name" mt="10px">
        Name
      </FormLabel>
      <Input
        value={formState.name}
        placeholder={profile.name}
        onChange={(e) => onSetFormState({ name: e.target.value })}
        id="name"
      />
      <FormLabel htmlFor="email" mt="10px">
        Email
      </FormLabel>
      <Input
        value={formState.email}
        type="email"
        placeholder={profile.email}
        onChange={(e) => onSetFormState({ email: e.target.value })}
        id="email"
      />
      <FormLabel htmlFor="company" mt="10px">
        Company
      </FormLabel>
      <Input
        value={formState.company}
        placeholder={profile.company}
        onChange={(e) => onSetFormState({ company: e.target.value })}
        id="company"
      />
      <FormLabel htmlFor="jobTitle" mt="10px">
        Job title
      </FormLabel>
      <Input
        value={formState.jobTitle}
        placeholder={profile.jobTitle}
        onChange={(e) => onSetFormState({ jobTitle: e.target.value })}
        id="jobTitle"
      />
      <Button
        type="submit"
        backgroundColor="#63b3ed"
        _hover={{ backgroundColor: "#3182ce" }}
        color="#fff"
        mt="10px"
      >
        Submit
      </Button>
    </form>
  );
}

function ViewProfile({ profile }) {
  return Object.keys(profile).map((key) => (
    <Flex key={key}>
      <Text width="40%" fontWeight="bold">
        {key}
      </Text>
      <Text>{profile[key]}</Text>
    </Flex>
  ));
}
