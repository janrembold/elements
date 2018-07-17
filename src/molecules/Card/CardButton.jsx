import PropTypes from 'prop-types'
import React from 'react'
import View from '../../atoms/View'
import { css } from 'glamor'
import { color, lightness } from 'kewler'
import Theme from '../../behaviour/Theme'

const style = backgroundColor =>
  css({
    border: 'none',
    backgroundColor,
    overflow: 'visible',
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    WebkitFontSmoothing: 'inherit',
    MozOsxFontSmoothing: 'inherit',
    WebkitAppearance: 'none',
    transition: 'background 500ms ease-in-out',
    ':hover': {
      cursor: 'pointer',
      background: color(backgroundColor, lightness(-10)),
    },
  })

/**
 * CardButton can to enable users to do actions directly related to content on
 * on cards. It should always go into a [CardFooter](CardFooter.md).
 */
export default function CardButton({
  children,
  onClick = noop => noop,
  backgroundColor = '#ffffff',
  type = 'button',
  ...props
}) {
  return (
    <Theme>
      {({ colorize }) => (
        <View
          htmlElement="button"
          type={type}
          alignH="center"
          flex="flex"
          alignV="center"
          direction="row"
          onClick={onClick}
          {...style(colorize(backgroundColor))}
          {...props}
        >
          {children}
        </View>
      )}
    </Theme>
  )
}

CardButton.propTypes = {
  children: PropTypes.node,
  /** Callback when button is clicked **/
  onClick: PropTypes.func,
  /** Color of the button **/
  backgroundColor: PropTypes.string,
  /** Form action to trigger when button is clicked **/
  type: PropTypes.oneOf(['submit', 'reset', 'button']),
}
