import React from "react"
import {
  Text,
  Stack,
  Heading
} from "@chakra-ui/core"
import db from "../data/database"
import Card from "../ui/Card"

export default class Matches extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profiles: []
    }
  }

  renderProfiles = () => {
    const posts = this.state.profiles
    if (posts.length < 1) return <Text>Couldn't find any founders that matched you.</Text>
    return posts.map((post, index) => (
      <Card
        profile={post.username}
        title={post.role}
        author={post.name}
        role={post.username}
        bio=""
        match={true}
        key={index}
      ></Card>
    ))
  }

  componentDidMount = () => {
    const user = db.queryAll("posts", {
      query: { username: localStorage.getItem("username") }
    })
    if (user.length > 0) {
      const posts = db.queryAll("posts", {
        query: (row) => row.username !== localStorage.getItem("username")
        && row.likes.includes(localStorage.getItem("username"))
        && user[0].likes.includes(row.username)
      })
      this.setState({ profiles: posts })
    }
  }

  render = () => <>
    <Stack spacing={3}>
      <Heading>Your Matches</Heading>
      <Text>Here's their email address. Get connecting!</Text>
      {this.renderProfiles()}
    </Stack>
    </>
}