import React from 'react'
import { Box, Button, Stack } from "@chakra-ui/core"
import db from "../data/database"

const setUserLike = likedProfile => {
  const user = db.queryAll("posts", {
    query: { username: localStorage.getItem("username") }
  })
  if (user.length > 0 && !user[0].likes.includes(likedProfile)) {
    db.update("posts", { username: localStorage.getItem("username") },
      row => {
        row.likes.push(likedProfile)
        return row
      }
    )
    db.commit()
  }
}

const renderButton = (match, profile) => {
  if (!match) {
    return  (
      <Button
        onClick={() => setUserLike(profile)}
      >
        Like This Profile
      </Button>
    )
  }
  return
}

const Card = ({profile, title, author, role, bio, match}) => {
 
  let rating = 3
  let count = 42
  return (
    <Box maxW="sm" mb={4} mt={4} borderWidth="1px" rounded="lg" overflow="hidden">
     
      <Box p="6">
        <Stack spacing={1}>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {author}
          </Box>
  
          <Box>
            {title}
          </Box>
          
          <Box>
            {role}
          </Box>

          <Box>
            {bio}
          </Box>

          {renderButton(match, profile)}

        </Stack>
      </Box>
    </Box>
  )
}

export default Card