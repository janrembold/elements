import React from 'react'
import PropTypes from 'prop-types'

import View from '../../atoms/View'
import { css } from 'glamor'

const styles = {
  container: css({
    position: 'relative',
  }),
}

const DialogTitle = ({ children, ...props }) => (
  <View {...styles.container} {...props}>
    {children}
  </View>
)

DialogTitle.propTypes = {
  children: PropTypes.node,
}

export default DialogTitle
