import PropTypes from 'prop-types'
import React from 'react'
import { css } from 'glamor'
import Text from '../atoms/Text'
import { withTheme } from '../behaviour/ThemeProvider'
import { color, colorCode } from '../propTypes/color'

const baseStyle = {
  position: 'relative',
  padding: '6px 12px',
  borderRadius: '2px',
  border: '2px solid',
  userSelect: 'none',
  outline: 'none',
}

const primary = ({
  disabled,
  color,
  disabledBackgroundColor,
  disabledColor,
  backgroundColor,
}) => ({
  borderColor: disabled ? disabledBackgroundColor : backgroundColor,
  background: disabled ? disabledBackgroundColor : backgroundColor,
})

const secondary = ({
  color,
  disabled,
  disabledBackgroundColor,
  disabledColor,
  backgroundColor,
}) => ({
  borderColor: disabled ? disabledBackgroundColor : backgroundColor,
  background: disabled && disabledBackgroundColor,
})

function styles(
  backgroundColor,
  color,
  disabled,
  disabledColor,
  disabledBackgroundColor,
  isSecondary
) {
  const props = {
    color,
    disabled,
    disabledBackgroundColor,
    disabledColor,
    backgroundColor,
  }
  return css({
    ...baseStyle,
    ...(isSecondary ? secondary(props) : primary(props)),
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
 *
 * To have an icon as button-label, just add the icon-component as children.
 *
 * ```example
 * <Button type="submit">
 *    <View direction="row">
 *      Hello with icon
 *      <View style={{ marginLeft: 10 }}>
 *        <Icon name="send-filled" size="xs" color="white" />
 *      </View>
 *    </View>
 *  </Button>
 * ```
 */
class Button extends React.Component {
  static propTypes = {
    /** Just text most of the time */
    children: PropTypes.node.isRequired,
    /** Called when the button is clicked */
    onClick: PropTypes.func,
    /** If the button is used for a secondary option */
    secondary: PropTypes.bool,
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
      secondary,
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
        disabledBackgroundColor,
        secondary
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
        {typeof children === 'string' ? (
          <Text color={secondary && !disabled ? backgroundColor : color}>
            {children}
          </Text>
        ) : (
          children
        )}
      </button>
    )
  }
}

Button.defaultProps = {
  type: 'button',
  disabled: false,
  secondary: false,
  color: 'white',
  backgroundColor: 'purple',
  disabledColor: 'darkgray',
  disabledBackgroundColor: 'lightGray',
}

const mapThemeToProps = (theme, props) => ({
  backgroundColor: props.backgroundColor || theme.primary,
})

export default withTheme(mapThemeToProps)(Button)
