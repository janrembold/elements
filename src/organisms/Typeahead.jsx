import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, ListItem, Icon } from '../'
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
    tabIndex: PropTypes.number,
    placeholder: PropTypes.string,
    preselected: PropTypes.array,
  }

  static defaultProps = {
    width: '100%',
    options: [],
    configuration: { label: 'name', value: 'name' },
    multiselect: false,
    onInputChange: () => {},
    onSelect: () => {},
    tabIndex: -1,
    placeholder: 'search',
    preselected: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      input: '',
      selectedElements: props.preselected,
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
        input: multiselect ? state.input : clickedElement.label,
        showResults:
          !console.log(multiselect ? state.showResults : false) && multiselect
            ? state.showResults
            : false,
      }))
      onSelect(newSelectedElements)
      if (!multiselect) {
        // give back focus to the input field
        // this.inputRef.current.focus()
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
    e.stopPropagation() // dont let any keypress out if typeahead is focused
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
      const option = this.visiblePartOfOptions()[focusIndex]
      if (focusIndex < nrResults && focusIndex > -1) {
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

  visiblePartOfOptions = () =>
    this.props.options
      .filter(option =>
        option[this.props.configuration.label]
          .toLowerCase()
          .includes(this.state.input.toLowerCase())
      )
      .slice(0, this.props.nrResults)

  onKeyDownClear = e => {
    if (e.keyCode === 13) {
      // enter
      e.stopPropagation()
      this.clearInput()
      this.inputRef.current.focus()
    }
  }

  // to see something on focus
  onInputFocus = () => this.setState({ showResults: true })

  render() {
    const { configuration, width, tabIndex, placeholder } = this.props
    const { selectedElements, input, showResults } = this.state
    return (
      <View
        direction="column"
        {...css({ position: 'relative', width })}
        onKeyDown={this.onKeyDown}
        onKeyUp={e => e.stopPropagation()} // dont let out any keypress events if typeahead or children are focused
      >
        {input && (
          <View
            style={{
              position: 'absolute',
              zIndex: 2,
              cursor: 'pointer',
              top: 3,
              right: 3,
              width: 30,
              height: '85%',
              padding: '12px 9px',
            }}
            tabIndex={tabIndex === -1 ? -1 : tabIndex + 1}
            onKeyDown={this.onKeyDownClear}
            onClick={this.clearInput}
          >
            <Icon name="remove-light-filled" size={12} color="black" />
          </View>
        )}
        <input
          onChange={this.handleInputChange}
          onFocus={this.onInputFocus}
          value={input}
          ref={this.inputRef}
          tabIndex={tabIndex}
          {...css({
            height: 43,
            width,
            textIndent: 22,
            fontWeight: 600,
            fontFamily: "'Open Sans', Helvetica, Arial, sans-serif",
            fontSize: 14,
            border: 'none',
            backgroundColor: ColorPalette.lightGrey,
            borderRadius: '2px',
          })}
          placeholder={placeholder}
        />
        <View
          direction="column"
          onRef={this.listRef}
          {...css({
            width,
            position: 'absolute',
            top: '46px',
            zIndex: 100,
            boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.4)',
            maxHeight: 300,
            overflowY:
              showResults && this.visiblePartOfOptions().length > 0
                ? 'auto'
                : 'hidden',
          })}
        >
          {showResults &&
            this.visiblePartOfOptions().map((option, index) => {
              const isSelected =
                selectedElements.findIndex(
                  selected => option[configuration.value] === selected.value
                ) > -1
              return (
                <ListItem
                  onRef={this.listElementRefs[index]}
                  tabIndex={tabIndex + 2 + index}
                  key={option[configuration.value]}
                  onClick={() =>
                    this.handleSelectItem({
                      value: option[configuration.value],
                      label: option[configuration.label],
                    })
                  }
                  onKeyDown={e => {
                    if (e.keyCode === 13) {
                      // enter
                      this.handleSelectItem({
                        value: option[configuration.value],
                        label: option[configuration.label],
                      })
                    }
                  }}
                  onKeyUp={e => e.stopPropagation()} // dont let out any keypress events if typeahead or children are focused
                  {...css({
                    width,
                    backgroundColor: ColorPalette.white,
                    ':focus': {
                      backgroundColor: ColorPalette.whiteIntense,
                      outline: 'none',
                    },
                  })}
                >
                  <Text>{option[configuration.label]}</Text>
                  {isSelected && (
                    <Icon
                      size={12}
                      color="green"
                      name="check-filled"
                      {...css({ marginLeft: 14, marginBottom: 7 })}
                    />
                  )}
                </ListItem>
              )
            })}
        </View>
      </View>
    )
  }
}

export default Typeahead
