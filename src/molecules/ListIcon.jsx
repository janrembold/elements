import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../atoms/Icon'
import Circle from '../atoms/Circle'
import { color } from '../propTypes/color'
import { withTheme } from '../behaviour/ThemeProvider'

/**
 * ListIcons are used to display icons in a list.
 *
 * ```example
 * <ResourceProvider>
 *   <ListIcon
 *     color="white"
 *     backgroundColor="blue"
 *     name="serving-filled"
 *   />
 * </ResourceProvider>
 * ```
 */
class ListIcon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    iconColor: color,
    backgroundColor: color,
  }

  render() {
    const { name, backgroundColor, iconColor } = this.props
    return (
      <Circle color={backgroundColor} fill height={40} width={40}>
        <Icon color={iconColor} size="s" name={name} />
      </Circle>
    )
  }
}

const mapThemeToProps = theme => ({
  backgroundColor: theme.primary,
  iconColor: theme.textOnBackground,
})

export default withTheme(mapThemeToProps)(ListIcon)
