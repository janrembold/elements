import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import View from '../../atoms/View'
import { css } from 'glamor'


const styles = {
    dialog: active =>
      css({
        position: 'absolute',
        left: 0,
        right: 0,
        width: '-moz-fit-content',
        width: '-webkit-fit-content',
        width: 'fit-content',
        height: '-moz-fit-content',
        height: '-webkit-fit-content',
        height: 'fit-content',
        margin: 'auto',
        background: 'white',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        // display: active ? 'block' : 'none',
        marginTop: active ? 30 : 0,
        opacity:  active ? 1 : 0,
        transition: 'all .225s ease-out',
      }),
    backdrop: active =>
      css({
        position: 'fixed',
        zIndex: 9998,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'rgba(0,0,0,0.6)',
        display: active ? 'block' : 'none',
        opacity:  active ? 1 : 0,
        transition: 'all .75s ease-out',
      }),
}


/**
 * Dialogs can be used to show relevant content in a modal
 *
 * ```example
 * <Dialog>
 *  <DialogTitle>
 *
 *  </DialogTitle>
 *  <DialogContent>
 *    <Text size="xl" strong>
 *      Cards
 *    </Text>
 *    <Text>
 *      Cards are the basic elements to fit content in. They can may
 *      contain any kind of content.
 *    </Text>
 *  </DialogContent>
 *  <DialogFooter>
 *
 *  </DialogFooter>
 * </Dialog>
 * ```
 */
class Dialog extends React.Component {
  static propTypes = {
    /** True to make it active */
    active: PropTypes.bool,
    waitForTransitionEnd: true,
  }
  state = {
    active: this.props.active,
  }
  static defaultProps = {
    active: false,
  }

  handleClose = () => this.setState({ active: false, waitForTransitionEnd: true })

  handleTransitionEnd = (active) => {
    if (this.state.waitForTransitionEnd) {
      console.log(this.state.waitForTransitionEnd)
      this.setState({ waitForTransitionEnd: false })
    }
    // we need to 'display: none' the backdrop and the dialog AFTER the css transition finished
    // we need to 'display: block' the backdrop and the dialog BEFORE the css transition begins
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active })
  }

  render() {
    const { children, ...props } = this.props
    const { active } = this.state
    return (
      <Fragment>
        <View {...styles.dialog(active)} {...props} onTransitionEnd={this.handleTransitionEnd(active)}>
          {children}
        </View>
        <View {...styles.backdrop(active)} onClick={this.handleClose} onTransitionEnd={this.handleTransitionEnd(active)} />
      </Fragment>
    )
  }
}

export default Dialog
