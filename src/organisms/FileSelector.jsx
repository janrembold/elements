import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import Relative from '../atoms/Relative'

const inputStyle = css({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  opacity: 0.00001,
  pointerEvents: 'none',
})

/**
 *
 */
export default class FileSelector extends React.Component {
  static propTypes = {
    children: PropTypes.func,
    multiple: PropTypes.bool,
    accept: PropTypes.string,
  }

  static defaultProps = {
    children: () => {},
  }

  previews = new Map()

  componentWillUnmount() {
    this.clearPreviews()
  }

  state = {
    files: [],
  }

  setInputRef = ref => (this.inputRef = ref)

  handleChange = e => {
    const fileItems = e.dataTransfer ? e.dataTransfer.files : e.target.files
    this.setState(state => ({ files: [...state.files, ...fileItems] }))
  }

  openDialog = () => this.inputRef.click()

  clearPreviews = () => {
    this.previews.forEach(window.URL.revokeObjectURL)
    this.previews.clear()
  }

  clear = () => {
    this.clearPreviews()
    this.setState({ files: [] })
  }

  removeFile = file => {
    const index = this.state.files.indexOf(file)

    if (index >= 0) {
      const files = [...this.state.files]
      files.splice(index, 1)
      this.setState({ files })
      this.previews.has(file) && this.previews.delete(file)
    }
  }

  getPreview = file => {
    if (this.previews.has(file)) {
      return this.previews.get(file)
    } else {
      console.log('creating new preview')
      const url = window.URL.createObjectURL(file)
      this.previews.set(file, url)
      return url
    }
  }

  render() {
    const { children, ...props } = this.props
    return (
      <Relative>
        <input
          ref={this.setInputRef}
          type="file"
          {...inputStyle}
          {...props}
          onChange={this.handleChange}
        />
        {children({
          files: this.state.files,
          openDialog: this.openDialog,
          getPreview: this.getPreview,
          removeFile: this.removeFile,
          clear: this.clear,
        })}
      </Relative>
    )
  }
}
