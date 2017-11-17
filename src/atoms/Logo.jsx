import PropTypes from 'prop-types'
import React from 'react'
import Image from './Image'
import View from '../atoms/View'

/**
 * The Allthings logo
 *
 * ```example
 * <ThemeProvider>
 *  <View style={{ background: '#bada55', padding: 15 }}>
 *    <Relative>
 *      <Logo size={80} onClick={this.handleClick} />
 *      <CountIndicator top="55" left="50" count={this.state.count} />
 *    </Relative>
 *  </View>
 *</ThemeProvider>
 */
class Logo extends React.Component {
  static propTypes = {
    /** Callback when user clicks the logo */
    onClick: PropTypes.func,
    /** Size of the number in pixels */
    size: PropTypes.number,
  }

  render() {
    const { height, width } = {
      height: 'auto', // 219
      width: this.props.size, // 187
    }

    return (
      <View style={{ height, width }} onClick={this.props.onClick}>
        <Image
          height="100%"
          width="100%"
          src="/static/img/allthings-logo.svg"
          alt="Allthings"
        />
      </View>
    )
  }
}

export default Logo
