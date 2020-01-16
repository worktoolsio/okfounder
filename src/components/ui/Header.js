import React from 'react'
import { Flex } from '@chakra-ui/core'
import Logo from './Logo'

const Header = ({ children }) => (
  <Flex width="100%" align="center" justify="space-between" direction="row" p={4} m={4}>
    <Logo />
    <Flex direction="row">{children}</Flex>
  </Flex>
)

export default Header
