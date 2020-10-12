import React from "react";
import { Box, FormControl, Heading, Icon } from "@chakra-ui/core";

export default ({ description, skills, update }) => {
  return (
    <Box borderWidth="1px" rounded="md" p={5}>
      <Heading as="h2" size="md" mb={4}>
        {description}:
      </Heading>

      <FormControl>
        {skills.map(({ name, rank }, index) => (
          <Box d="flex" mb={1} key={name} justifyContent="space-between">
            {name}
            <Box key={index}>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <Icon
                    size={5}
                    name="star"
                    key={i}
                    onClick={() => update(name, i + 1)}
                    color={i < rank ? "teal.500" : "gray.300"}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </FormControl>
    </Box>
  );
};
