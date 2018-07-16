import React from 'react'
import { View, ThemeProvider, Typeahead, ResourceProvider } from '../src/'
import { css } from 'glamor'
import Text from '../src/atoms/Text'

import Names from './data/names'
import Movies from './data/movies'

const debounce = (callback, time = 200, interval) => (...args) =>
  clearTimeout(interval, (interval = setTimeout(() => callback(...args), time)))

const delay = time => new Promise(resolve => setTimeout(resolve, time))

class TypeaheadStory extends React.Component {
  state = {
    inputValue: '',
    movies: [],
    selectedMovie: null,
    loading: false,
  }

  fetch = async () => {
    // In the meantime an item was selected and
    // therefore an input change was triggered: Abort!
    if (this.state.selectedMovie) return

    this.setState({ loading: true })
    // simulate an API
    await delay(750)

    const { inputValue } = this.state
    const movies =
      inputValue === ''
        ? Movies.slice(0, 10)
        : Movies.filter(m => m.label.toLowerCase().includes(inputValue))

    this.setState({ movies, loading: false })
  }

  debouncedFetch = debounce(this.fetch)

  onInputChange = value => {
    this.setState({ inputValue: value })
    value !== '' && this.debouncedFetch()
  }

  render() {
    const { movies } = this.state
    return (
      <ThemeProvider>
        <ResourceProvider>
          <View direction="column" {...css({ padding: '10px 20px' })}>
            <Text strong style={{ margin: '15px 0' }}>
              Static:
            </Text>
            <Typeahead placeholder="Select an agent." items={Names} autoOpen />

            <Text strong style={{ margin: '15px 0' }}>
              Fetch from (fake) remote:
            </Text>
            <Typeahead
              placeholder="Select your favorite movie. Start typing…"
              onSelect={item => this.setState({ selectedMovie: item })}
              onInputValueChange={this.onInputChange}
              items={movies}
              isLoading={this.state.loading}
            />
          </View>
        </ResourceProvider>
      </ThemeProvider>
    )
  }
}
export default TypeaheadStory
