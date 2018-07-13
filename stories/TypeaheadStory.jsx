import React from 'react'
import { View, ThemeProvider, Typeahead, ResourceProvider } from '../src/'
import { css } from 'glamor'
import Text from '../src/atoms/Text'

import Names from './data/names'
import Movies from './data/movies'
const delay = time => new Promise(resolve => setTimeout(resolve, time))

class TypeaheadStory extends React.Component {
  state = {
    inputValue: '',
    movies: [],
    isLoading: false,
  }

  onInputChange = value => this.setState({ inputValue: value })

  refetch = async () => {
    this.setState({ isLoading: true })
    await delay(1000)
    this.setState({ movies: Movies, isLoading: false })
  }

  render() {
    const { movies, isLoading } = this.state
    return (
      <ThemeProvider>
        <ResourceProvider>
          <View direction="column" {...css({ padding: '10px 20px' })}>
            <Text strong style={{ margin: '15px 0' }}>
              Static:
            </Text>
            <Typeahead placeholder="Select an agent" items={Names} />

            <Text strong style={{ margin: '15px 0' }}>
              Fetch from (fake) remote:
            </Text>
            <Typeahead
              placeholder="Select your favorite movie"
              onSelect={item => console.log('Selected', item)}
              onInputValueChange={this.onInputChange}
              onOpen={this.refetch}
              isLoading={isLoading}
              items={movies}
            />
          </View>
        </ResourceProvider>
      </ThemeProvider>
    )
  }
}
export default TypeaheadStory
