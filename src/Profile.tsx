import React, { useCallback, useEffect, useState } from "react"
import { Text, Box, Tag, TagLabel, Button } from "@chakra-ui/core"
import { trim, first, isEmpty } from "lodash"
import db from "./data/database"
import { Container, Skeleton, VStack, Wrap, WrapItem } from "@chakra-ui/react"
import IUser from "./data/user"
import { useParams } from "react-router-dom"
import Posts from "./Posts"

const Profile: React.FC<{ self: string }> = ({ self }) => {
  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<IUser>()
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  useEffect(() => {
    const user = first(
      db.queryAll("users", { query: { username } }) as Array<IUser>
    )
    setUser(user)
  }, [username])

  useEffect(() => {
    const follower = db.queryAll("followers", {
      query: {
        user: username,
        follower: self,
      }
    })
    setIsFollowing(!isEmpty(follower))
  }, [username, self])

  const toggleFollowing = useCallback(() => {
    if (!isFollowing) {
      db.insert("followers", { user: username, follower: self })
    } else {
      db.deleteRows("followers", { user: username, follower: self })
    }
    db.commit()
    setIsFollowing(!isFollowing)
  }, [isFollowing, username, self])

  if (!user) {
    return (
      <VStack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </VStack>
    )
  }
  return (
    <Container maxW="lg">
      <Text fontSize="5xl" pb={4}>
        {user?.fullName}
      </Text>
      <Text my={5} fontSize="2xl">
        {user?.pitch}
      </Text>
      <VStack spacing="5px" align="stretch">
        <Box>
          <Wrap direction={["column", "row"]} spacing="5px" pb={2}>
            {user.tags
              .split(",")
              .map(trim)
              .map((tag) => (
                <WrapItem key={tag}>
                  <Tag size="md" variant="solid">
                    <TagLabel>{tag}</TagLabel>
                  </Tag>
                </WrapItem>
              ))}
          </Wrap>
        </Box>
      </VStack>
      <Button onClick={() => toggleFollowing()} my={10}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Posts username={user.username} />
    </Container>
  )
}

export default Profile
