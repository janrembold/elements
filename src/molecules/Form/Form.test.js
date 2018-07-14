import React from 'react'
import Form from './Form'
import Checkbox from '../Checkbox'
import ThemeProvider from '../../behaviour/ThemeProvider'

describe('Test the Form component', () => {
  it('should submit', () => {
    const submit = jest.fn()

    const wrapper = mount(
      <ThemeProvider>
        <Form onSubmit={submit}>
          <Checkbox label="a" name="a" value="a" checked />
        </Form>
      </ThemeProvider>
    )
    expect(submit).toHaveBeenCalledTimes(0)
    const form = wrapper
      .find('form')
      .first()
      .instance()
    expect(form.submit).toThrowError()
    wrapper.unmount()
  })
})
