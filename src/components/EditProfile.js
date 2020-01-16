import React from "react"
import {
  Text,
  Textarea,
  FormControl,
  Input,
  FormLabel,
  Button,
  Box,
  Stack,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Flex,
  useToast
} from "@chakra-ui/core"
import db from "../data/database"

export default class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {
        username: localStorage.getItem("username") || null,
        name: "",
        title: "",
        bio: "",
        role: "",
        lookingFor: [],
        hasIdea: false,
        sectors: [],
        locations: [],
        likes: []
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeArr = this.handleChangeArr.bind(this)
  }

  handleChange = (propertyName) => (event) => {
    const { profile } = this.state
    const updatedProfile = {
      ...profile,
      [propertyName]: event.target.value
    }
    this.setState({ profile: updatedProfile })
  }

  handleChangeArr = (propertyName) => (event) => {
    const { profile } = this.state
    const updatedProfile = {
      ...profile,
      [propertyName]: event
    }
    this.setState({ profile: updatedProfile })
  }

  profileIsComplete = (profile) => {
    if (!profile.username || !profile.title || !profile.bio
      || !profile.role || profile.lookingFor.length < 1
      || !profile.hasIdea || profile.sectors.length < 1
      || profile.locations.length < 1 || !profile.name) {
      return false
    }
    return true
  }

  updateProfile = () => {
    if (this.profileIsComplete(this.state.profile)) {
      db.insertOrUpdate("posts", { username: this.state.profile.username },
        this.state.profile)
      db.commit()
    }
  }

  componentDidMount = () => {
    const posts = db.queryAll("posts", {
      query: { username: this.state.profile.username }
    })
    if (posts.length > 0) {
      this.setState({ profile: posts[0] })
      return
    }
  }

  render = () => {
    let username = this.state.username
    return (
      <Flex direction="column" align="center">
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

              <FormLabel>Email:</FormLabel>
              <Input
                isReadOnly
                placeholder="Email"
                value={this.state.profile.username}
                onChange={this.handleChange('username')}
              />

              <FormLabel>Name:</FormLabel>
              <Input
                placeholder="Name"
                value={this.state.profile.name}
                onChange={this.handleChange('name')}
              />

              <FormLabel>Describe Yourself:</FormLabel>
              <Input
                placeholder="Tagline"
                value={this.state.profile.title}
                onChange={this.handleChange('title')}
              />
              <Textarea
                placeholder="Bio"
                value={this.state.profile.bio}
                onChange={this.handleChange('bio')}
              />

              <FormLabel>Role:</FormLabel>
              <RadioGroup
                isInline
                value={this.state.profile.role}
                onChange={this.handleChange('role')}
              >
                <Radio value="CEO">CEO</Radio>
                <Radio value="CTO">CTO</Radio>
                <Radio value="COO">COO</Radio>
                <Radio value="CPO">CPO</Radio>
              </RadioGroup>

              <FormLabel>Looking For:</FormLabel>
              <CheckboxGroup
                isInline
                value={this.state.profile.lookingFor}
                onChange={this.handleChangeArr('lookingFor')}
              >
                <Checkbox value="CEO">CEO</Checkbox>
                <Checkbox value="CTO">CTO</Checkbox>
                <Checkbox value="COO">COO</Checkbox>
                <Checkbox value="CPO">CPO</Checkbox>
              </CheckboxGroup>

              <FormLabel>Already have an idea?</FormLabel>
              <RadioGroup
                isInline
                value={this.state.profile.hasIdea}
                onChange={this.handleChange('hasIdea')}
              >
                <Radio value="true">Yes</Radio>
                <Radio value="false">No</Radio>
              </RadioGroup>

              <FormLabel>Sectors you're interested in working in:</FormLabel>
              <CheckboxGroup
                isInline
                value={this.state.profile.sectors}
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
                value={this.state.profile.locations}
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
            <Button  mt={4} onClick={this.updateProfile}>
              Submit    
            </Button>
          </FormControl>
        </Box>
      </Flex>
    )
  }
}