import React from 'react'
import renderer from 'react-test-renderer'
import Pill from './Pill'
import ThemeProvider from '../behaviour/ThemeProvider'

test('Pill renders without error', () => {
  const tree = renderer
    .create(
      <ThemeProvider>
        <Pill label="Important message" />
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
