import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  FloatingButton,
  Form,
  FormValidityProvider,
  Text,
  TextInput,
  ThemeProvider,
  PhoneInput,
  Collapsible,
  ResourceProvider,
  View,
  Card,
  Icon,
} from '../src/'
import HorizontalView from './HorizontalView'
import FormStory from './FormStory'
import createViewportDecorator from './createViewportDecorator'
import { css } from 'glamor'

storiesOf('Animations', module)
  .addDecorator(createViewportDecorator())
  .add('HorizontalView', () => <HorizontalView />)

storiesOf('Forms', module)
  .addDecorator(createViewportDecorator())
  .add('SimpleForm', () => <FormStory />)

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

storiesOf('PhoneInput', module)
  .addDecorator(createViewportDecorator())
  .add('with phone', () => {
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
storiesOf('Containers', module)
  .addDecorator(createViewportDecorator())
  .add('collapsible thingy', () => {
    return (
      <ThemeProvider>
        <ResourceProvider>
          <Card
            {...css({
              width: '300px',
              margin: '10px 10px 10px 10px',
            })}
          >
            <Collapsible
              title="Address"
              hasBottomBorder
              initiallyCollapsed={false}
              tabIndex={1}
            >
              <View
                direction="row"
                // alignV="center"
                {...css({
                  width: '300px',
                  padding: '5px 10px 10px 10px',
                })}
              >
                <Icon
                  name="house"
                  color="grey"
                  {...css({ margin: '0px 20px 0px 30px' })}
                />
                <View direction="column">
                  <Text {...css({ width: '150px', margin: '2px 0px' })}>
                    Kaiser Joseph Str. 260
                  </Text>
                  <Text {...css({ width: '150px', margin: '2px 0px' })}>
                    Freiburg Im Breisgau
                  </Text>
                </View>
              </View>
            </Collapsible>
            <Collapsible
              title="Contact"
              hasBottomBorder
              initiallyCollapsed={true}
              tabIndex={2}
            >
              <View
                direction="column"
                // alignV="center"
                {...css({
                  width: '300px',
                  padding: '0px 10px 10px 10px',
                })}
              >
                <View direction="row" {...css({ margin: '5px 0px' })}>
                  <Icon
                    name="phone"
                    color="grey"
                    {...css({ margin: '0px 20px 0px 30px' })}
                    size="s"
                  />
                  <Text {...css({ width: '150px', margin: '2px 0px' })}>
                    1(23) 456-7890
                  </Text>
                </View>
                <View direction="row" {...css({ margin: '5px 0px' })}>
                  <Icon
                    name="email"
                    color="grey"
                    {...css({ margin: '0px 20px 0px 30px' })}
                    size="s"
                  />
                  <Text {...css({ width: '150px', margin: '2px 0px' })}>
                    your@email.com
                  </Text>
                </View>
              </View>
            </Collapsible>
            <Collapsible
              title="Profile Picture"
              hasBottomBorder
              initiallyCollapsed={false}
              tabIndex={3}
            >
              <div
                {...css({
                  width: '300px',
                  height: '300px',
                  backgroundImage:
                    'linear-gradient(to top right,#4dd4f9, #4cf97d)',
                  zIndex: 1,
                  position: 'relative',
                })}
              >
                <div
                  {...css({
                    width: '100px',
                    height: '100px',
                    backgroundImage: 'linear-gradient(orange, brown)',
                    zIndex: 1,
                    position: 'absolute',
                    top: '70px',
                    left: '100px',
                    borderRadius: '50%',
                  })}
                />
                <div
                  {...css({
                    backgroundColor: 'white',
                    clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                    width: '50px',
                    height: '100px',
                    position: 'absolute',
                    bottom: '0px',
                    left: '125px',
                  })}
                />
                <div
                  {...css({
                    backgroundColor: '#000738',
                    clipPath: 'polygon(0 0, 70% 0, 100% 100%, 0 100%)',
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    bottom: '0px',
                    left: '55px',
                  })}
                />
                <div
                  {...css({
                    backgroundColor: '#000738',
                    clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)',
                    width: '100px',
                    height: '100px',
                    position: 'absolute',
                    bottom: '0px',
                    right: '55px',
                  })}
                />
                <div
                  {...css({
                    backgroundColor: 'black',
                    clipPath: 'polygon(0 0,100% 50%,  0 100%)',
                    width: '20px',
                    height: '20px',
                    position: 'absolute',
                    bottom: '97px',
                    left: '135px',
                  })}
                />
                <div
                  {...css({
                    backgroundColor: 'black',
                    clipPath: 'polygon(0 50%, 100% 0, 100% 100%)',
                    width: '20px',
                    height: '20px',
                    position: 'absolute',
                    bottom: '97px',
                    right: '135px',
                  })}
                />
              </div>
            </Collapsible>
          </Card>
        </ResourceProvider>
      </ThemeProvider>
    )
  })
