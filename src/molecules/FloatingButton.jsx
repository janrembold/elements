import React from 'react'
import Absolute from '../atoms/Absolute'
import { withTheme } from '../behaviour/ThemeProvider'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import View from '../atoms/View'

const buttonStyle = css({
  width: '100%',
  display: 'flex',
  alignItem: 'center',
  justifyContent: 'center',
  height: '100%',
  background: 'transparent',
  border: 0,
})

const availableSizes = {
  xs: 30,
  s: 40,
  m: 50,
  l: 60,
  xl: 70,
}

class FloatingButton extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    disabledColor: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['xs', 's', 'm', 'l', 'xl']),
  }

  static defaultProps = {
    size: 'l',
  }

  render() {
    const { color, disabled, disabledColor, size, ...props } = this.props
    return (
      <View>
        <View style={{ height: availableSizes[size] }} />
        <Absolute
          alignH="center"
          alignV="center"
          bottom={0}
          direction="row"
          flex="flex"
          {...css({
            backgroundColor: disabled ? disabledColor : color,
            boxShadow: '0px -2px 10px 0px rgba(0, 0, 0, 0.2)',
            height: availableSizes[size],
            overflow: 'hidden',
            width: '100%',
          })}
        >
          <button {...buttonStyle} {...props} {...css({cursor: disabled ? 'default' : 'pointer'})} />
        </Absolute>
      </View>
    )
  }
}

const mapThemeToProps = theme => ({
  color: theme.primary,
  disabledColor: 'lightGray',
})

export default withTheme(mapThemeToProps)(FloatingButton)
