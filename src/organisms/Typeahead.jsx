import React from 'react'
import PropTypes from 'prop-types'
import { View, ListSpinner, Text, ListItem, Icon } from '../'
import { css } from 'glamor'
import { ColorPalette } from '@allthings/colors'

class Typeahead extends React.Component {
  static propTypes = {
    configuration: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
    width: PropTypes.string,
    options: PropTypes.array,
    multiselect: PropTypes.bool,
    nrResults: PropTypes.number,
    onInputChange: PropTypes.func,
    onSelect: PropTypes.func,
    loading: PropTypes.bool,
  }

  static defaultProps = {
    width: '100%',
    options: [],
    configuration: { label: 'name', value: 'name' },
    multiselect: false,
    onInputChange: () => {},
    onSelect: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      selectedElements: [],
      focusIndex: -1,
      showResults: false,
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

  handleInputChange = e => {
    this.props.onInputChange(e.target.value)
    this.setState({ input: e.target.value, showResults: true })
  }

  handleSelectItem = clickedElement => {
    const { selectedElements } = this.state
    const { multiselect, onSelect } = this.props
    const index = selectedElements.findIndex(
      selected => clickedElement.value === selected.value
    )
    let newSelectedElements
    if (index > -1) {
      // removing element
      newSelectedElements = [...selectedElements]
      newSelectedElements.splice(index, 1)
      this.setState({ selectedElements: newSelectedElements })
      onSelect(newSelectedElements)
    } else {
      // adding element
      newSelectedElements = multiselect
        ? [...selectedElements, clickedElement]
        : [clickedElement]
      this.setState(state => ({
        selectedElements: newSelectedElements,
        focusIndex: multiselect ? state.focusIndex : -1,
      }))
      onSelect(newSelectedElements)
      if (!multiselect) {
        // give back focus to the input field
        this.inputRef.current.focus()
      }
    }
  }

  handleClickOutside = e => {
    if (this.listRef.current && !this.listRef.current.contains(e.target)) {
      this.setState({ showResults: false, focusIndex: -1 })
    }
  }

  clearInput = () => this.setState({ input: '' })

  onKeyDown = e => {
    const { configuration, nrResults, options, multiselect } = this.props
    const { focusIndex } = this.state
    if (e.keyCode === 27) {
      // escape
      this.setState({ showResults: false, focusIndex: -1 })
      this.inputRef.current.focus()
    } else if (options.length > 0 && e.keyCode === 40) {
      // arrow down
      const lowerBorder =
        nrResults > options.length ? options.length : nrResults
      const newFocusIndex =
        focusIndex >= lowerBorder - 1 ? lowerBorder - 1 : focusIndex + 1
      this.setState({
        focusIndex: newFocusIndex,
      })
      this.listElementRefs[newFocusIndex].current.focus()
    } else if (options.length > 0 && e.keyCode === 38) {
      // arrow up
      if (focusIndex === -1) {
      } else if (focusIndex === 0) {
        this.inputRef.current.focus()
        this.setState({ focusIndex: -1 })
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
        this.setState(state => ({
          showResults: multiselect ? state.showResults : false,
        }))
      } else if (focusIndex === -1) {
        this.setState({ showResults: true })
      }
    }
  }

  // to see something on focus
  onInputFocus = () =>
    !this.state.input &&
    this.state.selectedElements.length === 0 &&
    this.setState({ showResults: true })

  render() {
    const { configuration, width, nrResults, options, loading } = this.props
    const { selectedElements, input, showResults } = this.state
    const showSpinner = loading && !options.length
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
          {showResults &&
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
