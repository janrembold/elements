import React from 'react'
import View from '../atoms/View'
import mitt from 'mitt'
import NotificationBubble from '../molecules/NotificationBubble'
import PropTypes from 'prop-types'
import Message from './Message'

const emitter = mitt()

const send = (message, type) => {
  emitter.emit(type, message)
}

export const sendSuccess = message => send(message, 'success')
export const sendWarning = message => send(message, 'warning')
export const sendInfo = message => send(message, 'info')

class NotificationBubbleManager extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    renderBubble: PropTypes.func,
  }

  state = {
    messages: [],
  }

  componentDidMount() {
    emitter.on('*', this.handleEvent)
  }

  componentWillUnmount() {
    emitter.off('*', this.handleEvent)
  }

  handleEvent = (type, message) =>
    this.setState(({ messages }) => ({
      messages: [...messages, new Message(type, message)],
    }))

  handleTimeout = () =>
    this.setState(({ messages }) => ({ messages: messages.slice(1) }))

  renderBubble = message =>
    this.props.renderBubble ? (
      this.props.renderBubble({
        key: message.id,
        onTimeout: this.handleTimeout,
        children: message.text,
      })
    ) : (
      <NotificationBubble key={message.id} onTimeout={this.handleTimeout}>
        {message.text}
      </NotificationBubble>
    )

  render() {
    const { children, renderBubble, ...props } = this.props
    const message = this.state.messages[0]

    return (
      <View {...props}>
        {message && this.renderBubble(message)}
        {children}
      </View>
    )
  }
}

export default NotificationBubbleManager
