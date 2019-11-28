import React from 'react'
import { Box, Image, Flex, Badge, Text, Button, StarIcon, Icon } from "@chakra-ui/core";


const Card = ({title, author}) => {
 
    let rating = 3
    let count = 42
    return (
      <Box maxW="sm" mb={4} mt={4} borderWidth="1px" rounded="lg" overflow="hidden">
       
        <Box p="6">
          <Box d="flex" alignItems="baseline">
            <Badge rounded="full" px="2" variantColor="teal">
              New
            </Badge>
          </Box>
  
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>
  
          <Box>
            <Box as="span" color="gray.600" fontSize="sm">
              By{" "} 
            </Box>
            {author}
          </Box>
  
          <Box d="flex" mt="2" alignItems="center">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <Icon
                name="star"
                  key={i}
                  color={i < rating ? "teal.500" : "gray.300"}
                />
              ))}
            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {count} reviews
            </Box>
          </Box>
        </Box>
      </Box>
    )}

    export default Card