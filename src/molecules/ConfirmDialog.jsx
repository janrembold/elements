import React from 'react'
import { css } from 'glamor'
import CardButton from './Card/CardButton'
import CardFooter from './Card/CardFooter'
import Text from '../atoms/Text'
import View from '../atoms/View'
import PropTypes from 'prop-types'
import { ColorPalette } from '@allthings/colors'

const styles = {
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
    acceptButtonLabel: PropTypes.string.isRequired,
    cancelButtonLabel: PropTypes.string.isRequired,
    message: PropTypes.node.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    resolveAndClean: PropTypes.func.isRequired,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
    document.addEventListener('touchstart', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
    document.addEventListener('touchstart', this.handleClickOutside)
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  handleClickOutside = event =>
    this.wrapperRef &&
    !this.wrapperRef.contains(event.target) &&
    this.props.resolveAndClean(false)

  render() {
    const {
      acceptButtonLabel,
      cancelButtonLabel,
      message,
      onCancel,
      onSuccess,
    } = this.props

    return (
      <View direction="row" alignV="center" alignH="center" {...styles.wrapper}>
        <div {...styles.insideView} ref={this.setWrapperRef}>
          <Text color={ColorPalette.lightBlack} {...styles.text}>
            {message}
          </Text>
          <CardFooter>
            <CardButton
              backgroundColor={ColorPalette.white}
              color={ColorPalette.greyIntense}
              onClick={onCancel}
            >
              <Text>{cancelButtonLabel}</Text>
            </CardButton>
            <CardButton
              backgroundColor={ColorPalette.white}
              color={ColorPalette.greyIntense}
              onClick={onSuccess}
            >
              <Text>{acceptButtonLabel}</Text>
            </CardButton>
          </CardFooter>
        </div>
      </View>
    )
  }
}

export default ConfirmDialog
