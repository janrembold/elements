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
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
}

export default Pill
