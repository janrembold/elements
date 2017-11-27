import React from 'react'
import PropTypes from 'prop-types'
import View from '../atoms/View'
import { css } from 'glamor'

/**
 * The vertical spacer is used to visually separate or create space between elements.
 */
const Spacer = ({ height = 10, background }) => (
 <View {...css({ width: '100%', height, background })} />
)

Spacer.propTypes = {
  /** The height of space it should create **/
  height: PropTypes.number,
  /** Background color, default will be transparent **/
  background: PropTypes.string,
}

export default Spacer
