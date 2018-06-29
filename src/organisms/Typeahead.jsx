import React from 'react'
import PropTypes from 'prop-types'
import { View, ListSpinner, Text, ListItem, Icon } from '../'
import { css } from 'glamor'
import { ColorPalette } from '@allthings/colors'

class Typeahead extends React.Component {
  static propTypes = {
    configuration: PropTypes.object,
    width: PropTypes.string,
    selectCallback: PropTypes.func,
    // deleteElement: PropTypes.func,
    multiselect: PropTypes.bool,
    nrResults: PropTypes.number,
  }

  static defaultProps = {
    width: '100%',
    selectCallback: () => {},
    configuration: { label: 'name', value: 'name' },
    multiselect: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      options: [],
      selectedElements: [],
      focusIndex: -1,
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
    this.inputRef = React.createRef()
    this.listRef = React.createRef()
    this.listElementRefs = []
    for (let i = 0; i < props.nrResults; i++) {
      this.listElementRefs[i] = React.createRef()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  refetch = input => {
    this.setState({ loading: true })
    this.xhr.open('GET', `https://restcountries.eu/rest/v2/name/${input}`)
    this.xhr.send(null)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.input !== prevState.input) {
      if (this.state.input) {
        this.refetch(this.state.input)
      } else {
        this.setState({ options: [], focusIndex: -1 })
      }
    }
  }

  handleInputChange = e => this.setState({ input: e.target.value })

  handleSelectItem = clickedElement => {
    const { selectedElements } = this.state
    const { selectCallback, multiselect } = this.props
    const index = selectedElements.findIndex(
      selected => clickedElement.value === selected.value
    )
    let newSelectedElements
    if (index > -1) {
      // removing element
      newSelectedElements = [...selectedElements]
      newSelectedElements.splice(index, 1)
      this.setState({ selectedElements: newSelectedElements })
    } else {
      // adding element
      newSelectedElements = multiselect
        ? [...selectedElements, clickedElement]
        : [clickedElement]
      this.setState(state => ({
        selectedElements: newSelectedElements,
        options: multiselect ? state.options : [],
        focusIndex: multiselect ? state.focusIndex : -1,
      }))
      if (!multiselect) {
        // give back focus to the input field
        this.inputRef.current.focus()
      }
    }
    // signal the new array to the parent
    selectCallback(newSelectedElements)
  }

  handleClickOutside = e => {
    if (this.listRef.current && !this.listRef.current.contains(e.target)) {
      this.setState({ options: [], focusIndex: -1 })
    }
  }

  clearInput = () => this.setState({ input: '' })

  onKeyDown = e => {
    const { configuration, nrResults } = this.props
    const { options, focusIndex, input } = this.state
    if (e.keyCode === 27) {
      // escape
      this.setState({ options: [], focusIndex: -1 })
      this.inputRef.current.focus()
    } else if (options.length > 0 && e.keyCode === 40) {
      // arrow down
      const newFocusIndex =
        focusIndex >= nrResults - 1 ? nrResults - 1 : focusIndex + 1
      this.setState({
        focusIndex: newFocusIndex,
      })
      this.listElementRefs[newFocusIndex].current.focus()
    } else if (options.length > 0 && e.keyCode === 38) {
      // arrow up
      if (focusIndex === 0) {
        this.inputRef.current.focus()
      } else {
        this.setState({ focusIndex: focusIndex - 1 })
        this.listElementRefs[focusIndex - 1].current.focus()
      }
    } else if (e.keyCode === 13) {
      // enter
      if (focusIndex < nrResults && focusIndex > -1) {
        const option = options.slice(0, nrResults)[focusIndex]
        this.handleSelectItem({
          value: option[configuration.value],
          label: option[configuration.label],
        })
      } else if (options.length === 0 && input) {
        this.refetch(input)
      }
    }
  }

  // to see something on focus
  onInputFocus = () =>
    !this.state.input &&
    this.state.selectedElements.length === 0 &&
    this.refetch('x') // just for testing, this should be empty string

  render() {
    const { configuration, width, nrResults } = this.props
    const { options, loading, selectedElements, input } = this.state
    const showSpinner = loading && !(options.length > 0)
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
          onFocus={this.onInputFocus}
          value={input}
          ref={this.inputRef}
          {...css({ height: 43, textIndent: 22 })}
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
            options.slice(0, nrResults).map((option, index) => (
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
