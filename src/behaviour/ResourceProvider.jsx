import React from 'react'
import PropTypes from 'prop-types'

export const RESOURCE_PATH = 'https://static.allthings.me'

/**
 * Elements uses a set of static resources like images or icons.
 * In order to benefit from caching across all apps, these resources are provided by a static asset CDN.
 *
 * Whenever you like to use Icons or Illustrations, you need to use the ResouceProvider to let the components know where they are.
 */
class ResourceProvider extends React.Component {
  getChildContext() {
    return { resourcePath: this.props.resourcePath }
  }

  static childContextTypes = {
    resourcePath: PropTypes.string,
  }

  static propTypes = {
    resourcePath: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    resourcePath: RESOURCE_PATH,
    children: null,
  }

  render() {
    return this.props.children
  }
}

export default ResourceProvider
