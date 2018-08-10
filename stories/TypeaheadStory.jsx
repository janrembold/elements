import React from 'react'
import {
  Button,
  View,
  ThemeProvider,
  Typeahead,
  ResourceProvider,
} from '../src/'
import { css } from 'glamor'
import Text from '../src/atoms/Text'

import Names from './data/names'
import Movies from './data/movies'

const DEFAULT_VALUE = 'Danielle Lilleman'
const MARGIN = 15 // px

/* eslint-disable standard/no-callback-literal */
const debounce = (callback, time = 200, interval) => (...args) =>
  clearTimeout(interval, (interval = setTimeout(() => callback(...args), time)))
/* eslint-enable standard/no-callback-literal */

const delay = time => new Promise(resolve => setTimeout(resolve, time))

class TypeaheadStory extends React.Component {
  state = {
    clearOnSelectValue: '',
    forcedValue: DEFAULT_VALUE,
    inputValue: '',
    loading: false,
    movies: [],
    selectedMovie: null,
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
    const { clearOnSelectValue, forcedValue, loading, movies } = this.state
    return (
      <ThemeProvider>
        <ResourceProvider>
          <View direction="column" {...css({ padding: '10px 20px' })}>
            <Text strong style={{ margin: `${MARGIN}px 0` }}>
              Static:
            </Text>
            <Typeahead autoOpen items={Names} placeholder="Select an agent." />

            <Text strong style={{ margin: `${MARGIN}px 0` }}>
              Uncontrolled component:
            </Text>
            <Typeahead
              autoOpen
              defaultValue={forcedValue}
              items={Names}
              placeholder="Select an agent."
            />

            <Text strong style={{ margin: `${MARGIN}px 0` }}>
              Controlled component:
            </Text>
            <Typeahead
              autoOpen
              items={Names}
              onClearSelection={() => this.setState({ forcedValue: '' })}
              onInputValueChange={forcedValue => this.setState({ forcedValue })}
              onSelect={item =>
                item && this.setState({ forcedValue: item.label })
              }
              placeholder="Select an agent."
              value={forcedValue}
            />
            <Button
              onClick={() => this.setState({ forcedValue: DEFAULT_VALUE })}
              style={{ marginTop: MARGIN }}
            >
              Reset
            </Button>

            <Text strong style={{ margin: `${MARGIN}px 0` }}>
              Clear on select:
            </Text>
            <Typeahead
              autoOpen
              clearOnSelect
              items={Names}
              onSelect={item =>
                item &&
                this.setState({
                  clearOnSelectValue: item.label,
                })
              }
              placeholder="Select an agent."
            />
            <Text
              style={{ marginTop: MARGIN }}
            >{`Last selection: ${clearOnSelectValue}`}</Text>

            <Text strong style={{ margin: `${MARGIN}px 0` }}>
              Fetch from (fake) remote:
            </Text>
            <Typeahead
              placeholder="Select your favorite movie. Start typing…"
              onSelect={item => this.setState({ selectedMovie: item })}
              onInputValueChange={this.onInputChange}
              items={movies}
              isLoading={loading}
            />
          </View>
        </ResourceProvider>
      </ThemeProvider>
    )
  }
}
export default TypeaheadStory
