import React, { useEffect, useState } from "react"
import { Text } from "@chakra-ui/core"
import db from "./data/database"
import Card from "./ui/Card"
import Post from "./data/post"
import { VStack } from "@chakra-ui/react"
import { castArray } from "lodash"

const Posts: React.FC<{ username: string | string[] }> = ({ username }) => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const posts = db.queryAll("posts", {
      query: (post: Post) => castArray(username).includes(post.user),
    }) as Post[]
    setPosts(posts)
  }, [username])

  if (!posts) return <Text>No posts yet</Text>
  return (
    <VStack spacing="5px" align="stretch" maxW="lg">
      {posts.map((post, index) => (
        <Card title={post.title} author={post.user} key={index}></Card>
      ))}
    </VStack>
  )
}

export default Posts
