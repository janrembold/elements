import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import { FloatingButton, Text, ThemeProvider } from '../src/'

storiesOf('FloatingButton', module)
  .add('with text', () => (
    <ThemeProvider>
      <FloatingButton type="submit" onClick={action('clicked')}>
        <Text strong size="s" color="white">Hello Button</Text>
      </FloatingButton>
    </ThemeProvider>
  ))
