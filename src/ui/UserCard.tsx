import React from "react"
import { Box, Tag, TagLabel } from "@chakra-ui/core"
import { Wrap, WrapItem } from "@chakra-ui/react"
import { trim } from "lodash"
import { useHistory } from "react-router-dom"

interface UserCardProps {
  username: string
  fullName: string
  pitch: string
  tags: string
}

const UserCard: React.FC<UserCardProps> = (props) => {
  const history = useHistory()
  return (
    <Box
      maxW="md"
      mb={4}
      mt={4}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      style={{ cursor: "pointer" }}
      onClick={() => history.push(`/profile/${props.username}`)}
    >
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {props.fullName}
        </Box>

        <Box>{props.pitch}</Box>

        <Wrap>
          {props.tags
            .split(",")
            .map(trim)
            .map((tag) => (
              <WrapItem key={tag}>
                <Tag size="md" variant="solid">
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
        </Wrap>
      </Box>
    </Box>
  )
}

export default UserCard
