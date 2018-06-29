import React from 'react'
import {
  Typeahead,
  Text,
  View,
  Pill,
  ThemeProvider,
  ResourceProvider,
} from '../src/'
import { css } from 'glamor'

const NR_RESULTS = 5
const MULTISELECT = true
class TypeaheadStory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
      input: '',
      selectedElements: [],
      focusIndex: -1,
      loading: false,
    }
    this.xhr = new XMLHttpRequest()
    this.xhr.onreadystatechange = () => {
      var DONE = 4
      var OK = 200
      if (this.xhr.readyState === DONE) {
        if (this.xhr.status === OK) {
          this.setState({
            options: JSON.parse(this.xhr.responseText),
            loading: false,
          })
        } else {
          this.setState({ options: [], focusIndex: -1, loading: false })
        }
      }
    }
  }

  componentDidMount() {
    this.refetch('x')
  }

  onInputChange = input => {
    input ? this.refetch(input) : this.refetch('x')
  }

  refetch = input => {
    this.setState({ loading: true })
    this.xhr.open('GET', `https://restcountries.eu/rest/v2/name/${input}`)
    this.xhr.send(null)
  }

  onSelectElement = selectedElements => this.setState({ selectedElements })

  render() {
    const { selectedElements, options, loading } = this.state
    return (
      <ThemeProvider>
        <ResourceProvider>
          <View direction="column">
            <Text align="center" {...css({ margin: '20px 0px 10px 0px' })}>
              {MULTISELECT ? 'Multiselect' : 'Single Select'}
            </Text>
            <Typeahead
              configuration={{ value: 'name', label: 'name' }}
              width="320px"
              nrResults={NR_RESULTS}
              options={options}
              onInputChange={this.onInputChange}
              loading={loading}
              onSelect={this.onSelectElement}
              multiselect={true}
            />
            <View direction="row" wrap="wrap">
              {selectedElements.map((element, index) => (
                <Pill
                  key={index}
                  label={element.label}
                  {...css({ margin: 4 })}
                />
              ))}
            </View>

            <Text align="center" {...css({ margin: '20px 0px 10px 0px' })}>
              Note: Listing the selected elements is the parent's responsibility
            </Text>
          </View>
        </ResourceProvider>
      </ThemeProvider>
    )
  }
}
export default TypeaheadStory
