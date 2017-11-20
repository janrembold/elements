import React from 'react'
import renderer from 'react-test-renderer'
import FloatingButton from './FloatingButton'
import ThemeProvider from '../behaviour/ThemeProvider'

test('Floating button renders without error', () => {
  const tree = renderer
    .create(
      <ThemeProvider>
        <FloatingButton>Hello World</FloatingButton>
      </ThemeProvider>
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
