import React from 'react'
import {
  Text,
  ThemeProvider,
  Collapsible,
  ResourceProvider,
  View,
  Card,
  Icon,
} from '../src/'
import { css } from 'glamor'
import Button from '../src/molecules/Button'

class DynamicCollapsible extends React.Component {
  state = {
    items: ['Item 1', 'Item 2'],
  }

  render() {
    return (
      <Collapsible {...this.props}>
        <View {...css({ padding: '5px 10px 10px 10px' })}>
          {this.state.items.map((item, i) => (
            <Text block key={i}>
              {item}
            </Text>
          ))}
          <View direction="row" alignH="space-between">
            <Button
              onClick={() =>
                this.setState(({ items }) => ({
                  items: [...items, `Item ${items.length + 1}`],
                }))
              }
            >
              Add item
            </Button>
            <Button
              onClick={() =>
                this.setState(({ items }) => ({
                  items: items.slice(0, -1),
                }))
              }
            >
              Remove item
            </Button>
          </View>
        </View>
      </Collapsible>
    )
  }
}

const CollapsibleStory = () => (
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
        <DynamicCollapsible
          title="Dynamic height"
          initiallyCollapsed={false}
          hasBottomBorder
        />
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
              backgroundImage: 'linear-gradient(to top right,#4dd4f9, #4cf97d)',
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

export default CollapsibleStory
