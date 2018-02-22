import React from 'react'
import Absolute from '../atoms/Absolute'
import { withTheme } from '../behaviour/ThemeProvider'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import View from '../atoms/View'

const buttonStyle = css({
  width: '100%',
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'center',
  height: '100%',
  background: 'transparent',
  border: 0,
})

const availableSizes = {
  xs: 30,
  s: 40,
  m: 50,
  l: 60,
  xl: 70,
}

/**
 * A FloatingButton will stick to the bottom of the viewport all the time.
 * They make common actions immediately visible and easy to perform with one
 * click or tap. They can be used for any type of action, including navigation.
 *
 *
 * ```example
 * <ThemeProvider>
 *   <FloatingButton>
 *     <Text strong color="white">Hello world</Text>
 *   </FloatingButton>
 * </ThemeProvider>
 * ```
 */
class FloatingButton extends React.Component {
  static propTypes = {
    /** Textcolor of the button */
    color: PropTypes.string.isRequired,
    /** Disable button state to indicate it's not touchable */
    disabled: PropTypes.bool,
    /** Textcolor when button is disabled */
    disabledColor: PropTypes.string.isRequired,
    /** Size of the button (defaults to l) */
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  }

  static defaultProps = {
    size: 'l',
  }

  render() {
    const { color, disabled, disabledColor, size, ...props } = this.props
    return (
      <View>
        <View style={{ height: availableSizes[size] }} />
        <Absolute
          alignH="center"
          alignV="center"
          bottom={0}
          direction="row"
          flex="flex"
          {...css({
            backgroundColor: disabled ? disabledColor : color,
            boxShadow: '0px -2px 10px 0px rgba(0, 0, 0, 0.2)',
            height: availableSizes[size],
            overflow: 'hidden',
            width: '100%',
          })}
        >
          <button {...buttonStyle} {...props} {...css({cursor: disabled ? 'default' : 'pointer'})} />
        </Absolute>
      </View>
    )
  }
}

const mapThemeToProps = theme => ({
  color: theme.primary,
  disabledColor: 'lightGray',
})

export default withTheme(mapThemeToProps)(FloatingButton)
