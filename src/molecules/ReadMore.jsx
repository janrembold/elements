import PropTypes from 'prop-types'
import React from 'react'
import { css } from 'glamor'
import { View, Text } from '../'

/**
 *   A ReadMore is a simple container, to show / (hide) content. It will automatically decide whether to show the `read more` link or not.
 * ```example
<Card>
  <ListItem>
    <ReadMore>
      <Text>Testing a short text...</Text>
    </ReadMore>
  </ListItem>
  <ListItem>
    <ReadMore>
      <Text>
        Testing a longer text with a defaultHeight 80vw! Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Maecenas
        dignissim sem in elit mollis consequat. Suspendisse potenti.
        Maecenas a velit vel dolor mollis viverra. Praesent ex diam,
        ultricies ac ultricies ut, efficitur sit amet leo. Vivamus ex
        ante, dapibus a elementum vel, ultrices in erat. Vestibulum
        eget ante turpis. Donec dapibus, purus vel euismod egestas,
        arcu ipsum.
      </Text>
    </ReadMore>
  </ListItem>
</Card>
 *  ```
 **/

class ReadMore extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    initiallyCollapsed: PropTypes.bool,
    readMoreLabel: PropTypes.string,
    defaultHeight: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
    threshold: PropTypes.number,
    onToggle: PropTypes.func,
  }

  static defaultProps = {
    initiallyCollapsed: true,
    readMoreLabel: 'Read more...',
    defaultHeight: '20vh',
    threshold: 0, // We fance a treshold value of 80 very often...
    onToggle: () => {},
  }

  state = { collapsed: this.props.initiallyCollapsed }

  componentDidMount() {
    this.toggleCollapseLink()
    window.addEventListener('resize', this.toggleCollapseLink)

    // @todo: We should watch here for Dom changes and trigger the collapse ALSO
    // on DOM changes - see -> https://github.com/jcgertig/react-mutation-observer
    // -
    // Especially stuff like dangerouslySetInnerHTML is of course NOT triggering
    // collapse correctly (it's simply not handled by the react lifecycle)
    // -> https://stackoverflow.com/questions/44550462/reactjs-callback-for-dangerouslysetinnerhtml-complete
    // -
    // I'm not sure about the right place for this functionality tho since it's
    // maybe better to be implemented into the mother component? Or maybe provide
    // a withObserver method?
    if(window.MutationObserver){
      const { current } = this.childRef
      this.observer = new MutationObserver(this.toggleCollapseLink)
      this.observer.observe(current, {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: true,
        attributeOldValue: false,
        characterDataOldValue: false,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.toggleCollapseLink)
    if(window.MutationObserver){
      this.observer.disconnect()
    }
  }

  childRef = React.createRef()
  observer = null

  toggleCollapse = () => {
    const { current } = this.childRef
    if (!this.state.collapsed) {
      current.style.height = this.props.defaultHeight
      this.setState({ collapsed: true })
      // signal new state for the parent
      this.props.onToggle(true)
    } else {
      current.style.height = `${current.scrollHeight}px`
      this.setState({ collapsed: false })
      // signal new state for the parent
      this.props.onToggle(false)
    }
  }

  toggleCollapseLink = () => {
    const { current } = this.childRef

    let defaultWrapperHeight = 0
    const elHeight = current.scrollHeight

    // Let's check for viewport dimensions in here and convert them to px...
    const regex = /(vw|vh)$/
    if (regex.test(this.props.defaultHeight)) {
      if (this.props.defaultHeight.match(/(vh)/)) {
        defaultWrapperHeight =
          (window.innerHeight / 100) *
          parseInt(this.props.defaultHeight.replace(regex, ''))
      }
      if (this.props.defaultHeight.match(/(vw)/)) {
        defaultWrapperHeight =
          (window.innerWidth / 100) *
          parseInt(this.props.defaultHeight.replace(regex, ''))
      }
    } else {
      defaultWrapperHeight = this.props.defaultHeight
    }
    defaultWrapperHeight = defaultWrapperHeight + this.props.threshold

    // Let's check whether we should show the Read More link or not
    if (elHeight < defaultWrapperHeight) {
      current.style.height = `${elHeight}px`
      this.props.onToggle(false)
      this.setState({ collapsed: false })
    } else {
      current.style.height = `${defaultWrapperHeight}px`
      this.props.onToggle(true)
      this.setState({ collapsed: true })
    }
  }

  render() {
    const { children, readMoreLabel } = this.props
    return (
      <View
        direction="column"
        {...css({
          width: '100%',
        })}
      >
        {/* Child */}
        <View
          onRef={this.childRef}
          {...css({
            transitionProperty: 'height',
            transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            overflow: 'hidden',
            transformOrigin: 'top',
          })}
        >
          {children}
        </View>
        {this.state.collapsed && (
          <View
            onClick={this.toggleCollapse}
            {...css({
              cursor: 'pointer',
              paddingTop: this.state.collapsed ? 35 : 10,
              marginTop: this.state.collapsed ? -30 : 0,
              background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 57%,rgba(255,255,255,1) 100%)`,
            })}
          >
            <Text size="s" {...css({ opacity: 0.7 })}>
              {readMoreLabel}
            </Text>
          </View>
        )}
      </View>
    )
  }
}

export default ReadMore
