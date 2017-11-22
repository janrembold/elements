import PropTypes from 'prop-types'
import React from 'react'
import View from '../../atoms/View'
import { css } from 'glamor'
import { color, lightness } from 'kewler'

const style = backgroundColor =>
  css({
    backgroundColor,
    transition: '500ms ease-in-out',
    ':hover': {
      cursor: 'pointer',
      background: color(backgroundColor, lightness(-10)),
    },
  })

export default function CardButton({
  children,
  onClick = noop => noop,
  backgroundColor = '#ffffff',
  ...props
}) {
  return (
    <View
      alignH="center"
      flex="flex"
      alignV="center"
      direction="row"
      onClick={onClick}
      {...style(backgroundColor)}
      {...props}
    >
      {children}
    </View>
  )
}

CardButton.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  backgroundColor: PropTypes.string,
}
