import React from "react";
import { useHistory } from "react-router-dom";
import { Text, Input, Button } from "@chakra-ui/core";
import db from "../data/database";

function useForm(username) {
  const initialFormState = { name: "", email: "", company: "", jobTitle: "" };
  const [formState, setFormState] = React.useState(initialFormState);
  const history = useHistory();

  function onSetFormState(newState = {}) {
    setFormState((state) => ({ ...state, ...newState }));
  }

  function onSubmitForm(e) {
    e.preventDefault();
    // todo - field validation
    // todo - query db to ensure username is unique
    db.insert("users", { username, ...formState });
    db.commit();
    setFormState(initialFormState);
    history.push("/");
  }

  return { formState, onSetFormState, onSubmitForm };
}

export default function CreateProfile({ username }) {
  const { formState, onSetFormState, onSubmitForm } = useForm(username);

  return (
    <section>
      <Text fontSize="4xl" mb="20px">
        Create your Profile
      </Text>
      <form onSubmit={onSubmitForm} style={{ width: "50%" }}>
        <Input
          placeholder="Your name"
          value={formState.name}
          onChange={(e) => onSetFormState({ name: e.target.value })}
          mb="10px"
        />
        <Input
          placeholder="Your email address"
          value={formState.email}
          onChange={(e) => onSetFormState({ email: e.target.value })}
          mb="10px"
        />
        <Input
          placeholder="Your company name"
          value={formState.company}
          onChange={(e) => onSetFormState({ company: e.target.value })}
          mb="10px"
        />
        <Input
          placeholder="Your company title"
          value={formState.jobTitle}
          onChange={(e) => onSetFormState({ jobTitle: e.target.value })}
          mb="10px"
        />
        <Button type="submit">Create</Button>
      </form>
    </section>
  );
}
