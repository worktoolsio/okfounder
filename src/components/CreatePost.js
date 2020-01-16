/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/core'
import db from '../data/database'

const CreatePost = ({ fetchPosts, username }) => {
  const [title, setTitle] = useState('')

  const handleCreatePost = () => {
    if (!title) return
    const post = {
      title,
      user: username
    }
    db.insert('posts', post)
    db.commit()
    setTitle('')
    fetchPosts()
  }

  return (
    <Box width="600px" mb={6} borderWidth="1px" rounded="lg" p={6} overflow="hidden">
      <FormControl>
        <FormLabel>Create a new post</FormLabel>
        <Input value={title} onChange={e => setTitle(e.target.value)} />
      </FormControl>
      <FormControl>
        <Button mt={4} onClick={handleCreatePost}>
          Post
        </Button>
      </FormControl>
    </Box>
  )
}

export default CreatePost
