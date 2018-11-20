import React from 'react'
import View from '../atoms/View'
import { css } from 'glamor'
import Theme from '../behaviour/Theme'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import Button from './Button'
import { Motion, spring } from 'react-motion'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { withTheme } from '../behaviour/ThemeProvider'

const styles = {
  button: css({ width: '50%' }),
  cancelButton: css({
    border: '1px solid #e7ecee',
  }),
  insideView: css({
    backgroundColor: '#fff',
    maxWidth: '300px',
  }),
  text: css({
    textAlign: 'center',
    padding: '15px',
  }),
  view: css({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }),
}

class ConfirmDialog extends React.Component {
  static propTypes = {
    color: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children, onCancel, onSuccess, textColor } = this.props
    return (
      <Theme>
        {({ colorize }) => (
          <View
            direction="row"
            alignV="center"
            alignH="center"
            {...styles.view}
          >
            <View {...styles.insideView}>
              <Text {...styles.text}>{children}</Text>

              <View alignH="center" flex="flex" alignV="center" direction="row">
                <Button
                  backgroundColor="rgba(0,0,0,0)"
                  color={textColor}
                  onClick={onCancel}
                  {...styles.button}
                  {...styles.cancelButton}
                >
                  Cancel
                </Button>
                <Button onClick={onSuccess} {...styles.button}>
                  Ok
                </Button>
              </View>
            </View>
          </View>
        )}
      </Theme>
    )
  }
}

const mapThemeToProps = (theme, props) => ({
  primary: theme.primary,
  secondaryText: theme.secondaryText,
  textColor: theme.text,
  textOnBackground: theme.textOnBackground,
  buttonColor: props.backgroundColor || theme.primary,
})

export default withTheme(mapThemeToProps)(ConfirmDialog)
