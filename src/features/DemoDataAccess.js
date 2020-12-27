import React from "react";
import {
  Text,
  FormControl,
  Input,
  FormLabel,
  Button,
  Box,
} from "@chakra-ui/react";
import db from "../data/database";
import Card from "../ui/Card";

export default class DataAccessDemo extends React.Component {
  state = { posts: null };
  inputRef = React.createRef();

  createPost = () => {
    const title = this.inputRef.current.value;
    if (!title) return;
    const post = {
      title: title,
      user: this.props.username,
    };
    db.insert("posts", post);
    db.commit();
    this.clearInput();
    this.fetchUserPosts();
  };

  clearInput = () => {
    this.inputRef.current.value = null;
  };

  componentDidMount() {
    this.fetchUserPosts();
  }

  fetchUserPosts() {
    const posts = db.queryAll("posts", {
      query: { user: this.props.username },
    });
    this.setState({ posts });
  }

  renderPosts() {
    const { posts } = this.state;
    if (!posts) return <Text>No posts yet</Text>;
    return posts.map((post, index) => (
      <Card title={post.title} author={post.user} key={index}></Card>
    ));
  }

  render() {
    return (
      <>
        <Box maxW="sm" borderWidth="1px" rounded="lg" p={6} overflow="hidden">
          <FormControl>
            <FormLabel>Create a new post</FormLabel>
            <Input ref={this.inputRef} />
          </FormControl>
          <FormControl>
            <Button mt={4} onClick={this.createPost}>
              Post
            </Button>
          </FormControl>
        </Box>
        {this.renderPosts()}
      </>
    );
  }
}
