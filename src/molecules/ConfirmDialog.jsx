import React from 'react'
import { css } from 'glamor'
import Button from './Button'
import Text from '../atoms/Text'
import View from '../atoms/View'
import PropTypes from 'prop-types'
import { ColorPalette } from '@allthings/colors'

const styles = {
  button: css({
    width: '50%',
    border: '1px solid #e7ecee !important',
  }),
  insideView: css({
    backgroundColor: '#fff',
    borderRadius: '3px',
    maxWidth: '500px',
  }),
  text: css({
    textAlign: 'center',
    padding: '25px',
  }),
  wrapper: css({
    position: 'fixed',
    top: -100,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  }),
}

class ConfirmDialog extends React.Component {
  static propTypes = {
    accept: PropTypes.string,
    cancel: PropTypes.string,
    message: PropTypes.node.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
  }

  state = {
    cancelMessage: this.props.cancel || 'Cancel',
    acceptMessage: this.props.accept || 'OK',
  }

  render() {
    const { message, onCancel, onSuccess } = this.props
    const { acceptMessage, cancelMessage } = this.state

    return (
      <View direction="row" alignV="center" alignH="center" {...styles.wrapper}>
        <View {...styles.insideView}>
          <Text color={ColorPalette.lightBlack} {...styles.text}>
            {message}
          </Text>
          <View alignH="center" flex="flex" alignV="center" direction="row">
            <Button
              backgroundColor={ColorPalette.white}
              color={ColorPalette.greyIntense}
              onClick={onCancel}
              {...styles.button}
            >
              {cancelMessage}
            </Button>
            <Button
              backgroundColor={ColorPalette.white}
              color={ColorPalette.greyIntense}
              onClick={onSuccess}
              {...styles.button}
            >
              {acceptMessage}
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

export default ConfirmDialog
