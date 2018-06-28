import PropTypes from 'prop-types'
import React from 'react'
import { css } from 'glamor'
import { View, Text } from '../'

/**
 *   A ReadMore is a simple container, to show / hide content. It will automatically decide whether to show the `read more` link or not.
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
    toggleCallback: PropTypes.func,
  }

  static defaultProps = {
    initiallyCollapsed: true,
    readMoreLabel: 'Read more...',
    defaultHeight: '20vh',
    toggleCallback: () => {},
  }

  state = { collapsed: this.props.initiallyCollapsed }

  componentDidMount() {
    this.toggleCollapseLink()
    window.addEventListener('resize', this.toggleCollapseLink.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.toggleCollapseLink.bind(this))
  }

  childRef = React.createRef()

  toggleCollapse = () => {
    const { current } = this.childRef
    if (!this.state.collapsed) {
      current.style.height = this.props.defaultHeight
      this.setState({ collapsed: true })
      // signal new state for the parent
      this.props.toggleCallback(true)
    } else {
      current.style.height = `${current.scrollHeight}px`
      this.setState({ collapsed: false })
      // signal new state for the parent
      this.props.toggleCallback(false)
    }
  }

  toggleCollapseLink = () => {
    const { current } = this.childRef
    console.log(current.style.height, current.scrollHeight)
    console.log(window.innerHeight)

    let defaultWrapperHeight = 0
    let elHeight = current.scrollHeight

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

    // Let's check whether we should show the Read More link or not
    if (elHeight < defaultWrapperHeight) {
      current.style.height = `${elHeight}px`
      this.props.toggleCallback(false)
      this.setState({ collapsed: false })
    } else {
      current.style.height = `${defaultWrapperHeight}px`
      this.props.toggleCallback(true)
      this.setState({ collapsed: true })
    }
    // console.log('elHeight', elHeight, 'wrapperHeight', defaultWrapperHeight)
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
              background: 'transparent',
              // eslint-disable-next-line no-dupe-keys
              background: `-moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 57%, rgba(255,255,255,1) 100%)`,
              // eslint-disable-next-line no-dupe-keys
              background: `-webkit-linear-gradient(top, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 57%,rgba(255,255,255,1) 100%)`,
              // eslint-disable-next-line no-dupe-keys
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
