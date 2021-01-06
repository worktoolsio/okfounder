import React, { useEffect, useState } from 'react'
import db from './data/database'
import Posts from './Posts'

interface IUserFollower {
  user: string
  follower: string
}

const Wall: React.FC<{ username: string }> = ({ username }) => {
  const [authors, setAuthors] = useState<string[]>([])
  useEffect(() => {
    setAuthors(
      (db.queryAll('followers', { query: { follower: username } }) as Array<IUserFollower>).map(user => user.user)
    )
  }, [username])

  return <Posts username={[...authors, username]} />
}

export default Wall
