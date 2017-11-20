import React from 'react'
import PropTypes from 'prop-types'
import View from '../atoms/View'
import { css } from 'glamor'
import Theme from '../behaviour/Theme'

const circle = (backgroundColor, outline, outlineColor, fill, radius) =>
  css({
    border: outline && `1px solid ${outlineColor || backgroundColor}`,
    backgroundColor: fill && backgroundColor,
    borderRadius: '50%',
    height: radius,
    width: radius,
    transition: 'background-color 120ms linear',
  })

/**
 * Simple circle element that is used to build other things.
 *
 * Check out ProfileImage to see it in action.
 *
 * ```example
 * <ThemeProvider>
 *   <ResourceProvider>
 *     <View direction="row" alignV="center">
 *       <Circle outline fill={false} outlineColor="lightGrey">
 *         <Icon size="s" name="remove-filled" color="lightGrey" />
 *       </Circle>
 *       <Circle color="primary" />
 *       <Circle color="#bada55" radius={20} />
 *       <Circle color="gray" radius={10} />
 *     </View>
 *   </ResourceProvider>
 * </ThemeProvider>
 * ```
**/
const Circle = ({
  fill = true,
  color = 'primary',
  outline,
  outlineColor = 'primary',
  radius = 40,
  children,
  ...props
}) => (
  <Theme>
    {({ colorize }) => (
      <View
        {...circle(
          colorize(color),
          outline,
          colorize(outlineColor),
          fill,
          radius
        )}
        alignV="center"
        alignH="center"
        direction="column"
        {...props}
      >
        {children}
      </View>
    )}
  </Theme>
)

Circle.propTypes = {
  /** Content of the Circle will be always centered */
  children: PropTypes.node,
  /** Color of the Circle. Allows theme names (like 'primary') or hex colors  */
  color: PropTypes.string,
  /** Radius of Circle, defaults to 40 */
  radius: PropTypes.number,
  /** If true it will only render the outline */
  outline: PropTypes.bool,
  /** If passed outline will use as outline color instead of color */
  outlineColor: PropTypes.string,
  /** If true it will fill the circle */
  fill: PropTypes.bool,
}

export default Circle
