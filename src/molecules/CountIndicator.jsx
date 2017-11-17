import React from 'react'
import PropTypes from 'prop-types'
import Circle from '../atoms/Circle'
import Text from '../atoms/Text'
import Absolute from '../atoms/Absolute'
import Theme from '../behaviour/Theme'

/**
 * CountIndicator are used to indicated changes or updates. They can also be
 * used to inform user about new or unseen information that are available
 *
 * ```example
 * <ThemeProvider>
 *   <Relative>
 *     <Text>Hello</Text>
 *     <CountIndicator top={0} left={35} count={123} />
 *   </Relative>
 * </ThemeProvider>
 * ```
 **/
const CountIndicator = ({ count, ...props }) =>
  count === 0 ? null : (
    <Theme>
      {({ colorize }) => (
        <Absolute {...props}>
          <Circle color={colorize(props.color)} radius={18}>
            <Text size="xs" color="white">
              {count > 9 ? '9+' : count}
            </Text>
          </Circle>
        </Absolute>
      )}
    </Theme>
  )

CountIndicator.propTypes = {
  /** Number to display */
  count: PropTypes.number.isRequired,
  /** Top offset */
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Bottom offset */
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Left offset */
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Right offset */
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Color */
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

CountIndicator.defaultProps = {
  color: 'warn',
}

export default CountIndicator
