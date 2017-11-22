import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

import Text from '../atoms/Text'
import View from '../atoms/View'
import Theme from '../behaviour/Theme'

const styles = backgroundColor =>
  css({
    backgroundColor,
    display: 'inline-block',
    borderRadius: 10,
    padding: '2px 15px',
    cursor: 'default',
  })

/**
 * Pills 💊 are used to show status or to highlight a piece of information.
 * It could be used on cards to indicate that this card contains important information.
 *
 * ```example
 * <ThemeProvider>
 *   <Pill label="Important message" color="primary" />
 *   <Pill label="A warning" color="warn">
 * </ThemeProvider>
 * ```
 */
const Pill = ({ color = 'primary', label, ...props }) => {
  return (
    <Theme>
      {({ colorize }) => (
        <View {...styles(colorize(color))} {...props}>
          <Text size="s" color="textOnBackground" strong>
            {label}
          </Text>
        </View>
      )}
    </Theme>
  )
}

Pill.propTypes = {
  /** Text that shows on the pill **/
  label: PropTypes.string.isRequired,
  /** Themed color of the pill **/
  color: PropTypes.string,
}

export default Pill
