import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  FloatingButton,
  Form,
  FormValidityProvider,
  Icons,
  Text,
  TextInput,
  ThemeProvider,
  PhoneInput,
} from '../src/'
import HorizontalView from './HorizontalView'
import FormStory from './FormStory'
import createViewportDecorator from './createViewportDecorator'
import RadioButtonStory from './RadioButtonStory'
import CollapsibleStory from './CollapsibleStory'
import Icon from '../src/atoms/Icon'
import ResourceProvider from '../src/behaviour/ResourceProvider'
import List from '../src/molecules/List/List'
import ListItem from '../src/molecules/List/ListItem'
import { css } from 'glamor'

storiesOf('Animations', module)
  .addDecorator(createViewportDecorator())
  .add('HorizontalView', () => <HorizontalView />)

storiesOf('Forms', module)
  .addDecorator(createViewportDecorator())
  .add('SimpleForm', () => <FormStory />)
  .add('RadioButton', () => <RadioButtonStory />)
  .add('PhoneInput', () => {
    return (
      <ThemeProvider>
        <Form>
          <PhoneInput
            placeholder="hello, this is a placeholder"
            defaultValue="49017632"
            name="phone"
            id="phone"
          />
          <FloatingButton>
            <Text>get phone input value</Text>
          </FloatingButton>
        </Form>
      </ThemeProvider>
    )
  })

storiesOf('FloatingButton', module)
  .addDecorator(createViewportDecorator())
  .add('with text', () => (
    <ThemeProvider>
      <FormValidityProvider
        validity={{
          valueMissing: 'YEYYYY, NOPEEEEEEEE!',
        }}
      >
        <Form onSubmit={_ => _}>
          <FloatingButton type="submit" onClick={action('clicked')}>
            <Text strong size="s" color="white">
              Hello Button
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
  ))

storiesOf('Containers', module)
  .addDecorator(createViewportDecorator())
  .add('Collapsible', CollapsibleStory)

storiesOf('Icons', module)
  .addDecorator(createViewportDecorator())
  .add('List', () => (
    <ThemeProvider>
      <ResourceProvider>
        <List>
          {Icons.map(icon => (
            <ListItem key={icon}>
              <Icon size="m" name={icon} />
              <Text {...css({ marginLeft: 10 })}>{icon}</Text>
            </ListItem>
          ))}
        </List>
      </ResourceProvider>
    </ThemeProvider>
  ))
