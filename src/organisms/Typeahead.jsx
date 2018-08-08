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

const NOOP = _ => _

const bounceAnim = keyframes('bounce', {
  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
  '40%': { transform: 'translateY(-10px)' },
  '60%': { transform: 'translateY(-10px)' },
})

export default class Typeahead extends React.PureComponent {
  static propTypes = {
    autoOpen: PropTypes.bool,
    isLoading: PropTypes.bool,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node.isRequired,
        value: PropTypes.any.isRequired,
      })
    ).isRequired,
    limit: PropTypes.number,
    menuHeight: PropTypes.number,
    onClose: PropTypes.func,
    onInputValueChange: PropTypes.func,
    onOpen: PropTypes.func,
    onSelect: PropTypes.func,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    limit: 20,
    menuHeight: 300,
    onClose: NOOP,
    onOpen: NOOP,
  }

  state = { showScrollArrow: false }

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

  createRenderListItem = ({ getItemProps, highlightedIndex }) => (
    item,
    index
  ) => (
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
      placeholder,
      items,
      menuHeight,
      onInputValueChange,
      onSelect,
      autoOpen,
      isLoading,
      limit,
    } = this.props

    const { showScrollArrow } = this.state

    return (
      <Downshift
        defaultHighlightedIndex={0}
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
                    name="hint"
                    tabIndex={-1}
                    value={
                      inputValue && !selectedItem && filtered.length > 0
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
                  ) : selectedItem ? (
                    <View
                      onClick={clearSelection}
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
                  ) : null}
                </Absolute>
              </Relative>
              <Relative>
                {showOpen && (
                  <List
                    onRef={this.setListRef}
                    {...getMenuProps()}
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
                        getItemProps,
                        highlightedIndex,
                        selectedItem,
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
