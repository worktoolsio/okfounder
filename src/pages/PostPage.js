/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/core'
import { useParams } from 'react-router-dom'
import db from '../data/database'

const isEven = num => num % 2 === 0

const PostPage = () => {
  const { title } = useParams()
  const [post, setPost] = useState()

  const fetchPost = () => {
    setPost(db.queryAll('posts').find(p => p.title === title))
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <>
      <Box width="600px" mb={3} p={6} borderWidth="1px" rounded="lg" overflow="hidden">
        <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
          {title}
        </Box>
        <Box>
          {post && (
            <>
              <Box as="span" color="gray.600" fontSize="sm">
                By {post.user}
              </Box>
              {post.comments &&
                post.comments.map(({ title, user }, i) => (
                  <Box key={i} textAlign={isEven(i) ? 'right' : 'left'}>
                    <Box mt="1" fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
                      {title}
                    </Box>
                    <Box as="span" color="gray.600" fontSize="sm">
                      By {user}
                    </Box>
                  </Box>
                ))}
            </>
          )}
        </Box>
      </Box>
    </>
  )
}

export default PostPage
