import React, { useRef, useState } from "react"
import {
  FormControl,
  Input,
  FormLabel,
  Button,
  Box
} from "@chakra-ui/core"
import styled from "@emotion/styled"

const Info = styled.div`
  margin-top: 32px;
  margin-bottom: 16px;
  padding: 16px;
  background: #A5D6A7;

  & > p {
    margin-bottom: 16px;
  }

  & > p:last-child {
    margin-bottom: 0;
  }
`

const Strength = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  max-width: 200px;

  .name {
    font-weight: bold;
    text-transform: capitalize;
    margin-right: 20px;
  }

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

const Welcome = styled.div`
  font-size: 24px;
`

const SetupNewUser = ({ doInitialSetup }) => {
  const [ranking, setRanking] = useState(['design', 'sales', 'engineering', 'product', 'marketing'])
  const nameInputRef = useRef()
  const bioInputRef = useRef()
  const contactInputRef = useRef()

  return (
    <Box p={4} mb={4} mt={4} borderWidth="1px" rounded="lg" overflow="hidden">
      <Welcome>Welcome to OKFounder!</Welcome>

      <Info>
        <p>Let's start by ranking your strengths, so we can match you with other founders.</p>

        <p>The more honest you are, the better matches you'll get. Strong teams have complimentary strengths!</p>
      </Info>

      {ranking.map((strength, i) => {
        return (
          <Strength key={strength}>
            <span className='name'>{strength}</span>

            <div>
              <span
                className='action'
                onClick={() => {
                  const updated = [...ranking]
                  const pivot = i - 1
                  if (updated[pivot]) {
                    const swap = updated[pivot]
                    updated[pivot] = strength
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
                    updated[pivot] = strength
                    updated[i] = swap
                  }

                  setRanking(updated)
                }}
              >
                down
            </span>
            </div>
          </Strength>
        )
      })
    }

    <Info>
      <p>Now give your display name, and write yourself a short bio.</p>
      <p>Other founders will see this information in their matches.</p>
    </Info>

    <FormControl marginBottom={4}>
      <FormLabel>Display name</FormLabel>
      <Input ref={nameInputRef} />
    </FormControl>
    <FormControl>
      <FormLabel>Bio</FormLabel>
      <Input ref={bioInputRef} />
    </FormControl>

    <Info>
      <p>Provide a way for your matches to contact you.</p>
      <p>e.g. Your email, WhatsApp number, Skype Handle, or all of these</p>
    </Info>

    <FormControl>
      <FormLabel>Contact info</FormLabel>
      <Input ref={contactInputRef} />
    </FormControl>

    <Button mt={4} onClick={() => doInitialSetup(ranking, nameInputRef.current.value, bioInputRef.current.value, contactInputRef.current.value)}>
      Done
    </Button>
    </Box>
  )
}

export default SetupNewUser