import React from 'react'
import Circle from '../atoms/Circle'
import { Motion, spring } from 'react-motion'
import { withTheme } from '../behaviour/ThemeProvider'
import Icon from '../atoms/Icon'
import PropTypes from 'prop-types'

class Checkmark extends React.Component {
  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    theme: PropTypes.object.isRequired,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    checked: false,
  }

  render() {
    const { checked, theme, onClick, ...props } = this.props
    return (
      <Motion
        defaultStyle={{ size: 21.5 }}
        style={{
          size: spring(checked ? 21.5 : 10, {
            stiffness: 180,
            damping: 12,
          }),
        }}
      >
        {style => (
          <Circle
            outline
            fill={checked}
            outlineColor={this.props.disabled ? 'grey' : theme.primary}
            color={this.props.disabled ? 'grey' : theme.primary}
            onClick={this.props.disabled ? null : onClick}
            {...props}
          >
            {checked && (
              <Icon size={style.size} name="check-filled" color="white" />
            )}
          </Circle>
        )}
      </Motion>
    )
  }
}

export default withTheme()(Checkmark)
