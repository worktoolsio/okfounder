import React from 'react'
import { Flex, Box } from "@chakra-ui/core"

import db from "./data/database"

import Search from './ui/Search'
import Founders from './ui/Founders'

const Home = ({ username }) => {
  const [founders, setFounders] = React.useState([])
  const [keyword, setKeyword] = React.useState('')

  const fetchFounders = skills => {
    const filter = (row) => {
      return !!row.skills.filter(skill => skills.includes(skill)).length
    }

    const results = db.queryAll("founders", {
      query: skills.length ? filter : undefined
    })

    setFounders(results)
  }

  React.useEffect(() => {
    fetchFounders(keyword)
  }, [keyword])

  const handleSearch = criteria => setKeyword(criteria.skills.split(','))

  return <Flex width="100%" direction="column" justifyContent="space-between">
    <Search onSearch={handleSearch} />
    <Box width="100%">
      <Founders list={founders} />
    </Box>
  </Flex>
}

export default Home
