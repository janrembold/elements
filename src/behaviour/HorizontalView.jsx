import React from 'react'
import PropTypes from 'prop-types'
import View from '../atoms/View'
import { css } from 'glamor'

/**
 * HorizontalView is used to Views in a horizontal row, and will do smooth transitions between them.
 * The HorizontalView will always show the latest item that get's passed in as a children.
 *
 * So for this, it will only show the SecondItem.
 * ```
 * <HorizontalView>
 *  <FirstItem />
 *  <SecondItem />
 * </HorizontalView>
 * ```
 *
 * To do transitions between the items, you just *pass* in or *remove children*. So if we update the previous example
 * to be like this, it will transition from the SecondItem to the FirstItem:
 *
 * ```
 * <HorizontalView>
 *  <FirstItem />
 * </HorizontalView>
 * ```
 *
 * ## Using with React Router
 * The HorizontalView can work perfectly together with React Router. It will allow you
 * to have smooth transition from one Route to another.
 *
 * ### Example
 * We are building a taco app, because everyone likes tacos. It consists of 3 screens:
 * An overview of all available tacos (/tacos), a taco detail page (/tacos/:id) and a list of dips for that are
 * a good fit with that taco (/tacos/:id/dips).
 *
 * If you go to `/tacos` only the first route will be matched, the `TacoList` will render.
 * Now you click a link in the `TacosList` it will bring you to `/tacos/8343`. React Router will
 * render `TacosList` and `TacosDetail` and HorizontalView do a smooth transition from `TacosList` to
 * `TacosDetail`.
 *
 * ```
 * <HorizontalView>
 *  <Route path="/tacos" component={TacosList}/>
 *  <Route path="/tacos/:id" component={TacosDetail}/>
 *  <Route path="/tacos/:id/dips" component={TacosDipsView}/>
 * </HorizontalView>
 * ```
 **/
class HorizontalView extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
  }

  constructor(props, context) {
    super(props, context)

    const children = props.children
    const currentChild = children.length

    this.state = {
      children,
      currentChild,
      nextChildren: null,
      waitForTransitionEnd: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const oldChildren = this.props.children
    const nextChildren = nextProps.children

    if (nextChildren.length < oldChildren.length) {
      this.setState({
        nextChildren,
        waitForTransitionEnd: true,
        currentChild: nextChildren.length,
      })
    } else {
      this.setState({
        children: nextChildren,
        currentChild: nextChildren.length,
      })
    }
  }

  handleTransitionEnd = () => {
    if (this.state.waitForTransitionEnd) {
      this.setState({
        children: this.state.nextChildren,
        nextChildren: null,
        waitForTransitionEnd: false,
      })
    }
  }

  render() {
    const { currentChild, children } = this.state
    const { children: propsChildren, ...props } = this.props
    const translateX = (currentChild - 1) * -100

    return (
      <View
        direction="row"
        flex="flex"
        {...css({
          transform: `translate3d(${translateX}%, 0, 0)`,
          transition: '.5s',
        })}
        onTransitionEnd={this.handleTransitionEnd}
        {...props}
      >
        {children.map((child, i) => (
          <View
            // eslint-disable-next-line
            key={i}
            {...css({ width: '100%' })}
            flex="none"
            direction="column"
          >
            {child}
          </View>
        ))}
      </View>
    )
  }
}

export default HorizontalView
