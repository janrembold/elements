import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../atoms/Icon'
import { css } from 'glamor'
import View from '../atoms/View'
import { color, colorCode } from '../propTypes/color'
import { withTheme } from '../behaviour/ThemeProvider'
import { createMQ } from '../behaviour/Responsive'

const box = (background, onClick) =>
  css({
    height: 50,
    width: 50,
    borderRadius: 2,
    backgroundColor: background,
    [createMQ('mobile')]: {
      height: 40,
      width: 40,
    },
    ':hover': {
      cursor: onClick && 'pointer',
    },
  })

/**
 * Button with only an icon. Can be used in toolbars. May also be used
 * for back-buttons in the titlebar.
 *
 * ```example
 * <SquareIconButton icon="armchairFilled" color="red" iconColor="white" />
 * ```
 */
class SquareIconButton extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    color: color,
    iconColor: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    color: 'transparent',
    iconColor: 'lightBlack',
  }

  render() {
    const { icon, color, iconColor, onClick } = this.props
    return (
      <View
        {...box(colorCode(color), onClick)}
        direction="row"
        alignH="center"
        alignV="center"
        onClick={onClick}
      >
        <Icon color={iconColor} size="s" name={icon} />
      </View>
    )
  }
}

const mapThemeToProps = theme => ({
  textColor: theme.text,
})

export default withTheme(mapThemeToProps)(SquareIconButton)
