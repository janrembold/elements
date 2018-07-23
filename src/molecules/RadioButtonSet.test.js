import React from 'react'
import renderer from 'react-test-renderer'
import { render, fireEvent } from 'react-testing-library'
import RadioButton from './RadioButton'
import RadioButtonSet from './RadioButtonSet'
import ThemeProvider from '../behaviour/ThemeProvider'

describe('<RadioButtonSet />', () => {
  it('should render without error', () => {
    const tree = renderer
      .create(
        <ThemeProvider>
          <RadioButtonSet name="colors">
            <RadioButton value="blue">Blue</RadioButton>
            <RadioButton value="gray">Gray</RadioButton>
          </RadioButtonSet>
        </ThemeProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should chain the onChange property', () => {
    const handleChange = jest.fn()
    const { getByText } = render(
      <ThemeProvider>
        <RadioButtonSet name="colors" onChange={handleChange} default>
          <RadioButton value="blue">Blue</RadioButton>
          <RadioButton value="gray">Gray</RadioButton>
        </RadioButtonSet>
      </ThemeProvider>
    )

    const radio = getByText('Gray')
    radio.value = 'blue'
    fireEvent.change(radio)
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
