import React from 'react'
import PropTypes from 'prop-types'

import View from '../../atoms/View'
import { css } from 'glamor'

const styles = {
  title: padding =>
    css({
      padding: padding ? padding : '15px 15px 0 15px',
      position: 'relative',
    }),
}

class DialogTitle extends React.Component {
  static propTypes = {
    /** True to make it active */
    padding: PropTypes.string,
    children: PropTypes.node,
  }
  static defaultProps = {
    padding: false,
  }
  render() {
    const { children, ...props } = this.props
    return (
      <View {...styles.title(...props.padding)} {...props}>
        {children}
      </View>
    )
  }
}

export default DialogTitle
