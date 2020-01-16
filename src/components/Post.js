import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Flex } from '@chakra-ui/core'

const Post = ({ title, author }) => (
  <Box width="600px" mb={3} p={6} borderWidth="1px" rounded="lg" overflow="hidden">
    <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
      {title}
    </Box>

    <Flex align="flex-end" justify="space-between">
      <Box as="span" color="gray.600" fontSize="sm">
        By {author}
      </Box>

      <Button>
        <Link to={`/posts/${title}`}>View Replies</Link>
      </Button>
    </Flex>
  </Box>
)

export default Post
