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

class TypeaheadStory extends React.Component {
  state = { selectedElements: [] }
  render() {
    const { selectedElements } = this.state
    return (
      <ThemeProvider>
        <ResourceProvider>
          <View direction="column">
            <Typeahead
              configuration={{ value: 'name', label: 'name' }}
              width="320px"
              selectCallback={selectedElements =>
                this.setState({ selectedElements })
              }
              nrResults={5}
            />
            <Text align="center" {...css({ margin: '20px 0px 80px 0px' })}>
              Listing the selected elements is the parent's responsibility
            </Text>
            <View direction="row" wrap="wrap">
              {selectedElements.map((element, index) => (
                <Pill
                  key={index}
                  label={element.label}
                  {...css({ margin: 4 })}
                />
              ))}
            </View>
          </View>
        </ResourceProvider>
      </ThemeProvider>
    )
  }
}
export default TypeaheadStory
