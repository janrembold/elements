import PropTypes from 'prop-types'
import React from 'react'
import View from '../atoms/View'
import { css } from 'glamor'

/**
 * Images make thing more interesting. They can be used
 * to display user image content and UI graphics.
 * If something goes wrong when loading the image, a placeholder will
 * be shown instead.
 *
 * ```example
 * <Image
 *   style={{width: 225, height: 225}}
 *   size="cover"
 *   src={'https://placeimg.com/225/225/people'}
 * />
 * ```
 *
 * ```example
 * <Image
 * style={{width: 225, height: 225}}
 * src={'https://placeimg.com/nothing'}
 * />
 * ```
 */
export default class Image extends React.Component {
  static propTypes = {
    /** Alternative image to use */
    alt: PropTypes.string,
    /** Will be called when the image is clicked */
    onClick: PropTypes.func,
    /** The URL of the image */
    src: PropTypes.string.isRequired,
    /** The URL of the fallback image */
    srcFallback: PropTypes.string,
    /** The behaviour behavior of image within the container */
    size: PropTypes.oneOf(['contain', 'cover']),
    /** The position of image */
    position: PropTypes.oneOf(['center', 'left', 'right', 'top', 'bottom']),
  }

  state = {
    useFallback: false,
  }

  static contextTypes = {
    resourcePath: PropTypes.string,
  }

  componentDidMount() {
    this.loadImage(this.props.src)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ useFallback: false })
    if (nextProps.src !== this.props.src) {
      this.loadImage(nextProps.src)
    }
  }

  loadImage = src => {
    const image = new Image()
    image.onerror = this.onError
    image.src = src
  }

  getFallbackUrl = () => {
    const baseUrl =
      typeof this.context.resourcePath === 'undefined'
        ? 'https://static.allthings.me/app/prod/'
        : this.context.resourcePath

    return `${baseUrl}/static/img/default/image.svg`
  }

  onError = () => this.props.srcFallback && this.setState({ useFallback: true })

  render() {
    const { srcFallback, src, position, size, ...props } = this.props

    const imageUrl = this.state.useFallback
      ? srcFallback || this.getFallbackUrl()
      : src

    return (
      <View
        {...css({
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: size,
          backgroundPosition: position,
        })}
        {...props}
      />
    )
  }
}
