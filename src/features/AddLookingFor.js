import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Box, Button } from '@chakra-ui/core'

const Container = styled.div`
  & > p {
    margin-bottom: 16px;
  }

  .strength {
    font-weight: 600;
    color: #1976D2;
  }

  .example-founders {
    margin: 32px 16px;
  }
`

const exampleFounders = [{
  name: 'Laura Hackerly',
  strength: 'engineering',
  bio: `I start by asking "can I make this work?" Then I ask - "can I make it work faster?"`
}, {
  name: 'Juan Pensmith',
  strength: 'marketing',
  bio: "I just want to let everyone know how world-changing what I'm working on is"
}, {
  name: 'Elodie Le Shark',
  strength: 'sales',
  bio: "I like three things: making money, breaking quota, and warm leads"
}, {
  name: 'Jin Visionary',
  strength: 'product',
  bio: "Always be shipping, start with the user and work backwards"
}, {
  name: 'Sara Canvas',
  strength: 'design',
  bio: "Function follows form. It's gotta look nice to work well."
}]

const ExampleFounder = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  background: #e0e5eb;
  padding: 4px 12px;

  .action {
    margin-left: 10px;
    cursor: pointer;
  }

  @media (hover: hover) {
    .action {
      text-decoration: underline;
    }
  }
`

const AddLookingFor = ({ user, updateProfile }) => {
  const strength1 = user.strengths[0]
  const strength2 = user.strengths[1]
  const [ranking, setRanking] = useState(exampleFounders)

  return (
    <Box p={4} mb={4} mt={4} borderWidth="1px" rounded="lg" overflow="hidden">
      <Container>
        <p>OK, so you're primarily focused on <span className='strength'>{strength1}</span> and can also do <span className='strength'>{strength2}</span></p>
        <p>Let's throw a few potential cofounders at you and see what kind of person you're looking for!</p>
        <p>Rank these cofounders by what you think they'd bring to the table:</p>

        <div className="example-founders">
        {ranking.map((founder, i) => {
          return (
            <ExampleFounder key={founder.name}>
              <div>
                <Box color="gray.900" fontSize="lg">
                  {founder.name}
                </Box>
                <Box color="gray.600" fontSize="md">
                  {founder.bio}
                </Box>
              </div>

              <div>
                <span
                  className='action'
                  onClick={() => {
                    const updated = [...ranking]
                    const pivot = i - 1
                    if (updated[pivot]) {
                      const swap = updated[pivot]
                      updated[pivot] = founder
                      updated[i] = swap
                    }

                    setRanking(updated)
                  }}
                >
                  up
                </span>

                <span
                  className='action'
                  onClick={() => {
                    const updated = [...ranking]
                    const pivot = i + 1
                    if (updated[pivot]) {
                      const swap = updated[pivot]
                      updated[pivot] = founder
                      updated[i] = swap
                    }

                    setRanking(updated)
                  }}
                >
                  down
                </span>
              </div>
            </ExampleFounder>
            )
          })
        }
        </div>
      </Container>

      <Button mt={4} onClick={() => updateProfile(ranking.map(ranking => ranking.strength))}>
        Done
      </Button>
    </Box>
  )
}

export default AddLookingFor
