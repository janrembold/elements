import PropTypes from 'prop-types'
import React from 'react'
import { css } from 'glamor'
import Text from '../atoms/Text'
import { withTheme } from '../behaviour/ThemeProvider'
import { color, colorCode } from '../propTypes/color'

const baseStyle = {
  position: 'relative',
  padding: '8px 14px',
  borderRadius: '2px',
  userSelect: 'none',
  outline: 'none',
  border: 'none',
}

function styles(
  backgroundColor,
  color,
  disabled,
  disabledColor,
  disabledBackgroundColor
) {
  return css({
    ...baseStyle,
    background: disabled ? disabledBackgroundColor : backgroundColor,
    color: disabled ? disabledColor : color,
    cursor: disabled ? 'not-allowed' : 'pointer',
  })
}

/**
 * Buttons make common actions immediately visible and easy to perform with one
 * click or tap. They can be used for any type of action, including navigation.
 *
 * You can use two different looks for the button: primary and
 * secondary. Primary is the default type, so there's no need to explicitly
 * define it.
 *
 * ```example
 * <ThemeProvider>
 *   <Button>Hello you</Button>
 * </ThemeProvider>
 * ```
 */
class Button extends React.Component {
  static propTypes = {
    /** Just text most of the time */
    children: PropTypes.node.isRequired,
    /** Called when the button is clicked */
    onClick: PropTypes.func,
    /** Type of the button (deprecated) */
    type: PropTypes.oneOf(['reset', 'button', 'submit']),
    /** Disable button state to indicate it's not touchable */
    disabled: PropTypes.bool,
    /** Color of the button, theme primary color by default */
    backgroundColor: PropTypes.string,
    /** Textcolor of the button (deprecated) */
    color: color,
    /** Textcolor when button is disabled (deprecated) */
    disabledColor: PropTypes.string,
    /** Color when button is disabled (deprecated) */
    disabledBackgroundColor: PropTypes.string,
    /** Pass your own css (deprecated) */
    css: PropTypes.object,
  }

  handleClick = e => {
    if (!this.props.disabled) {
      this.props.onClick && this.props.onClick(e)
    } else {
      e.preventDefault()
    }
  }

  render() {
    const {
      children,
      type,
      disabled,
      backgroundColor,
      color,
      disabledColor,
      disabledBackgroundColor,
      css: cssProp,
      ...restProps
    } = this.props

    const allStyles = css(
      styles(
        colorCode(backgroundColor),
        color,
        disabled,
        disabledColor,
        disabledBackgroundColor
      ),
      cssProp
    )

    return (
      <button
        type={type}
        {...allStyles}
        {...restProps}
        name={restProps.name || type || null}
        onClick={this.handleClick}
      >
        {typeof children === 'string' ? <Text color={color}>{children}</Text> : children}
      </button>
    )
  }
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  color: 'white',
  backgroundColor: 'purple',
  disabledColor: 'darkgray',
  disabledBackgroundColor: 'lightGray',
}

const mapThemeToProps = (theme, props) => ({
  backgroundColor: props.backgroundColor || theme.primary,
})

export default withTheme(mapThemeToProps)(Button)
