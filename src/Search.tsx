import { Button, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/core'
import { Container, Wrap, WrapItem } from '@chakra-ui/react'
import { get, includes, isEmpty, some } from 'lodash'
import React, { useEffect, useState } from 'react'
import db from './data/database'
import UserCard from './ui/UserCard'
import IUser from './data/user'

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [results, setResults] = useState<Array<IUser>>([])
  useEffect(() => {
    if (isEmpty(query)) {
      setResults([])
      return
    }
    const results = db.queryAll('users', {
      query: (user: IUser) => {
        return some(['pitch', 'tags', 'fullName'], (f) => includes(get(user, f), query))
      }
    })
    setResults(results)
  }, [query])
  return <Container maxW="xl" m={5}>
    <InputGroup size="md">
      <Input
        pr="4.5rem"
        type="search"
        onChange={(e: React.FormEvent<HTMLInputElement>) => setSearch(e.currentTarget.value)}
        placeholder="Find a cool project to join as a cofounder"
      />
      <InputRightElement width="5rem">
        <Button h="1.75rem" size="sm" onClick={() => setQuery(search)}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
    {!isEmpty(query) && isEmpty(results) && <Text fontSize="2xl">
      Looks like we didn't find anyone
    </Text>}
    <Wrap>
      {results.map(user => <WrapItem key={user.username}>
        <UserCard {...user} />
      </WrapItem>)}
    </Wrap>
  </Container>
}

export default Search
