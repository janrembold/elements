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
  ReadMore,
  PhoneInput,
  Collapsible,
  ResourceProvider,
  SimpleLayout,
  View,
  Card,
  ListItem,
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

storiesOf('ReadMore', module)
  .addDecorator(createViewportDecorator())
  .add('read more...', () => {
    return (
      <ThemeProvider>
        <SimpleLayout>
          <Card>
            <ListItem>
              <ReadMore>
                <Text>Testing a short text...</Text>
              </ReadMore>
            </ListItem>
            <ListItem>
              <ReadMore defaultHeight={10}>
                <Text>Testing a short text with a defaultHeight 10px!...</Text>
              </ReadMore>
            </ListItem>
            <ListItem>
              <ReadMore defaultHeight="80vw">
                <Text>
                  Testing a longer text with a defaultHeight 80vw! Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. Maecenas
                  dignissim sem in elit mollis consequat. Suspendisse potenti.
                  Maecenas a velit vel dolor mollis viverra. Praesent ex diam,
                  ultricies ac ultricies ut, efficitur sit amet leo. Vivamus ex
                  ante, dapibus a elementum vel, ultrices in erat. Vestibulum
                  eget ante turpis. Donec dapibus, purus vel euismod egestas,
                  arcu ipsum.
                </Text>
              </ReadMore>
            </ListItem>
            <ListItem>
              <ReadMore>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas dignissim sem in elit mollis consequat. Suspendisse
                  potenti. Maecenas a velit vel dolor mollis viverra. Praesent
                  ex diam, ultricies ac ultricies ut, efficitur sit amet leo.
                  Vivamus ex ante, dapibus a elementum vel, ultrices in erat.
                  Vestibulum eget ante turpis. Donec dapibus, purus vel euismod
                  egestas, arcu ipsum.
                </Text>
              </ReadMore>
            </ListItem>
            <ListItem>
              <ReadMore>
                <Text strong>Works also with content blocks...</Text>
                <img
                  src="https://picsum.photos/200/300"
                  style={{ width: '100%' }}
                />
              </ReadMore>
            </ListItem>
            <ListItem>
              <ReadMore>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas dignissim sem in elit mollis consequat. Suspendisse
                  potenti. Maecenas a velit vel dolor mollis viverra. Praesent
                  ex diam, ultricies ac ultricies ut, efficitur sit amet leo.
                  Vivamus ex ante, dapibus a elementum vel, ultrices in erat.
                  Vestibulum eget ante turpis. Donec dapibus, purus vel euismod
                  egestas, arcu ipsum gravida nunc, sed porta justo ipsum in
                  eros. Maecenas tristique sollicitudin interdum. Duis arcu
                  justo, pretium quis nunc nec, lacinia vehicula sapien. Aenean
                  bibendum volutpat magna, sit amet ultricies dolor viverra eu.
                  Proin massa ex, interdum id porta sed, placerat ac dui.
                  Aliquam erat volutpat. Quisque at facilisis erat. Mauris
                  sodales odio felis, sed malesuada neque faucibus et. Vivamus
                  convallis tellus in nunc feugiat egestas. Cras mattis tempus
                  felis sed tristique. Nullam purus nisi, tristique eu tempus
                  quis, tristique eget enim. Nulla tincidunt nulla sit amet nunc
                  lacinia, maximus posuere quam pharetra. Ut sit amet posuere
                  metus. Vestibulum vehicula nulla non nibh dictum bibendum.
                  Phasellus arcu nibh, cursus sit amet interdum sit amet,
                  maximus vel massa. Aliquam porta urna non orci porttitor
                  varius. Donec et scelerisque odio. Sed quis condimentum nisl,
                  id facilisis urna. Curabitur id erat a mauris placerat
                  sodales. Cras in elementum lacus. Morbi eget varius ex. Nulla
                  commodo sem odio, vel tempus nunc imperdiet quis. Maecenas eu
                  pharetra quam, id fermentum turpis. Curabitur consectetur
                  commodo vestibulum. Nunc imperdiet dolor sit amet lacinia
                  varius. Praesent consequat nisl elit, et euismod nisi posuere
                  vel. Maecenas ullamcorper, ante et consequat convallis, dolor
                  neque elementum ante, consectetur egestas sapien eros
                  elementum arcu. Nulla metus erat, congue eget nibh sed,
                  efficitur venenatis velit. Ut nec sagittis sapien. Fusce eu
                  ligula sed metus tempus vulputate ac vel lacus. Aenean ut
                  libero sem.
                </Text>
              </ReadMore>
            </ListItem>
          </Card>
        </SimpleLayout>
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
