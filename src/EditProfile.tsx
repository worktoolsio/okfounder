import React, { useCallback, useEffect, useReducer } from "react"
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  FormErrorMessage,
  Button,
  Textarea,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
  useToast,
} from "@chakra-ui/core"
import { uniq, castArray, without, split, trim, isEmpty } from "lodash"
import { useForm } from "react-hook-form"
import db from "./data/database"
import { Container, Wrap, WrapItem } from "@chakra-ui/react"
import IUser from "./data/user"

interface ProfileProps {
  username: string
}

type ITags = Array<string>
type ITagAction = "add" | "remove" | "set"

const EditProfile: React.FC<ProfileProps> = ({ username }) => {
  const { handleSubmit, errors, register, reset } = useForm({})
  const [tags, modifyTags] = useReducer(
    (state: ITags, action: { type: ITagAction; tag: string | string[] }) => {
      switch (action.type) {
        case "add":
          return uniq([...state, ...castArray(action.tag)])
        case "remove":
          return without(state, ...castArray(action.tag))
        case "set":
          return castArray(action.tag)
        default:
          return state
      }
    },
    [] as ITags
  )
  useEffect(() => {
    const users = db.queryAll("users", { query: { username } }) as Array<IUser>
    if (!users.length) {
      db.insert("users", { username })
      db.commit()
      return
    }
    const user = users[0]
    modifyTags({
      type: "set",
      tag: split(user.tags, ",")
        .map(trim)
        .filter((tag) => !isEmpty(tag)),
    })
    reset(user)
  }, [username, reset])

  const toast = useToast()

  const onSubmit = useCallback(
    (values: any) => {
      db.update("users", { username }, (row: any) => ({
        ...row,
        ...values,
        tags: tags.join(","),
      }))
      db.commit()
      toast({
        description: "Account updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    },
    [toast, username, tags]
  )

  return (
    <Container maxW="lg">
      <Text fontSize="3xl" pb={4}>
        Edit Profile
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email" isInvalid={errors.email} pb={4}>
          <FormLabel>Email address</FormLabel>
          <Input name="email" type="email" ref={register({ required: true })} />
          <FormErrorMessage>
            {errors.email && "Must be a valid email"}
          </FormErrorMessage>
        </FormControl>

        <FormControl id="fullName" isInvalid={errors.fullName} pb={4}>
          <FormLabel>Full name</FormLabel>
          <Input
            name="fullName"
            type="text"
            ref={register({ required: true })}
          />
          <FormErrorMessage>
            {errors.fullName && "Cannot be empty"}
          </FormErrorMessage>
        </FormControl>

        <FormControl id="fullName" isInvalid={errors.fullName} pb={4}>
          <FormLabel>Pitch</FormLabel>
          <Textarea
            name="pitch"
            placeholder="A few words about your idea"
            size="sm"
            ref={register({ required: true })}
          />
          <FormErrorMessage>
            {errors.pitch && "Cannot be empty"}
          </FormErrorMessage>
        </FormControl>

        <Box pb={4}>
          <Text>Tags:</Text>
          <Wrap direction={["column", "row"]} spacing="5px" pb={2}>
            {tags.map((tag) => (
              <WrapItem key={tag}>
                <Tag size="md" variant="solid">
                  <TagLabel>{tag}</TagLabel>
                  <TagCloseButton
                    onClick={(e: React.FormEvent<HTMLButtonElement>) => {
                      modifyTags({ type: "remove", tag })
                    }}
                  />
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
          <Input
            placeholder="Add more tags for people to find you"
            type="text"
            onKeyPress={(e: any) => {
              if (e.key === "Enter") {
                modifyTags({ type: "add", tag: e.target.value })
                e.target.value = ""
                e.preventDefault()
              }
            }}
          />
        </Box>
        <Button type="submit">Save</Button>
      </form>
    </Container>
  )
}

export default EditProfile
