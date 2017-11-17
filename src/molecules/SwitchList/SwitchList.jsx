import React from 'react'
import PropTypes from 'prop-types'
import View from '../../atoms/View'
import { css } from 'glamor'
import { ColorPalette } from '@allthings/colors'
import SwitchListItem from './SwitchListItem'
import SwitchListSpinner from './SwitchListSpinner'

const switchListRadius = '2px'

const styles = {
  container: css({
    '> *:last-child': {
      borderBottom: 'none',
    },
    '> *': {
      borderBottom: `1px solid ${ColorPalette.text.gray}`,
    },
    overflow: 'hidden',
    border: `1px solid ${ColorPalette.text.gray}`,
    borderRadius: `${switchListRadius}`,
    ':hover': { cursor: 'pointer' },
  }),
  switchListItem: css({ position: 'relative' }),
  itemInnerContainer: css({
    backgroundColor: ColorPalette.text.gray,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  }),
}

/**
 * Let's you choose between a limited set of items.
 *
 * **Note:** This is not meant to used for navigation
 *
 * ```example
 * <SwitchList
 *   options={{
 *     a: 'Freiburg',
 *     b: 'Berlin',
 *     c: 'München',
 *   }}
 *   initialActive="b"
 *   showSpinner={false}
 * />
 * ```
 */
export default class SwitchList extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.object,
    initialActive: PropTypes.string,
    showSpinner: PropTypes.bool,
  }

  state = {
    active: this.props.initialActive,
  }

  handleClick = optionKey => {
    if (!this.props.disabled) {
      this.props.onChange(optionKey)
      this.setState({ active: optionKey })
    }
  }

  renderItems = () => {
    return Object.keys(this.props.options).map(optionKey => {
      return (
        <SwitchListItem
          key={optionKey}
          optionKey={optionKey}
          value={this.props.options[optionKey]}
          isActive={this.state.active === optionKey}
          onClick={this.handleClick}
          {...styles.switchListItem}
        >
          {this.props.showSpinner &&
            this.state.active === optionKey && (
              <View
                key={optionKey}
                direction="row"
                alignV="center"
                {...styles.itemInnerContainer}
              >
                <SwitchListSpinner width={23} fill={ColorPalette.text.gray} />
              </View>
            )}
        </SwitchListItem>
      )
    })
  }

  render() {
    const {
      disabled,
      onChange,
      options,
      initialActive,
      showSpinner,
      ...props
    } = this.props
    return (
      <View {...styles.container} {...props}>
        {this.renderItems()}
      </View>
    )
  }
}
