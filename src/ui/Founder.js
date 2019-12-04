import React from 'react'
import { Box, Stack, Tag, TagLabel, TagIcon } from "@chakra-ui/core";


const Founder = ({ user, title, skills = [] }) => {
    return (
      <Box w="19rem" mr={3} mb={4} mt={4} borderWidth="1px" rounded="lg" overflow="hidden">
        <Box p="6">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {user}
          </Box>

          <Box as="span" color="gray.600" fontSize="sm">
            {title}
          </Box>

          <Stack spacing={4} isInline pt={3}>
            {skills.map((skill, index) => (
              <Tag key={index} variantColor="cyan" size={"sm"}>
                <TagLabel>{skill}</TagLabel>
                <TagIcon icon="check" size="12px" />
              </Tag>
            ))}
          </Stack>
        </Box>
      </Box>
    )}

    export default Founder
