import PropTypes from 'prop-types'
import React from 'react'
import View from '../../atoms/View'
import { css } from 'glamor'
import { between } from './utils/math'

import ExpandingTextarea from '../ExpandingTextarea'
import Text from '../../atoms/Text'

import CardButton from './CardButton'
import CardFooter from './CardFooter'

const styles = {
  wrapper: css({
    position: 'absolute',
    left: 0,
    boxShadow: '0 0 0 99999px rgba(0,0,0,0.5)',
    width: '100%',
    zIndex: 2,
    background: '#fff',
  }),
}

export default class PostEditor extends React.Component {
  static propTypes = {
    initialText: PropTypes.string,
    confirmText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    submitText: PropTypes.string.isRequired,
    onSave: PropTypes.func.isRequired,
    onRequestClose: PropTypes.func,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)

    this.state = {
      text: props.initialText,
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClick, true)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, true)
  }

  isOutsideElement = ({ x, y }, { top, bottom, left, right }) => {
    return !between(y, top, bottom) || !between(x, left, right)
  }

  handleClick = e => {
    const { bottom, left, right, top } = this.element.getBoundingClientRect()
    if (
      this.isOutsideElement(
        { x: e.clientX, y: e.clientY },
        { bottom, left, right, top }
      )
    ) {
        e.stopPropagation()
        this.triggerClose()
        return false
      }
    
  }

  setElement = element => (this.element = element)

  triggerClose = () => {
    if (
      !this.state.text ||
      (this.state.text && window.confirm(this.props.confirmText))
    ) {
      this.props.onRequestClose && this.props.onRequestClose()
    }
  }

  handleSave = e => this.props.onSave(this.state.text)

  handleChange = e => {
    const text = e.target.value
    this.setState(() => ({ text }))
  }

  render() {
    console.log("from elements new")
    return (
      <View onRef={this.setElement} {...css(styles.wrapper)}>
        <View {...css({ padding: 15 })}>
          <ExpandingTextarea
            value={this.state.text}
            onChange={this.handleChange}
            style={{ padding: 0, color: '#333' }}
            autoFocus
          />
        </View>
        <CardFooter>
          <CardButton onClick={this.triggerClose}>
            <Text size="m" color="#626262">
              {this.props.cancelText}
            </Text>
          </CardButton>
          <CardButton onClick={this.handleSave}>
            <Text size="m" color="#626262">
              {this.props.submitText}
            </Text>
          </CardButton>
        </CardFooter>
      </View>
    )
  }
}
