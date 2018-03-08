import PropTypes from 'prop-types'
import React from 'react'
import { css } from 'glamor'
import View from '../../atoms/View'

const styles = {
  footer: padding =>
    css({
      padding: padding ? padding : 15,
      borderTop: '1px solid #e7ecee',
      '> *': {
        marginLeft: 10,
      },
    }),
}

class DialogFooter extends React.Component {
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
      <View direction="row" alignV="center" alignH="end" {...styles.footer(...props.padding)}>
        {children}
      </View>
    )
  }
}

export default DialogFooter
