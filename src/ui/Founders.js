import React from 'react'
import { Flex } from "@chakra-ui/core"

import Founder from './Founder'

const Founders = ({ list }) => {
    if (!list.length) {
      return <p>We don't find any founders</p>
    }

    return (
      <Flex direction="row" flexWrap="wrap">
        {list.map(item => <Founder key={item.ID} {...item} />)}
      </Flex>
    )
}

export default Founders