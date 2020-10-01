import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Box } from '@chakra-ui/core'
import db from "../data/database"

const Container = styled.div`
  & > p {
    margin-bottom: 16px;
  }

  .strength {
    font-weight: 600;
    color: #1976D2;
  }

  .founders {
    margin: 32px 16px;
  }
`

const Founder = styled.div`
  margin-bottom: 16px;
  background: #e0e5eb;
  padding: 4px 12px;

  .contact-details {
    font-style: italic;
    margin-top: 20px;
  }
`

const NoMatches = styled.div`
  background: #e0e5eb;
  padding: 16px 12px;
  margin-top: 64px;

  & > p {
    margin-bottom: 32px;
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`

const sortByScoreDescending = (a, b) => b.score - a.score

const Matches = ({ user }) => {
  const strength1 = user.strengths[0]
  const strength2 = user.strengths[1]

  const lookingFor1 = user.lookingFor[0]
  const lookingFor2 = user.lookingFor[1]

  const [founders, setFounders] = useState()

  useEffect(() => {
    const rankedFounders = db.queryAll("users")
      // get all users except self
      .filter(thisUser => thisUser.username !== user.username)
      // add a ranking score according to 'strengths' and 'lookingFor'
      .map(thisUser => {
        let score = 0

        user.lookingFor.forEach((lookingForStrength, i) => {
          const numberOfStrengths = user.lookingFor.length

          // lists in reverse rank order, lower index = more important, so invert for score
          const lookingForStrengthScore = numberOfStrengths - i
          const strengthScore = numberOfStrengths - thisUser.strengths.findIndex(strength => strength === lookingForStrength)

          // get score by multiplying
          score += lookingForStrengthScore * strengthScore
        })

        return { ...thisUser, score }
      })

    rankedFounders.sort(sortByScoreDescending)

    // limit to 5 matches
    setFounders(rankedFounders.slice(0, 5))
  }, [user])

  return (
    <Box p={4} mb={4} mt={4} borderWidth="1px" rounded="lg" overflow="hidden">
      <Container>
        <p>OK, so you're primarily focused on <span className='strength'>{strength1}</span> and can also do <span className='strength'>{strength2}</span></p>
        <p>Seems like you're looking for someone who is good at <span className='strength'>{lookingFor1}</span> and <span className='strength'>{lookingFor2}</span></p>

        {founders
          ? founders.length === 0 ? (
            <NoMatches>
              <p>Oh no! We haven't been able to find any good matches for now, sorry.</p>

              <p>Check back soon, though. OKFounder is a new community and growing all the time.</p>

              <p>We're sure to find you a great cofounder soon!</p>
            </NoMatches>
          ) : (
            <>
              <p>Based on what you've told us, we've found some potential cofounder matches for you!</p>

              <div className="founders">
              {founders && founders.map((founder, i) => {
                return (
                  <Founder key={founder.name}>
                    <div>
                      <Box color="gray.900" fontSize="lg">
                        {founder.name}
                      </Box>
                      <Box color="gray.600" fontSize="md">
                        {founder.bio}
                      </Box>
                      <Box className="contact-details" color="gray.600" fontSize="sm">
                        Contact info: {founder.contactInfo}
                      </Box>
                    </div>
                  </Founder>
                  )
                })
              }
              </div>
            </>
          )
          : null}
      </Container>
    </Box>
  )
}

export default Matches
