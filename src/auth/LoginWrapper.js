import React from "react"
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText
} from "@chakra-ui/core"
import Header from "../ui/Header"

export default class LoginWrapper extends React.Component {
  state = { username: localStorage.getItem("username") || null }

  login = username => {
    localStorage.setItem("username", username)
    this.setState({ username: username })
  }

  logout = () => {
    localStorage.removeItem("username")
    this.setState({ username: undefined })
  }

  render() {
    let { username } = this.state
    let inputRef = React.createRef()
    // If we are logged in, then pass the username to the children.
    if (username) {
      return this.props.children({ username, logout: this.logout })
    }

    //  Otherwise, show a login form.
    return (
      <Flex direction="column" align="center">
        <Box width={"100%"} maxWidth={"1000px"} pl={2} pr={2}>
          <Header />

          <Box
            maxW="700px"
            borderWidth="1px"
            rounded="lg"
            p={6}
            m={"auto"}
            overflow="hidden"
          >
            <FormControl>
              <FormLabel >Email</FormLabel>
              <Input  ref={inputRef} />
              <FormHelperText>
                Your email
              </FormHelperText>
            </FormControl>
            <FormControl>
              <Button mt={4} onClick={() => this.login(inputRef.current.value)}>
                Login
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Flex>
    )
  }
}
