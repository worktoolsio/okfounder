/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/core'
import db from '../data/database'

const CreateReply = ({ fetchPost, post }) => {
  const username = localStorage.getItem('username')
  const [title, setTitle] = useState('')

  const handleNewPost = () => {
    if (!title) return
    const comment = {
      title,
      user: username
    }

    db.update('posts', { title: post.title }, () => ({
      ...post,
      comments: [...post.comments, comment]
    }))

    db.commit()
    setTitle('')
    fetchPost()
  }

  return (
    <Box width="auto" mt={5} borderWidth="1px" rounded="lg" p={4} overflow="hidden">
      <FormControl>
        <FormLabel>Add a reply</FormLabel>
        <Input value={title} onChange={e => setTitle(e.target.value)} />
      </FormControl>
      <FormControl>
        <Button mt={4} onClick={handleNewPost}>
          Reply
        </Button>
      </FormControl>
    </Box>
  )
}

export default CreateReply
