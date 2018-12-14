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

const STYLES = {
  title: (first = false) =>
    css({
      margin: `${MARGIN * (first ? 1 : 2)}px 0 ${MARGIN}px 0`,
    }),
}

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
            <Text strong {...STYLES.title(true)}>
              Static:
            </Text>
            <Typeahead autoOpen items={Names} placeholder="Select an agent." />

            <Text strong {...STYLES.title()}>
              Uncontrolled component:
            </Text>
            <Typeahead
              autoOpen
              defaultValue={forcedValue}
              items={Names}
              placeholder="Select an agent."
            />

            <Text strong {...STYLES.title()}>
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
              {`Set it to ${DEFAULT_VALUE}`}
            </Button>

            <Text strong {...STYLES.title()}>
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
            <Text style={{ marginTop: MARGIN }}>
              Last selection: <em>{clearOnSelectValue}</em>
            </Text>

            <Text strong {...STYLES.title()}>
              Fetch from (fake) remote, and place the list top:
            </Text>
            <Typeahead
              placeholder="Select your favorite movie. Start typing…"
              onSelect={item => this.setState({ selectedMovie: item })}
              onInputValueChange={this.onInputChange}
              items={movies}
              isLoading={loading}
              placement="top"
            />
          </View>
        </ResourceProvider>
      </ThemeProvider>
    )
  }
}
export default TypeaheadStory
