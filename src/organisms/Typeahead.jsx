import React from 'react'
import PropTypes from 'prop-types'
import Downshift from 'downshift'
import { alpha, ColorPalette } from '@allthings/colors'
import { css, keyframes } from 'glamor'
import Relative from '../atoms/Relative'
import Absolute from '../atoms/Absolute'
import { Input, List, ListItem, Text } from '../index'
import Icon from '../atoms/Icon'
import View from '../atoms/View'
import escapeRegex from '../utils/escapeRegex'
import Spinner from '../atoms/Spinner'

const bounceAnim = keyframes('bounce', {
  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
  '40%': { transform: 'translateY(-10px)' },
  '60%': { transform: 'translateY(-10px)' },
})

export default class Typeahead extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.node.isRequired,
      })
    ).isRequired,
    onSelect: PropTypes.func,
    onInputValueChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    isLoading: PropTypes.bool,
    menuHeight: PropTypes.number,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    menuHeight: 300,
    onOpen: () => {},
    onClose: () => {},
  }

  getHintText = (inputValue, itemText) => {
    const escaped = escapeRegex(inputValue)
    if (new RegExp(`^${escaped}`, 'i').test(itemText)) {
      const [, restText] = itemText.split(new RegExp(escaped, 'i'))
      return inputValue + restText
    }

    return ''
  }

  stateReducer = (state, changes) => {
    switch (changes.type) {
      case Downshift.stateChangeTypes.changeInput:
        return {
          ...changes, // When the input value is cleared then also clear the selection
          selectedItem: changes.inputValue === '' ? null : state.selectedItem,
        }
      default:
        return changes
    }
  }

  handleStateChange = (changes, rest) => {
    if (changes.isOpen === true) this.props.onOpen()
    if (changes.isOpen === false) this.props.onClose()
  }

  createRenderListItem = ({ getItemProps, highlightedIndex, selectedItem }) => (
    item,
    index
  ) => (
    <ListItem
      {...getItemProps({
        key: item.value,
        index,
        item,
        style: {
          backgroundColor:
            highlightedIndex === index
              ? alpha(ColorPalette.background.bright, 0.5, true)
              : ColorPalette.background.white,
          fontWeight: selectedItem === item ? 'bold' : 'normal',
        },
      })}
    >
      <Text size="m">{item.label}</Text>
    </ListItem>
  )

  render() {
    const {
      placeholder,
      items,
      menuHeight,
      onInputValueChange,
      onSelect,
      isLoading,
    } = this.props

    return (
      <Downshift
        defaultHighlightedIndex={0}
        onChange={onSelect}
        itemToString={item => (item ? item.label : '')}
        onInputValueChange={onInputValueChange}
        stateReducer={this.stateReducer}
        onStateChange={this.handleStateChange}
      >
        {({
          getInputProps,
          getMenuProps,
          getItemProps,
          selectItem,
          highlightedIndex,
          selectedItem,
          isOpen,
          inputValue,
          toggleMenu,
          selectHighlightedItem,
          clearSelection,
        }) => {
          const showOpen = isOpen && !isLoading
          const filtered = selectedItem
            ? items
            : items.filter(
                item =>
                  !inputValue ||
                  item.label.toLowerCase().includes(inputValue.toLowerCase())
              )

          // Opt for <div> here because we don't want to mess with downshifts
          // getRootProps and refKey, which is kind of strange
          return (
            <div
              {...css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: 0,
                boxShadow: showOpen && '1px 1px 3px rgba(29, 29, 29, 0.125)',
              })}
            >
              <Relative>
                <Absolute
                  top={0}
                  left={0}
                  {...css({
                    width: '100%',
                  })}
                >
                  <Input
                    tabIndex={-1}
                    name="hint"
                    value={
                      inputValue && filtered.length > 0
                        ? this.getHintText(inputValue, filtered[0].label)
                        : ''
                    }
                    {...css({
                      background: '#fff',
                      border: 'none',
                      boxShadow: 'none',
                      opacity: 1,
                      color: '#999',
                    })}
                  />
                </Absolute>
                <Input
                  onClick={toggleMenu}
                  name="typed"
                  placeholder={placeholder}
                  {...getInputProps({
                    onKeyDown: e => {
                      if (
                        (e.key === 'Tab' || e.key === 'ArrowRight') &&
                        highlightedIndex !== null &&
                        showOpen
                      ) {
                        selectHighlightedItem()
                        e.preventDefault()
                      }
                    },
                  })}
                  {...css({
                    width: '100%',
                    color: '#000',
                    border: 'none',
                    boxShadow: 'none',
                    background: 'transparent',
                    outline: 'none',
                    borderBottom:
                      showOpen && `1px solid ${ColorPalette.lightGreyIntense}`,
                  })}
                />
                <Absolute
                  right={20}
                  top={0}
                  direction="row"
                  alignV="center"
                  {...css({ height: '100%' })}
                >
                  {isLoading ? (
                    <Spinner size={16} />
                  ) : selectedItem ? (
                    <View
                      onClick={clearSelection}
                      {...css({
                        // Some hitbox
                        margin: -10,
                        padding: 10,
                        cursor: 'pointer',
                        transform: 'translateY(-3px)',
                      })}
                    >
                      <Icon
                        name="remove-light-filled"
                        size={10}
                        color="black"
                      />
                    </View>
                  ) : null}
                </Absolute>
              </Relative>
              <Relative>
                {false &&
                  showOpen && (
                    <Absolute bottom={15} right={15}>
                      <Icon
                        name="arrow-down"
                        color="black"
                        size="xs"
                        {...css({ animation: `${bounceAnim} 2500ms 2` })}
                      />
                    </Absolute>
                  )}
                {showOpen && (
                  <List
                    {...getMenuProps()}
                    {...css({
                      maxHeight: menuHeight,
                      overflow: 'auto',
                      width: '100%',
                      position: 'absolute',
                      zIndex: 9999,
                      boxShadow:
                        showOpen && '1px 1px 3px rgba(29, 29, 29, 0.125)',
                    })}
                  >
                    {filtered.map(
                      this.createRenderListItem({
                        getItemProps,
                        highlightedIndex,
                        selectedItem,
                      })
                    )}
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
