import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

const styles = {
  wrapper: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    minHeight: '100vh',
    left: 0,
    top: 0,
    background: '#efefef',
    fontSmooth: 'auto',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'auto',
  }),

  mobileView: css({
    width: 320,
    height: 568,
    boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.15)',
    background: '#f0f2f5',
    marginTop: 40,
    overflow: 'auto',
    position: 'relative',
  }),
}

export class Viewport extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  state = {
    width: 320,
    height: 630,
    padding: false,
    shiftPressed: false,
  }

  togglePadding = () => this.setState(({ padding }) => ({ padding: !padding }))

  setWidth = e => {
    const width = +e.target.value
    this.setState(() => ({ width }))
  }
  setHeight = e => {
    const height = +e.target.value
    this.setState(() => ({ height }))
  }

  setShiftPressed = e => {
    const { shiftKey } = e
    if (
      (!this.state.shiftPressed && shiftKey) ||
      (this.state.shiftPressed && !shiftKey)
    ) {
      this.setState(() => ({ shiftPressed: shiftKey }))
    }
  }

  render() {
    const { width, height } = this.state

    return (
      <div {...styles.wrapper}>
        <div {...css({ flexDirection: 'row' })}>
          <input
            type="number"
            style={{ width: 40 }}
            value={width}
            step={this.state.shiftPressed ? 10 : 1}
            onChange={this.setWidth}
            onKeyDown={this.setShiftPressed}
            onKeyUp={this.setShiftPressed}
          />
          <span>⨉</span>
          <input
            type="number"
            style={{ width: 40 }}
            value={height}
            step={this.state.shiftPressed ? 10 : 1}
            onChange={this.setHeight}
            onKeyDown={this.setShiftPressed}
            onKeyUp={this.setShiftPressed}
          />
          <label>
            <input type="checkbox" onClick={this.togglePadding} /> With padding?
          </label>
        </div>
        <div
          {...css(styles.mobileView, { padding: this.state.padding && 20 })}
          style={{ width, height }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default function createViewportDecorator() {
  return story => <Viewport>{story()}</Viewport>
}
