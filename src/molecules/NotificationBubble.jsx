import React from 'react'
import View from '../atoms/View'
import { css } from 'glamor'
import Theme from '../behaviour/Theme'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import { Motion, spring } from 'react-motion'
import PropTypes from 'prop-types'

const styles = {
  bubble: css({
    zIndex: 200,
    position: 'fixed',
    bottom: 50,
    left: '50%',
    transform: 'translate(-50%, 0)',
    margin: '0 auto',
    width: 260,
    height: 68,
    borderRadius: 45,
    boxShadow: '2px 2px 14px 1px rgba(35,35,35,0.2)',
  }),
  text: css({
    width: 200,
    marginLeft: 20,
  }),
}

/**
 * NotificationBubbles are used to inform users about important
 * information, when an action has failed or succeeded. They're a most
 * prominent ways to communicate to merchants. NotificationBubbles are
 * always visible and pop up at the bottom of a page.
 *
 * ## Best practises
 * - Do use them when you otherwise users won't have any feedback.
 * - Don't use them extensive.
 * - Don't use them when no feedback is required.
 *
 * To use NotificationBubbles you need to wrap the **NotificationBubbleManager** around your app.
 * Use `sendSuccess()` exported by the NotificationBubbleManager to show a Notification.
 *
 * ```example
 * import NotificationBubbleManager, { sendSuccess } from '@allthings/elements/behaviour/NotificationBubbleManager'
 * import { Button } from '@allthings/elements'
 *
 * const ShowNotification = () => (
 *   <NotificationBubbleManager>
 *     <View>
 *       <Button onClick={() => sendSuccess('Congratulations, you clicked the Button')}>
 *         Click me!
 *       </Button>
 *     </View>
 *   </NotificationBubbleManager>
 * )
 * ```
 *
 */
class NotificationBubble extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onTimeout: PropTypes.func.isRequired,
  }

  state = {
    visible: true,
  }

  static defaultProps = {
    color: 'primary',
    onTimeout: _ => _,
  }

  componentDidMount() {
    setTimeout(
      () => this.setState({ visible: false }),
      2750
    )
  }

  handleRest = () => this.state.visible === false && this.props.onTimeout()

  render() {
    const { color, onTimeout, ...props } = this.props
    return (
      <Theme>
        {({ colorize }) => (
          <Motion
            defaultStyle={{ position: -50 }}
            onRest={this.handleRest}
            style={{
              position: spring(this.state.visible ? 50 : -100, {
                stiffness: 180,
                damping: 12,
              }),
            }}
          >
            {style => (
              <View {...styles.container} {...props}>
                <View
                  {...styles.bubble}
                  style={{
                    backgroundColor: colorize(color),
                    bottom: style.position,
                  }}
                  direction="row"
                  alignV="center"
                >
                  <View flex={70} direction="row" {...styles.text}>
                    <Text
                      color="textOnBackground"
                      align="center"
                      autoBreak
                      style={{ width: '100%' }}
                    >
                      {this.props.children}
                    </Text>
                  </View>
                  <View
                    flex={30}
                    alignH="center"
                    alignV="center"
                    direction="row"
                  >
                    <Icon name="check-filled" color="white" />
                  </View>
                </View>
              </View>
            )}
          </Motion>
        )}
      </Theme>
    )
  }
}

export default NotificationBubble
