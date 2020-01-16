import React from "react"
import {
  Text,
  FormControl,
  FormLabel,
  Button,
  Box,
  Stack,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Flex,
} from "@chakra-ui/core"
import db from "../data/database"
import Card from "../ui/Card"

export default class CoFounderSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: {
        lookingFor: [],
        hasIdea: false,
        sectors: [],
        locations: []
      },
      profiles: [],
      user: {
        likes: []
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeArr = this.handleChangeArr.bind(this)
  }

  handleChange = (propertyName) => (event) => {
    const { search } = this.state
    const updatedProfile = {
      ...search,
      [propertyName]: event.target.value
    }
    this.setState({ search: updatedProfile })
  }

  handleChangeArr = (propertyName) => (event) => {
    const { search } = this.state
    const updatedProfile = {
      ...search,
      [propertyName]: event
    }
    this.setState({ search: updatedProfile })
  }

  renderProfiles = () => {
    const posts = this.state.profiles
    if (posts.length < 1) return <Text>Couldn't find any founders that match.</Text>
    return posts.map((post, index) => (
      <Card
        profile={post.username}
        title={post.title}
        author={post.name}
        role={post.role}
        bio={post.bio}
        match={false}
        key={index}
      ></Card>
    ))
  }

  search = () => {
    const posts = db.queryAll("posts", {
      query: (row) => {
        if (this.state.search.lookingFor.includes(row.role)
          && row.username !== localStorage.getItem("username")
          && this.state.search.hasIdea === row.hasIdea
          && this.state.search.sectors.some(elem => row.sectors.indexOf(elem) > -1)
          && this.state.search.locations.some(elem => row.locations.indexOf(elem) > -1)) {
            return true
        }
        return false
      }
    })
    this.setState({ profiles: posts })
  }

  componentDidMount = () => {
    const posts = db.queryAll("posts", {
      query: (row) => row.username !== localStorage.getItem("username")
    })
    const user = db.queryAll("posts", {
      query: (row) => row.username === localStorage.getItem("username")
    })
    this.setState({ profiles: posts })
    this.setState({ user: user[0] })
  }

  render = () => {
    return (
        <>
      <Flex direction="row" align="center">
        <Box
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          p={6}
          overflow="hidden"
          width={"100%"}
          maxWidth={"1000px"}
        >
          <FormControl>
            <Stack spacing={3}>

              <FormLabel>Looking For:</FormLabel>
              <CheckboxGroup
                isInline
                value={this.state.search.lookingFor}
                onChange={this.handleChangeArr('lookingFor')}
              >
                <Checkbox value="CEO">CEO</Checkbox>
                <Checkbox value="CTO">CTO</Checkbox>
                <Checkbox value="COO">COO</Checkbox>
                <Checkbox value="CPO">CPO</Checkbox>
              </CheckboxGroup>

              <FormLabel>Has idea?</FormLabel>
              <RadioGroup
                isInline
                value={this.state.search.hasIdea}
                onChange={this.handleChange('hasIdea')}
              >
                <Radio value="true">Yes</Radio>
                <Radio value="false">No</Radio>
              </RadioGroup>

              <FormLabel>Sectors they're interested in working in:</FormLabel>
              <CheckboxGroup
                isInline
                value={this.state.search.sectors}
                onChange={this.handleChangeArr('sectors')}
              >
                <Checkbox value="AI">AI</Checkbox>
                <Checkbox value="B2B">B2B</Checkbox>
                <Checkbox value="Biotech">Biotech</Checkbox>
                <Checkbox value="Consumer">Consumer</Checkbox>
                <Checkbox value="Dev Tools">Dev Tools</Checkbox>
                <Checkbox value="Fintech">Fintech</Checkbox>
                <Checkbox value="Hardware">Hardware</Checkbox>
              </CheckboxGroup>

              <FormLabel>Willing to be located in:</FormLabel>
              <CheckboxGroup
                isInline
                value={this.state.search.locations}
                onChange={this.handleChangeArr('locations')}
              >
                <Checkbox value="London">London</Checkbox>
                <Checkbox value="Paris">Paris</Checkbox>
                <Checkbox value="Berlin">Berlin</Checkbox>
                <Checkbox value="Madrid">Madrid</Checkbox>
                <Checkbox value="Stockholm">Stockholm</Checkbox>
                <Checkbox value="Amsterdam">Amsterdam</Checkbox>
                <Checkbox value="Remote">Remote</Checkbox>
              </CheckboxGroup>
            </Stack>
          </FormControl>
          <FormControl>
            <Button  mt={4} onClick={this.search}>
              Search    
            </Button>
          </FormControl>
        </Box>
      </Flex>
      {this.renderProfiles()}
      </>
    )
  }
}
