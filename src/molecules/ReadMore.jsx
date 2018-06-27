import PropTypes from 'prop-types'
import React from 'react'
import { css } from 'glamor'
import { View, Text } from '../'
import { ColorPalette, alpha } from '@allthings/colors'

/**
 *   A ReadMore is a simple container, to show / hide content
 * ```example

 *  ```
 **/

class ReadMore extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    initiallyCollapsed: PropTypes.bool,
    readMoreLabel: PropTypes.string,
    readLessLabel: PropTypes.string,
    toggleCallback: PropTypes.func,
  }

  static defaultProps = {
    initiallyCollapsed: true,
    readMoreLabel: 'Read more...',
    showLessLabel: 'Show Less...',
    toggleCallback: () => {},
  }

  state = { collapsed: this.props.initiallyCollapsed }

  componentDidMount() {
    if (this.childRef.current) {
      if (!this.props.initiallyCollapsed) {
        this.childRef.current.style.height = `${
          this.childRef.current.scrollHeight
        }px`
      } else {
        this.childRef.current.style.height = `20vh`
      }
    }
  }

  childRef = React.createRef()

  toggleCollapse = () => {
    const { current } = this.childRef
    if (current.style.height !== '20vh') {
      current.style.height = '20vh'
      this.setState({ collapsed: true })
      // signal new state for the parent
      this.props.toggleCallback(true)
    } else {
      current.style.height = `${current.scrollHeight}px`
      this.setState({ collapsed: false })
      // signal new state for the parent
      this.props.toggleCallback(false)
    }
  }

  onKeyPress = e => e.key === 'Enter' && this.toggleCollapse()

  render() {
    const { children, readMoreLabel, showLessLabel } = this.props
    return (
      <View
        direction="column"
        {...css({
          width: '100%',
        })}
      >
        {/* Child */}
        <View
          onRef={this.childRef}
          {...css({
            transitionProperty: 'height',
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            overflow: 'hidden',
            transformOrigin: 'top',
          })}
        >
          {children}
        </View>
        <View
          onClick={this.toggleCollapse}
          {...css({
            paddingTop: this.state.collapsed ? 35 : 10,
            marginTop: this.state.collapsed ? -30 : 0,
            background: 'transparent',
            background: `-moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 57%, rgba(255,255,255,1) 100%)`,
            background: `-webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 57%,rgba(255,255,255,1) 100%)`,
            background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 57%,rgba(255,255,255,1) 100%)`,
          })}
        >
          <Text size="xs">
            {this.state.collapsed ? readMoreLabel : showLessLabel}
          </Text>
        </View>
      </View>
    )
  }
}

export default ReadMore
