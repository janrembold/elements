import React from 'react'
import PropTypes from 'prop-types'
import View from '../atoms/View'
import { css } from 'glamor'
import { color } from '../propTypes/color'
import { createMQ } from '../behaviour/Responsive'
import { Motion, spring } from 'react-motion'
import Theme from '../behaviour/Theme'

const simple = backgroundColor =>
  css({
    WebkitOverflowScrolling: 'touch',
    overflow: 'auto',
    overflowX: 'hidden',
    backgroundColor,
    height: '100%',
  })

const paddedCss = (paddedVertical, paddedHorizontal, additionalPaddingTop) =>
  css({
    [createMQ('tablet', 'desktop')]: {
      paddingLeft: paddedHorizontal && '25px',
      paddingRight: paddedHorizontal && '25px',
      paddingTop: paddedVertical
        ? `calc(25px + ${additionalPaddingTop}px)`
        : additionalPaddingTop,
      paddingBottom: paddedVertical && '25px',
    },
  })

class SimpleLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    backgroundColor: color,
    follow: PropTypes.bool,
    padded: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['horizontal', 'vertical']),
    ]),
    onScrollEnd: PropTypes.func,
    onPullDown: PropTypes.func,
  }

  static defaultProps = {
    backgroundColor: 'background',
  }

  state = {
    pullDownOffset: 0,
  }

  trigger = true
  scrollTop = 0
  pullDown = false

  handleScroll = e => {
    e.preventDefault()
    this.scrollTop = e.target.scrollTop
    if (this.props.onScrollEnd) {
      const element = e.target
      const thresholdReached =
        element.scrollTop + element.clientHeight + 75 > element.scrollHeight

      // Trigger the callback with a tolerance of 75 px.
      if (thresholdReached) {
        if (this.trigger) {
          this.props.onScrollEnd()
          this.trigger = false
        }
      } else {
        this.trigger = true
      }
    }
  }

  handleTouchStart = e => {
    if (this.props.onPullDown && this.scrollTop === 0) {
      this.pullDown = false
      this.setState({ pullDownOffset: 0 })
    }
  }

  handleTouchMove = event => {
    if (this.props.onPullDown && this.scrollTop === 0) {
      let y = 0
      const touches =
        event.touches && event.touches.length ? event.touches : [event]
      const e = (event.changedTouches && event.changedTouches[0]) || touches[0]
      if (e) {
        y = e.clientY || e.pageY || 0
      }
      if (this.pullDown && y > this.pullDown) {
        this.setState({
          pullDownOffset: Math.min(Math.abs(this.pullDown - y), 60),
        })
      } else {
        this.pullDown = y
      }
    }
  }

  handleTouchEnd = e => {
    if (this.state.pullDownOffset === 60) {
      this.props.onPullDown()
    }
    if (this.props.onPullDown && this.scrollTop === 0) {
      this.pullDown = false
      this.setState({ pullDownOffset: 0 })
    }
  }

  render() {
    const { children, backgroundColor, padded, ...props } = this.props

    return (
      <Theme>
        {({ colorize }) => (
          <Motion
            defaultStyle={{ x: 0 }}
            style={{ x: spring(this.state.pullDownOffset) }}
          >
            {value => (
              <View
                direction="column"
                flex="flex"
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
                {...simple(colorize(backgroundColor))}
                {...paddedCss(
                  padded === true || padded === 'vertical',
                  padded === true || padded === 'horizontal',
                  value.x
                )}
                onScroll={this.handleScroll}
                // for e2e-tests, to scroll down on pages (id is taken for cross browser selector compat)
                id="scroll-container"
                {...props}
              >
                {children}
              </View>
            )}
          </Motion>
        )}
      </Theme>
    )
  }
}

export default SimpleLayout
