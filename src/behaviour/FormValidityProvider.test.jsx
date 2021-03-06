import React from 'react'
import {
  FloatingButton,
  Form,
  FormValidityProvider,
  Text,
  TextInput,
  ThemeProvider,
} from '../'

const validationMessage = 'Default error message from the browser 🐍.'

describe('Check FormValidityProvider', () => {
  it('should click on the button and get a custom error message', () => {
    function noop() {}
    const valueMissing = 'A nice error message 🐼'
    const wrapper = mount(
      <ThemeProvider>
        <FormValidityProvider
          validity={{ valueMissing }}
        >
          <Form onSubmit={noop}>
            <FloatingButton type="submit" onClick={noop}>
              <Text strong size="s" color="white">
                Submit
              </Text>
            </FloatingButton>
            <TextInput
              name="email"
              type="email"
              placeholder="Your email"
              required
            />
          </Form>
        </FormValidityProvider>
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
    // Click on the button to trigger the error.
    wrapper.find('button').simulate('click')
    // Mock the DOM onInvalid event.
    wrapper.find('input').prop('onInvalid')({
      preventDefault: noop,
      target: {
        validationMessage,
        validity: {
          valueMissing: true,
        },
      },
    })
    // Re-render in order to get the error displayed.
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('InputError').text()).toEqual(valueMissing)
    wrapper.unmount()
  })

  it('should click on the button and get a default error message', () => {
    function noop() {}
    const wrapper = mount(
      <ThemeProvider>
          <Form onSubmit={noop}>
            <FloatingButton type="submit" onClick={noop}>
              <Text strong size="s" color="white">
                Submit
              </Text>
            </FloatingButton>
            <TextInput
              name="email"
              type="email"
              placeholder="Your email"
              required
            />
          </Form>
      </ThemeProvider>
    )
    expect(wrapper).toMatchSnapshot()
    // Click on the button to trigger the error.
    wrapper.find('button').simulate('click')
    // Mock the DOM onInvalid event.
    wrapper.find('input').prop('onInvalid')({
      preventDefault: noop,
      target: {
        validationMessage,
        validity: {
          valueMissing: true,
        },
      },
    })
    // Re-render in order to get the error displayed.
    wrapper.update()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('InputError').text()).toEqual(validationMessage)
  })
})
