import React from 'react'
import { Flex } from "@chakra-ui/core"
import Logo from "./Logo"
import {Link} from 'react-router-dom'

const Header = ({children}) => {

    return <Flex
         width="100%"
         align="center"
          justify="space-between"
          direction="row"
          p={4}
          m={4}
    >
          <Link to="/"><Logo /></Link>
          <Flex direction="row">
            {children}
          </Flex>
        </Flex>



}

export default Header