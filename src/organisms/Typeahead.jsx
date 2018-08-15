import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import matchSorter from 'match-sorter'
import { alpha, ColorPalette } from '@allthings/colors'
import { css, keyframes } from 'glamor'

import Relative from '../atoms/Relative'
import Absolute from '../atoms/Absolute'
import { Input, List, ListItem, Text } from '../index'
import Icon from '../atoms/Icon'
import View from '../atoms/View'
import escapeRegex from '../utils/escapeRegex'
import Spinner from '../atoms/Spinner'

const DEV = 'development'
const NOOP = _ => _

const bounceAnim = keyframes('bounce', {
  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
  '40%': { transform: 'translateY(-10px)' },
  '60%': { transform: 'translateY(-10px)' },
})

export default class Typeahead extends React.PureComponent {
  static propTypes = {
    /** Forces the menu to be opened when clicking in the input. */
    autoOpen: PropTypes.bool,
    /** Automatically clears the selection. Must not be used with controlled
     * and uncontrolled components. */
    clearOnSelect: PropTypes.bool,
    /** The default value of the component, without making it controlled. */
    defaultValue: PropTypes.string,
    /** The loading state of the component, e.g when externally fetching some
     * data. */
    isLoading: PropTypes.bool,
    /** The items passed to component as an array of objects. */
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node.isRequired,
        value: PropTypes.any.isRequired,
      })
    ).isRequired,
    /** The maximum number of items displayed in the menu. */
    limit: PropTypes.number,
    /** The height of the menu in pixels. */
    menuHeight: PropTypes.number,
    /** Callback triggered when clearing the selection. */
    onClearSelection: PropTypes.func,
    /** Callback triggered when the menu is closed. */
    onClose: PropTypes.func,
    /** Callback triggered when the input value is modified. */
    onInputValueChange: PropTypes.func,
    /** Callback triggered when the menu is opened. */
    onOpen: PropTypes.func,
    /** Callback triggered when selecting an item. */
    onSelect: PropTypes.func,
    /** The placeholder displayed in the input field. */
    placeholder: PropTypes.string,
    /** The value of the component, makes this a controlled component. */
    value: PropTypes.string,
  }

  static defaultProps = {
    limit: 20,
    menuHeight: 300,
    onClearSelection: NOOP,
    onClose: NOOP,
    onOpen: NOOP,
  }

  constructor(props) {
    super(props)
    if (
      process &&
      process.env &&
      process.env.NODE_ENV === DEV &&
      props.hasOwnProperty('clearOnSelect') &&
      (props.hasOwnProperty('defaultValue') || props.hasOwnProperty('value'))
    ) {
      console.warn(
        [
          'The clearOnSelect property should not be used on a controlled',
          'or uncontrolled component in order to avoid side-effects.',
        ].join('')
      )
    }
    this.state = {
      forceShowClearIcon:
        props.hasOwnProperty('defaultValue') || props.hasOwnProperty('value'),
      showScrollArrow: false,
    }
  }

  componentDidUpdate({ value: prevValue = '' }) {
    // Force to coerce to an empty string when used as a controlled component.
    const { value = '' } = this.props
    if (prevValue !== value && prevValue === '' && value !== '') {
      this.setState({ forceShowClearIcon: true })
    }
  }

  clearSelection = downshiftClearSelection => () => {
    // Trigger the Downshift method.
    downshiftClearSelection()
    // Trigger the prop one.
    this.props.onClearSelection()
    // Clear the icon when controlled or uncontrolled.
    if (this.state.forceShowClearIcon) {
      this.setState({ forceShowClearIcon: false })
    }
  }

  getHintText = (inputValue, itemText) => {
    if (itemText.toLowerCase().startsWith(inputValue.toLowerCase())) {
      const escaped = escapeRegex(inputValue)
      const restText = itemText
        .split(new RegExp(`(${escaped})`, 'i'))
        .slice(2)
        .join('')

      return inputValue + restText
    }

    return ''
  }

  stateReducer = (state, changes) => {
    switch (changes.type) {
      // Special case when the clearOnSelect property is used and we want to
      // clear the input.
      // case Downshift.stateChangeTypes.clickItem:
      case Downshift.stateChangeTypes.keyDownEnter:
        return {
          ...changes,
          ...(this.props.clearOnSelect && { inputValue: '' }),
        }

      case Downshift.stateChangeTypes.changeInput:
        return {
          // When the input value is cleared then also clear the selection.
          ...changes,
          selectedItem: changes.inputValue === '' ? null : state.selectedItem,
        }

      default:
        return changes
    }
  }

  handleStateChange = changes => {
    if (changes.isOpen === true) this.props.onOpen()
    if (changes.isOpen === false) this.props.onClose()
    if (changes.hasOwnProperty('inputValue')) this.showArrowIfNecessary()
  }

  createRenderListItem = ({
    clearSelection,
    getItemProps,
    highlightedIndex,
  }) => (item, index) => (
    <ListItem
      {...getItemProps({
        index,
        item,
        key: item.value,
        style: {
          backgroundColor:
            highlightedIndex === index
              ? alpha(ColorPalette.background.bright, 0.5, true)
              : ColorPalette.background.white,
        },
        ...(this.props.clearOnSelect && {
          onClick: () =>
            // Perform it on next tick.
            setTimeout(() => this.clearSelection(clearSelection)()),
        }),
      })}
    >
      <Text size="m">{item.label}</Text>
    </ListItem>
  )

  showArrowIfNecessary = () =>
    this.listRef &&
    this.setState({
      showScrollArrow: this.listRef.scrollHeight > this.props.menuHeight,
    })

  setListRef = el => {
    this.listRef = el
    this.showArrowIfNecessary()
  }

  handleListScroll = e => {
    if (this.state.showScrollArrow && e.target.scrollTop > 0) {
      this.setState({ showScrollArrow: false })
    }
  }

  render() {
    const {
      autoOpen,
      clearOnSelect,
      defaultValue,
      isLoading,
      items,
      limit,
      menuHeight,
      onInputValueChange,
      onSelect,
      placeholder,
      value,
    } = this.props

    const { forceShowClearIcon, showScrollArrow } = this.state

    return (
      <Downshift
        defaultHighlightedIndex={0}
        defaultInputValue={defaultValue}
        inputValue={value}
        itemToString={item => (item ? item.label : '')}
        onChange={onSelect}
        onInputValueChange={onInputValueChange}
        onStateChange={this.handleStateChange}
        stateReducer={this.stateReducer}
      >
        {({
          clearSelection,
          getInputProps,
          getItemProps,
          getMenuProps,
          highlightedIndex,
          inputValue,
          isOpen,
          selectedItem,
          selectHighlightedItem,
          selectItem,
          toggleMenu,
        }) => {
          const filtered = matchSorter(items, inputValue, {
            keys: ['label'],
          }).slice(0, limit)

          const showOpen = isOpen && !isLoading && filtered.length > 0

          // Opt for <div> here because we don't want to mess with downshifts
          // getRootProps and refKey, which is kind of strange.
          return (
            <div
              {...css({
                alignItems: 'stretch',
                background: 'transparent',
                border: 'none',
                boxShadow: showOpen && '1px 1px 3px rgba(29, 29, 29, 0.125)',
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                width: '100%',
              })}
            >
              <Relative
                {...css({
                  ':after': selectedItem && {
                    background:
                      'linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(192,192,192,0) 52%,rgba(244,244,244,0) 66%,rgba(255,255,255,0.6) 81%,rgba(255,255,255,1) 88%,rgba(255,255,255,1) 100%)',
                    bottom: 0,
                    content: `''`,
                    left: 0,
                    pointerEvents: 'none',
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                  },
                })}
              >
                <Absolute top={0} left={0} {...css({ width: '100%' })}>
                  <Input
                    autoComplete="off"
                    name="hint"
                    tabIndex={-1}
                    value={
                      inputValue && filtered.length > 0
                        ? this.getHintText(inputValue, filtered[0].label)
                        : ''
                    }
                    {...css({
                      background: '#fff',
                      border: 'none',
                      boxShadow: 'none',
                      color: '#999',
                      opacity: 1,
                    })}
                  />
                </Absolute>
                <Input
                  name="typed"
                  onClick={autoOpen && !selectedItem ? toggleMenu : undefined}
                  placeholder={placeholder}
                  {...getInputProps({
                    onKeyDown: e => {
                      if (
                        ['Tab', 'ArrowRight', 'End'].includes(e.key) &&
                        highlightedIndex !== null &&
                        showOpen
                      ) {
                        selectHighlightedItem()
                        // Clear the selection if clearOnSelect is used as we
                        // want to keep the input empty.
                        if (clearOnSelect) clearSelection()
                        e.preventDefault()
                      }
                    },
                  })}
                  {...css({
                    background: 'transparent',
                    border: 'none',
                    borderBottom:
                      showOpen && `1px solid ${ColorPalette.lightGreyIntense}`,
                    boxShadow: 'none',
                    color: '#000',
                    outline: 'none',
                    width: '100%',
                  })}
                />
                <Absolute
                  alignV="center"
                  direction="row"
                  right={20}
                  top={0}
                  {...css({ height: '100%' })}
                >
                  {isLoading ? (
                    <Spinner size={16} />
                  ) : (
                    (selectedItem || forceShowClearIcon) &&
                    !clearOnSelect && (
                      <View
                        onClick={this.clearSelection(clearSelection)}
                        {...css({
                          // Some hitbox.
                          cursor: 'pointer',
                          margin: -10,
                          padding: 10,
                          transform: 'translateY(-3px)',
                          zIndex: 1,
                        })}
                      >
                        <Icon
                          color="black"
                          name="remove-light-filled"
                          size={10}
                        />
                      </View>
                    )
                  )}
                </Absolute>
              </Relative>
              <Relative>
                {showOpen && (
                  <List
                    onRef={this.setListRef}
                    {...getMenuProps({
                      refKey: 'onRef',
                    })}
                    {...css({
                      boxShadow:
                        showOpen && '1px 1px 3px rgba(29, 29, 29, 0.125)',
                      maxHeight: menuHeight,
                      overflowX: 'hidden',
                      overflowY: 'auto',
                      position: 'absolute',
                      width: '100%',
                      zIndex: 9999,
                    })}
                    onScroll={this.handleListScroll}
                  >
                    {filtered.map(
                      this.createRenderListItem({
                        clearSelection,
                        getItemProps,
                        highlightedIndex,
                      })
                    )}
                    <Absolute bottom={15} right={15}>
                      {showScrollArrow && (
                        <Icon
                          color="black"
                          name="arrow-down"
                          size="xs"
                          {...css({ animation: `${bounceAnim} 2500ms 2` })}
                        />
                      )}
                    </Absolute>
                  </List>
                )}
              </Relative>
            </div>
          )
        }}
      </Downshift>
    )
  }
}
