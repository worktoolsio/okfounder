import React from 'react'
import DataAccessDemo from './features/DemoDataAccess'

const Home = ({ username }) => {
  return <DataAccessDemo username={username} />
}

export default Home
