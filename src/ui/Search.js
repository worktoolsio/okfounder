import React from 'react'
import { FormControl, FormLabel, Input } from "@chakra-ui/core"

const Search = ({ onSearch }) => {
  const [formData, setFormData] = React.useState({ skills: '' })

  const handleSubmit = e => {
    e.preventDefault()
    onSearch(formData)
  }

  const handleChange = ({ target }) => setFormData({ [target.name]: target.value })

  return <form onSubmit={handleSubmit}>
    <FormControl isRequired onSubmit={handleSubmit}>
      <FormLabel htmlFor="skills">Find our co-founder by skills</FormLabel>
      <Input id="skills" name="skills" placeholder="Add skills separated by comma: nodejs,mongodb" onChange={handleChange} />
    </FormControl>
  </form>
}

export default Search
