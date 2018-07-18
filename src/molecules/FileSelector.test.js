import React, { Fragment } from 'react'
import { FileSelector, ThemeProvider } from '../'

if (typeof window.URL.createObjectURL === 'undefined') {
  window.URL.createObjectURL = () => {}
}

if (typeof window.URL.revokeObjectURL === 'undefined') {
  window.URL.revokeObjectURL = () => {}
}

const addFiles = (wrapper, files) => {
  const input = wrapper.find('input')
  input.simulate('change', { target: { files } })
  wrapper.update()
}

describe('File selector component', () => {
  it('should add files', () => {
    const wrapper = mount(
      <ThemeProvider>
        <FileSelector multiple>
          {({ files }) => (
            <ul>{files.map(file => <li key={file}>{file}</li>)}</ul>
          )}
        </FileSelector>
      </ThemeProvider>
    )
    const files = [1, 2, 3]
    addFiles(wrapper, files)

    expect(wrapper.find('ul').children().length).toBe(files.length)
  })

  it('should remove and clear files', () => {
    const wrapper = mount(
      <ThemeProvider>
        <FileSelector multiple>
          {({ files, removeFile, resetFiles }) => (
            <Fragment>
              <ul>
                {files.map(file => (
                  <li key={file} onClick={() => removeFile(file)}>
                    {file}
                  </li>
                ))}
              </ul>
              <button id="reset" onClick={resetFiles} />
            </Fragment>
          )}
        </FileSelector>
      </ThemeProvider>
    )
    const files = [1, 2, 3, 4, 5]
    addFiles(wrapper, files)

    wrapper
      .find('ul')
      .children('li')
      .first()
      .simulate('click')
    wrapper.update()
    expect(wrapper.find('ul').children('li').length).toBe(files.length - 1)

    wrapper.find('#reset').simulate('click')
    wrapper.update()
    expect(wrapper.find('ul').children('li').length).toBe(0)
  })
})
