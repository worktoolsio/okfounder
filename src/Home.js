import React, { useEffect, useState } from 'react'
import SetupNewUser from './features/SetupNewUser'
import AddLookingFor from './features/AddLookingFor'
import db from "./data/database"
import Matches from './features/Matches'

const Home = ({username}) => {
  const [ user, setUser ] = useState()

  // load user from database if set up
  useEffect(() => {
    const userInDatabase = db.queryAll("users", {
      query: { username }
    })[0]

    if (userInDatabase) {
      setUser(userInDatabase)
    } else {
      setUser(null)
    }
  }, [username])

  const doInitialSetup = (strengths, name, bio, contactInfo) => {
    const newUser = { username, strengths, contactInfo, name, bio }
    db.insert("users", newUser)
    db.commit()
    setUser(newUser)
  }

  const updateProfile = (lookingFor) => {
    const updatedUser = { ...user, lookingFor }

    db.update("users", { username }, () => updatedUser)
    db.commit()

    setUser(updatedUser)
  }

  if (user === null) {
    return <SetupNewUser doInitialSetup={doInitialSetup} />
  } else if (user) {
    return user.lookingFor
      ? <Matches user={user} />
      : <AddLookingFor user={user} updateProfile={updateProfile}/>
  } else {
    return null // loading
  }
}

export default Home
