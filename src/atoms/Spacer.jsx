import React from 'react'
import PropTypes from 'prop-types'
import View from '../atoms/View'
import { css } from 'glamor'

const Spacer = ({ height = 10, background }) => (
 <View {...css({ width: '100%', height, background })} />
)

Spacer.propTypes = {
  height: PropTypes.number,
  background: PropTypes.string,
}

export default Spacer
