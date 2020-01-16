import React, { useState, useEffect } from 'react'
import db from '../data/database'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'

const HomePage = ({ username }) => {
  const [posts, setPosts] = useState([])

  const fetchPosts = () => setPosts(db.queryAll('posts'))

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <CreatePost fetchPosts={fetchPosts} username={username} />
      {posts.map((post, index) => (
        <Post title={post.title} author={post.user} key={index} />
      ))}
    </>
  )
}

export default HomePage
