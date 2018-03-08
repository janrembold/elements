import React from 'react'
import PropTypes from 'prop-types'

import View from '../../atoms/View'
import { css } from 'glamor'

const styles = {
  container: css({
    padding: 15,
    position: 'relative',
  }),
}

const DialogContent = ({ children, ...props }) => (
  <View {...styles.container} {...props}>
    {children}
  </View>
)

DialogContent.propTypes = {
  children: PropTypes.node,
}

export default DialogContent
