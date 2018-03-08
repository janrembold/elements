import PropTypes from 'prop-types'
import React from 'react'
import { css } from 'glamor'
import View from '../../atoms/View'

const style = css({
  borderTop: '1px solid #e7ecee',
  '> *': {
    padding: '10px 13px',
    textAlign: 'center',
  },
  '> :not(:last-child)': {
    borderRight: '1px solid #e7ecee',
  },
})

export default function DialogFooter({ children }) {
  return (
    <View direction="row" alignV="center" alignH="space-around" {...style}>
      {children}
    </View>
  )
}

DialogFooter.propTypes = {
  children: PropTypes.node,
}
