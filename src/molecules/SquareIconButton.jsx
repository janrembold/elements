import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../atoms/Icon'
import { css } from 'glamor'
import View from '../atoms/View'
import { color, colorCode } from '../propTypes/color'
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
 * <SquareIconButton icon="armchair-filled" color="red" iconColor="white" />
 * ```
 */
class SquareIconButton extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    color: color,
    /** Size of the icon child component (check <Icon />) **/
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    color: 'transparent',
    iconColor: 'lightBlack',
    iconSize: 's',
  }

  render() {
    const { icon, color, iconColor, iconSize, onClick, ...props } = this.props
    return (
      <View
        {...box(colorCode(color), onClick)}
        direction="row"
        alignH="center"
        alignV="center"
        onClick={onClick}
        {...props}
      >
        <Icon color={iconColor} size={iconSize} name={icon} />
      </View>
    )
  }
}

export default SquareIconButton
