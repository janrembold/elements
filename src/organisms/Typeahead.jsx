import React from 'react'
import PropTypes from 'prop-types'
import { TextInput, View, ListSpinner, Text, ListItem, Icon } from '../'
import { css } from 'glamor'
import { ColorPalette } from '@allthings/colors'

class Typeahead extends React.Component {
  static propTypes = {
    configuration: PropTypes.object.isRequired,
    width: PropTypes.string,
    selectCallback: PropTypes.func,
  }

  static defaultProps = {
    width: '100%',
    selectCallback: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      options: [],
      selectedElements: [],
      focusIndex: -1, // this would be the input field itself
    }
    this.xhr = new XMLHttpRequest()
    this.xhr.onreadystatechange = () => {
      var DONE = 4 // readyState 4 means the request is done.
      var OK = 200 // status 200 is a successful return.
      if (this.xhr.readyState === DONE) {
        if (this.xhr.status === OK) {
          this.setState({
            options: JSON.parse(this.xhr.responseText),
            loading: false,
          })
        } else {
          this.setState({ options: [], loading: false })
        }
      }
    }
    this.inputRef = React.createRef()
    this.listRef = React.createRef()
    this.listElementRefs = []
    for (let i = 0; i < 5; i++) {
      this.listElementRefs[i] = React.createRef()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.input !== prevState.input) {
      if (this.state.input) {
        this.setState({ loading: true })
        this.xhr.open(
          'GET',
          `https://restcountries.eu/rest/v2/name/${this.state.input}`
        )
        this.xhr.send(null)
      } else {
        this.setState({ options: [] })
      }
    }
  }

  handleInputChange = e => this.setState({ input: e.target.value })

  handleSelectItem = ({ value, label }) => {
    const { selectedElements } = this.state
    const { selectCallback } = this.props
    const index = selectedElements.findIndex(
      selected => value === selected.value
    )
    let newSelectedElements
    if (index > -1) {
      newSelectedElements = [...selectedElements]
      newSelectedElements.splice(index, 1)
      this.setState({ selectedElements: newSelectedElements })
    } else {
      newSelectedElements = [...selectedElements, { value, label }]
      this.setState({
        selectedElements: newSelectedElements,
      })
    }
    // signal the new array to the parent
    selectCallback(newSelectedElements)
  }

  handleClickOutside = e => {
    if (this.listRef.current && !this.listRef.current.contains(e.target)) {
      this.setState({ options: [] })
    }
  }

  clearInput = () => this.setState({ input: '' })

  onKeyDown = e => {
    const { configuration } = this.props
    const { options, focusIndex } = this.state
    if (e.keyCode === 27) {
      // escape
      this.setState({ options: [] })
      this.inputRef.current.focus()
    } else if (e.keyCode === 40) {
      this.setState(state => ({ focusIndex: state.focusIndex + 1 }))
      this.listElementRefs[focusIndex + 1].current.focus()
    } else if (e.keyCode === 38) {
      // up arrow
      this.setState(state => ({ focusIndex: state.focusIndex - 1 }))
      this.listElementRefs[focusIndex - 1].current.focus()
    } else if (e.keyCode === 13) {
      // enter
      if (focusIndex < 5 && focusIndex > -1) {
        const option = options.slice(0, 5)[focusIndex]
        this.handleSelectItem({
          value: option[configuration.value],
          label: option[configuration.label],
        })
      }
    }
  }

  render() {
    const { configuration, width } = this.props
    const { options, loading, selectedElements, input, focusIndex } = this.state
    const showSpinner = loading && !(options.length > 0)
    console.log(focusIndex)
    return (
      <View
        direction="column"
        {...css({ position: 'relative' })}
        onKeyDown={this.onKeyDown}
      >
        {input && (
          <View
            style={{
              position: 'absolute',
              zIndex: '2200',
              cursor: 'pointer',
              top: 18,
              right: 10,
            }}
          >
            <Icon
              name="trash"
              size="xs"
              color="black"
              onClick={this.clearInput}
            />
          </View>
        )}
        <input
          onChange={this.handleInputChange}
          value={input}
          ref={this.inputRef}
          {...css({ height: 43 })}
        />
        {showSpinner && <ListSpinner {...css({ marginTop: '10px' })} />}
        <View
          direction="column"
          onRef={this.listRef}
          {...css({
            position: 'absolute',
            top: '50px',
            zIndex: 1000,
            boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.4)',
          })}
        >
          {!showSpinner &&
            options.slice(0, 5).map((option, index) => (
              <ListItem
                key={index}
                onClick={() =>
                  this.handleSelectItem({
                    value: option[configuration.value],
                    label: option[configuration.label],
                  })
                }
                backgroundColor={
                  selectedElements.findIndex(
                    selected => option[configuration.value] === selected.value
                  ) > -1
                    ? ColorPalette.whiteIntense
                    : ColorPalette.white
                }
                {...css({
                  width,
                })}
              >
                <Text onRef={this.listElementRefs[index]} tabIndex={0}>
                  {option[configuration.label]}
                </Text>
              </ListItem>
            ))}
        </View>
      </View>
    )
  }
}

export default Typeahead
